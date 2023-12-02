import {
  AUTH_ENUM,
  GoodsTypeEnum,
  IArea,
  IAuth,
  IGoods,
  IRole,
} from '@/interface';

export const bulkCreateArea: IArea[] = [
  {
    id: 1,
    name: '音乐',
    remark: '音乐分区',
    weight: 10,
  },
  {
    id: 2,
    name: '知识',
    remark: '知识分区',
    weight: 9,
  },
  {
    id: 3,
    name: '手游',
    remark: '和平精英、王者荣耀',
    weight: 9,
  },
  {
    id: 4,
    name: '网游',
    remark: '英雄联盟、CS:GO、DOTA2',
    weight: 9,
  },
];

const initAuth = () => {
  const deafultAuth: IAuth[] = [
    {
      id: 1,
      auth_name: '全部权限',
      auth_value: AUTH_ENUM.ALL_AUTH,
      type: 1,
      priority: 99,
      p_id: 0,
    },
    {
      id: 2,
      auth_name: '用户管理',
      auth_value: AUTH_ENUM.USER_MANAGE,
      type: 1,
      priority: 99,
      p_id: 1,
    },
    {
      id: 3,
      auth_name: '角色管理',
      auth_value: AUTH_ENUM.ROLE_MANAGE,
      type: 1,
      priority: 99,
      p_id: 1,
    },
    {
      id: 4,
      auth_name: '权限管理',
      auth_value: AUTH_ENUM.AUTH_MANAGE,
      type: 1,
      priority: 99,
      p_id: 1,
    },
    {
      id: 5,
      auth_name: '直播管理',
      auth_value: AUTH_ENUM.LIVE_MANAGE,
      type: 1,
      priority: 99,
      p_id: 1,
    },
    {
      id: 6,
      auth_name: '直播拉流',
      auth_value: AUTH_ENUM.LIVE_PULL,
      type: 1,
      priority: 99,
      p_id: 5,
    },
  ];

  return deafultAuth;
};

const initRole = () => {
  const defaultRole: IRole[] = [
    {
      id: 1,
      role_name: '全部角色',
      role_value: 'ALL_ROLE',
      type: 1,
      priority: 99,
      p_id: 0,
    },
    {
      id: 2,
      role_name: '管理员',
      role_value: 'ADMIN',
      type: 1,
      priority: 99,
      p_id: 1,
    },
    {
      id: 3,
      role_name: '超级管理员',
      role_value: 'SUPER_ADMIN',
      type: 1,
      priority: 99,
      p_id: 2,
    },
    {
      id: 4,
      role_name: '用户',
      role_value: 'USER',
      type: 1,
      priority: 99,
      p_id: 1,
    },
    {
      id: 5,
      role_name: 'VIP用户',
      role_value: 'VIP_USER',
      type: 1,
      priority: 99,
      p_id: 4,
    },
    {
      id: 6,
      role_name: '游客',
      role_value: 'TOURIST_USER',
      type: 1,
      priority: 99,
      p_id: 4,
    },
  ];
  return defaultRole;
};

const initRoleAuth = () => {
  const auth = initAuth();
  const roleAuth: any = [];
  let id = 0;
  auth.forEach((v) => {
    id += 1;
    roleAuth.push({
      id,
      role_id: 1,
      auth_id: v.id,
    });
  });
  return roleAuth;
};

