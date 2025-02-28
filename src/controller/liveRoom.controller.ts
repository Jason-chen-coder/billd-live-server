import { getRandomString } from 'billd-utils';
import cryptojs from 'crypto-js';
import { ParameterizedContext } from 'koa';

import { authJwt } from '@/app/auth/authJwt';
import { verifyUserAuth } from '@/app/auth/verifyUserAuth';
import successHandler from '@/app/handler/success-handle';
import { SERVER_LIVE } from '@/config/secret';
import { ALLOW_HTTP_CODE } from '@/constant';
import { IList, ILiveRoom } from '@/interface';
import { CustomError } from '@/model/customError.model';
import liveRoomService from '@/service/liveRoom.service';
import userLiveRoomService from '@/service/userLiveRoom.service';

class LiveRoomController {
  common = {
    create: (data: ILiveRoom) => liveRoomService.create(data),
    update: (data: ILiveRoom) => liveRoomService.update(data),
  };

  async getList(ctx: ParameterizedContext, next) {
    const {
      id,
      name,
      rtmp_url,
      flv_url,
      hls_url,
      orderBy = 'asc',
      orderName = 'id',
      nowPage,
      pageSize,
      keyWord,
      rangTimeType,
      rangTimeStart,
      rangTimeEnd,
    }: IList<ILiveRoom> = ctx.request.query;
    const result = await liveRoomService.getList({
      id,
      name,
      rtmp_url,
      flv_url,
      hls_url,
      orderBy,
      orderName,
      nowPage,
      pageSize,
      keyWord,
      rangTimeType,
      rangTimeStart,
      rangTimeEnd,
    });
    successHandler({ ctx, data: result });
    await next();
  }

  async find(ctx: ParameterizedContext, next) {
    const id = +ctx.params.id;
    const result = await liveRoomService.find(id);
    successHandler({ ctx, data: result });
    await next();
  }

  updateKey = async (ctx: ParameterizedContext, next) => {
    const { code, userInfo, message } = await authJwt(ctx);
    if (userInfo) {
      const liveRoom = await userLiveRoomService.findByUserId(
        userInfo.id || -1
      );
      if (!liveRoom) {
        throw new CustomError(
          `你还没有开通直播间！`,
          ALLOW_HTTP_CODE.paramsError,
          ALLOW_HTTP_CODE.paramsError
        );
      } else {
        const key = cryptojs
          .MD5(`${+new Date()}___${getRandomString(6)}`)
          .toString();
        const rtmp_url = `${SERVER_LIVE.PushDomain}/${
          SERVER_LIVE.AppName
        }/roomId___${liveRoom.live_room!.id!}`;
        await this.common.update({
          id: liveRoom.live_room!.id!,
          key,
          rtmp_url,
        });
        successHandler({ ctx, data: { rtmp_url, key } });
      }
    } else {
      throw new CustomError(message, code, code);
    }
    await next();
  };

  async create(ctx: ParameterizedContext, next) {
    const { name, type, weight, rtmp_url, cdn, flv_url, hls_url }: ILiveRoom =
      ctx.request.body;
    await this.common.create({
      name,
      key: cryptojs.MD5(`${+new Date()}___${getRandomString(6)}`).toString(),
      type,
      weight,
      cdn,
      rtmp_url,
      flv_url,
      hls_url,
    });
    successHandler({ ctx });
    await next();
  }

  async delete(ctx: ParameterizedContext, next) {
    const hasAuth = await verifyUserAuth(ctx);
    if (!hasAuth) {
      throw new CustomError(
        '权限不足！',
        ALLOW_HTTP_CODE.forbidden,
        ALLOW_HTTP_CODE.forbidden
      );
    }
    const id = +ctx.params.id;
    const isExist = await liveRoomService.isExist([id]);
    if (!isExist) {
      throw new CustomError(
        `不存在id为${id}的直播间！`,
        ALLOW_HTTP_CODE.paramsError,
        ALLOW_HTTP_CODE.paramsError
      );
    }
    await liveRoomService.delete(id);
    successHandler({ ctx });
    await next();
  }
}

export default new LiveRoomController();
