import { arrayUnique } from 'billd-utils';
import { ParameterizedContext } from 'koa';

import { authJwt, signJwt } from '@/app/auth/authJwt';
import { verifyUserAuth } from '@/app/auth/verifyUserAuth';
import successHandler from '@/app/handler/success-handle';
import { ALLOW_HTTP_CODE, PROJECT_ENV, PROJECT_ENV_ENUM } from '@/constant';
import { IList, IUser } from '@/interface';
import { CustomError } from '@/model/customError.model';
import roleService from '@/service/role.service';
import userService from '@/service/user.service';

class UserController {
  common = {
    list: (data) => userService.getList(data),
  };

  login = async (ctx: ParameterizedContext, next) => {
    const { id, password, exp = 24 } = ctx.request.body;
    const userInfo: any = await userService.login({ id, password });
    if (!userInfo) {
      throw new CustomError(
        '账号或密码错误！',
        ALLOW_HTTP_CODE.paramsError,
        ALLOW_HTTP_CODE.paramsError
      );
    }
    const token = signJwt({
      userInfo,
      exp,
    });
    await userService.update({ token, id: userInfo?.id }); // 每次登录都更新token
    successHandler({ ctx, data: token, message: '登录成功！' });

    /**
     * 这个其实是最后一个中间件了，其实加不加调不调用next都没硬性，但是为了防止后面要
     * 是扩展又加了一个中间件，这里不调用await next()的话，会导致下一个中间件出现404或其他问题，
     * 因此还是得在这调用一次await next()
     */
    await next();
  };

  list = async (ctx: ParameterizedContext, next) => {
    // @ts-ignore
    const {
      id,
      orderBy = 'asc',
      orderName = 'id',
      nowPage,
      pageSize,
      keyWord,
      rangTimeType,
      rangTimeStart,
      rangTimeEnd,
    }: IList<IUser> = ctx.request.query;
    const result = await this.common.list({
      id,
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
  };

  async find(ctx: ParameterizedContext, next) {
    const id = +ctx.params.id;
    const result = await userService.findAccount(id);
    successHandler({ ctx, data: result });

    await next();
  }

  async getUserInfo(ctx: ParameterizedContext, next) {
    const { code, userInfo, message } = await authJwt(ctx);
    if (code === ALLOW_HTTP_CODE.ok) {
      const result = await userService.getUserInfo(userInfo!.id!);
      successHandler({ ctx, data: result });
      await next();
    } else {
      throw new CustomError(message, code, code);
    }
  }

  async updatePwd(ctx: ParameterizedContext, next) {
    const { userInfo } = await authJwt(ctx);
    if (!userInfo) {
      throw new CustomError(
        `请登录！`,
        ALLOW_HTTP_CODE.forbidden,
        ALLOW_HTTP_CODE.forbidden
      );
    }
    const { oldpwd, newpwd } = ctx.request.body;
    if (!oldpwd || !newpwd) {
      throw new CustomError(
        `oldpwd和newpwd不能为空！`,
        ALLOW_HTTP_CODE.paramsError,
        ALLOW_HTTP_CODE.paramsError
      );
    }
    const user = await userService.findPwd(userInfo.id!);
    if (user?.password !== oldpwd) {
      throw new CustomError(
        `旧密码错误！`,
        ALLOW_HTTP_CODE.paramsError,
        ALLOW_HTTP_CODE.paramsError
      );
    }
    await userService.updatePwd({
      id: userInfo.id,
      password: newpwd,
    });
    successHandler({ ctx, message: '修改密码成功！' });
    await next();
  }

  async update(ctx: ParameterizedContext, next) {
    const id = +ctx.params.id;
    const { username, desc, status, avatar }: IUser = ctx.request.body;
    if (!username) {
      throw new CustomError(
        'username不能为空！',
        ALLOW_HTTP_CODE.paramsError,
        ALLOW_HTTP_CODE.paramsError
      );
    }
    if (PROJECT_ENV === PROJECT_ENV_ENUM.beta) {
      throw new CustomError(
        `权限不足！`,
        ALLOW_HTTP_CODE.forbidden,
        ALLOW_HTTP_CODE.forbidden
      );
    }
    const hasAuth = await verifyUserAuth(ctx);
    if (!hasAuth) {
      throw new CustomError(
        `权限不足！`,
        ALLOW_HTTP_CODE.forbidden,
        ALLOW_HTTP_CODE.forbidden
      );
    }
    const isExist = await userService.isExist([id]);
    if (!isExist) {
      throw new CustomError(
        `不存在id为${id}的用户！`,
        ALLOW_HTTP_CODE.paramsError,
        ALLOW_HTTP_CODE.paramsError
      );
    }
    const isExistSameName: any = await userService.isSameName(username);
    if (isExistSameName && isExistSameName.id !== id) {
      throw new CustomError(
        `已存在用户名为${username}的用户！`,
        ALLOW_HTTP_CODE.paramsError,
        ALLOW_HTTP_CODE.paramsError
      );
    }
    await userService.update({
      id,
      username,
      desc,
      status,
      avatar,
    });
    successHandler({ ctx });

    await next();
  }

  async updateUserRole(ctx: ParameterizedContext, next) {
    if (PROJECT_ENV === PROJECT_ENV_ENUM.beta) {
      throw new CustomError(
        `权限不足！`,
        ALLOW_HTTP_CODE.forbidden,
        ALLOW_HTTP_CODE.forbidden
      );
    }
    const hasAuth = await verifyUserAuth(ctx);
    if (!hasAuth) {
      throw new CustomError(
        `权限不足！`,
        ALLOW_HTTP_CODE.forbidden,
        ALLOW_HTTP_CODE.forbidden
      );
    }
    const user_id = +ctx.params.id;
    const { user_roles }: IUser = ctx.request.body;

    if (!user_roles || !user_roles.length) {
      throw new CustomError(
        'user_roles要求number[]！',
        ALLOW_HTTP_CODE.paramsError,
        ALLOW_HTTP_CODE.paramsError
      );
    }

    const isExistUser = await userService.isExist([user_id]);
    if (!isExistUser) {
      throw new CustomError(
        `不存在id为${user_id}的用户！`,
        ALLOW_HTTP_CODE.paramsError,
        ALLOW_HTTP_CODE.paramsError
      );
    }
    const ids = arrayUnique(user_roles);
    const isExistRole = await roleService.isExist(ids);
    if (!isExistRole) {
      throw new CustomError(
        `${ids.toString()}中存在不存在的角色！`,
        ALLOW_HTTP_CODE.paramsError,
        ALLOW_HTTP_CODE.paramsError
      );
    }
    const result = await roleService.updateUserRole({
      user_id,
      role_ids: user_roles,
    });
    successHandler({ ctx, data: result });

    await next();
  }

  delete(ctx: ParameterizedContext, next) {
    successHandler({ ctx, message: '敬请期待' });
    next();
  }
}
export default new UserController();