export const bulkCreateGoods: IGoods[] = [
  {
    type: GoodsTypeEnum.gift,
    name: '鲜花',
    desc: '一朵鲜花',
    short_desc: '鲜花',
    price: '0.00',
    original_price: '0.00',
    badge: 'free',
    badge_bg: 'pink',
    remark: '',
    nums: 1,
    cover:
      'https://resource.hsslive.cn/billd-live/image/c5258ebf3a79c7d67ef8ae95062c8fe4.webp',
  },
  {
    type: GoodsTypeEnum.gift,
    name: '可乐',
    desc: '肥宅快乐水',
    short_desc: '可乐',
    price: '2.00',
    original_price: '2.00',
    badge: '新品',
    badge_bg: '#e60c0d',
    remark: '',
    nums: 1,
    cover:
      'https://resource.hsslive.cn/billd-live/image/3f56506ae5f536864dbc92b52c355bfe.webp',
  },
  {
    type: GoodsTypeEnum.gift,
    name: '大鸡腿',
    desc: '美味的大鸡腿，谁顶得住？',
    short_desc: '大鸡腿',
    price: '5.00',
    original_price: '5.00',
    badge: '',
    badge_bg: '',
    remark: '',
    nums: 1,
    cover:
      'https://resource.hsslive.cn/billd-live/image/3f4e7debdc978741f90515ace48aee22.webp',
  },
  {
    type: GoodsTypeEnum.gift,
    name: '一杯咖啡',
    desc: '给阿姨倒一杯卡布奇诺',
    short_desc: '一杯咖啡',
    price: '10.00',
    original_price: '10.00',
    badge: '肝！',
    badge_bg: '#cda8a1',
    remark: '',
    nums: 1,
    cover:
      'https://resource.hsslive.cn/billd-live/image/d9770d31ac7350556103c0b1ed09e01d.webp',
  },
  {
    type: GoodsTypeEnum.sponsors,
    name: '一根辣条',
    desc: '卫龙牌辣条',
    short_desc: '一根辣条',
    price: '0.10',
    original_price: '0.10',
    badge: '',
    badge_bg: '',
    remark: '',
    nums: 1,
    cover:
      'https://resource.hsslive.cn/billd-live/image/7170e9bbf14b8dcda73e30ccff589132.webp',
  },
  {
    type: GoodsTypeEnum.sponsors,
    name: '一根烤肠',
    desc: '一块钱的淀粉肠',
    short_desc: '一根烤肠',
    price: '1.00',
    original_price: '1.00',
    badge: '',
    badge_bg: '',
    remark: '',
    nums: 1,
    cover:
      'https://resource.hsslive.cn/billd-live/image/ed2e20878ee3cd9d2f71a4c3714e82a9.webp',
  },
  {
    type: GoodsTypeEnum.sponsors,
    name: '一杯奶茶',
    desc: '一杯益禾堂烤奶',
    short_desc: '一杯奶茶',
    price: '10.00',
    original_price: '10.00',
    badge: '',
    badge_bg: '',
    remark: '',
    nums: 1,
    cover:
      'https://resource.hsslive.cn/billd-live/image/7e9edac32a8d9e0b7ac0b9554eded85c.webp',
  },
  {
    type: GoodsTypeEnum.sponsors,
    name: '一杯咖啡',
    desc: '一杯星巴克咖啡',
    short_desc: '一杯咖啡',
    price: '25.00',
    original_price: '25.00',
    badge: '',
    badge_bg: '',
    remark: '',
    nums: 1,
    cover:
      'https://resource.hsslive.cn/billd-live/image/8d4ac68c84b6d0cad754e15151869d71.webp',
  },
  {
    type: GoodsTypeEnum.sponsors,
    name: '肯德基全家桶',
    desc: '肯德基疯狂星期四，v我50！',
    short_desc: '肯德基全家桶',
    price: '50.00',
    original_price: '50.00',
    badge: 'crazy',
    badge_bg: '#cda8a1',
    remark: '',
    nums: 1,
    cover:
      'https://resource.hsslive.cn/billd-live/image/fd04506d5b3167cf210bd875e5a97c8b.webp',
  },
  {
    type: GoodsTypeEnum.sponsors,
    name: '一顿海底捞',
    desc: '一起嗨，海底捞',
    short_desc: '一顿海底捞',
    price: '100.00',
    original_price: '100.00',
    badge: '',
    badge_bg: '',
    remark: '',
    nums: 1,
    cover:
      'https://resource.hsslive.cn/billd-live/image/3f71039d061fb5b2dc4a2d835a5c66ca.webp',
  },
  {
    type: GoodsTypeEnum.support,
    name: '一对一解答（0.5小时）',
    desc: '包括但不限于billd-live相关的任何问题。',
    short_desc: '一对一解答（0.5小时）',
    price: '20.00',
    original_price: '25.00',
    badge: '新人优惠',
    badge_bg: '#8fcbee',
    remark: '',
    nums: 1,
    cover:
      'https://resource.hsslive.cn/billd-live/image/b89fcf45fb773d5ea6f173c906ce6a07.webp',
  },
  {
    type: GoodsTypeEnum.support,
    name: '一对一解答（1小时）',
    desc: '包括但不限于billd-live相关的任何问题。',
    short_desc: '一对一解答（1小时）',
    price: '50.00',
    original_price: '50.00',
    badge: '',
    badge_bg: '',
    remark: '',
    nums: 1,
    cover:
      'https://resource.hsslive.cn/billd-live/image/b89fcf45fb773d5ea6f173c906ce6a07.webp',
  },
  {
    type: GoodsTypeEnum.support,
    name: '一对一解答（3小时）',
    desc: '包括但不限于billd-live相关的任何问题。',
    short_desc: '一对一解答（3小时）',
    price: '120.00',
    original_price: '150.00',
    badge: '',
    badge_bg: '',
    remark: '',
    nums: 1,
    cover:
      'https://resource.hsslive.cn/billd-live/image/b89fcf45fb773d5ea6f173c906ce6a07.webp',
  },
  {
    type: GoodsTypeEnum.support,
    name: 'billd-live付费课',
    desc: '从零搭建迷你版b站直播间',
    short_desc: '从零搭建迷你版b站直播间',
    price: '249.00',
    original_price: '299.00',
    badge: '',
    badge_bg: '',
    remark: 'hot',
    nums: 1,
    cover:
      'https://resource.hsslive.cn/billd-live/image/b89fcf45fb773d5ea6f173c906ce6a07.webp',
  },
  {
    type: GoodsTypeEnum.recharge,
    name: '自定义充值',
    desc: '自定义充值',
    short_desc: '自定义充值',
    price: '0.00',
    original_price: '0.00',
    badge: '',
    badge_bg: '',
    remark: '',
    nums: 1,
    cover: '',
  },
];

export const bulkCreateRole = initRole();
export const bulkCreateAuth = initAuth();
export const bulkCreateRoleAuth = initRoleAuth();
