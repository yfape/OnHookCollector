import { AnimationClip, Asset, math, SpriteAtlas, SpriteFrame, Vec3 } from "cc";
import {
  ENUM_BUTTON,
  ENUM_ENTITY,
  ENUM_LEVEL,
  ENUM_PLAYER_STATE,
  ENUM_RESOURCE_MAP,
  ENUM_RESOURCE_PLAYER_STATE,
} from "./Enum";
import { TYPE_BUTTON } from "./Type";

export type T_RESOURCE_ITEM = {
  path: string;
  type: typeof Asset;
};

export const CONFIG_SYSTEM = {
  window: {
    width: 400,
    height: 600,
  },
  worldMap: {
    speed: 4,
  },
  counter: {
    limit: 100,
  },
};

export const CONFIG_RESOURCE = {
  extra: {
    path: "texture/extra",
    type: SpriteFrame,
  },
  map: {
    path: "texture/map",
    type: SpriteFrame,
  },
  player_state: {
    path: "texture/player/state",
    type: SpriteAtlas,
  },
  enemy_state: {
    path: "texture/enemy",
    type: SpriteAtlas,
  },
};

export const CONFIG_MENU_BUTTON = new Map<ENUM_BUTTON, TYPE_BUTTON>([
  [ENUM_BUTTON.CHARATOR, { name: "角色" }],
  [ENUM_BUTTON.EQUIP, { name: "装备" }],
  [ENUM_BUTTON.SKILL, { name: "技能" }],
  [ENUM_BUTTON.STORE, { name: "商店" }],
  [ENUM_BUTTON.SETTING, { name: "设置" }],
]);

export type T_STATE = Map<ENUM_RESOURCE_PLAYER_STATE, T_PLAYER_STATE>;
export type T_PLAYER_STATE = {
  name: string;
  duration: number;
  wrap: AnimationClip.WrapMode;
  default?: boolean;
};
export const CONFIG_PLAYER_STATE: T_STATE = new Map<
  ENUM_RESOURCE_PLAYER_STATE,
  T_PLAYER_STATE
>([
  [
    ENUM_RESOURCE_PLAYER_STATE.IDLE,
    {
      name: ENUM_PLAYER_STATE.IDLE,
      duration: 0.5,
      wrap: AnimationClip.WrapMode.PingPong,
      default: true,
    },
  ],
  [
    ENUM_RESOURCE_PLAYER_STATE.ATTACK,
    {
      name: ENUM_PLAYER_STATE.ATTACK,
      duration: 0.5,
      wrap: AnimationClip.WrapMode.Normal,
    },
  ],
  [
    ENUM_RESOURCE_PLAYER_STATE.DEAL,
    {
      name: ENUM_PLAYER_STATE.DEAL,
      duration: 0.5,
      wrap: AnimationClip.WrapMode.Normal,
    },
  ],
  [
    ENUM_RESOURCE_PLAYER_STATE.BEATTACKED,
    {
      name: ENUM_PLAYER_STATE.BEATTACKED,
      duration: 0.3,
      wrap: AnimationClip.WrapMode.Normal,
    },
  ],
]);

export type T_SHADOW = {
  size: math.Size;
  position: math.Vec3;
};
export type T_ENTITY = {
  scale?: Vec3;
  shadow?: T_SHADOW;
  name?: ENUM_ENTITY;
  property?: Array<any>;
};
export const CONFIG_ENTITY = new Map<ENUM_ENTITY, T_ENTITY>([
  [
    ENUM_ENTITY.PLAYER,
    {
      scale: new Vec3(1.8, 1.8, 0),
      shadow: {
        size: math.size(20, 4),
        position: new Vec3(0, -24, 0),
      },
    },
  ],
  [
    ENUM_ENTITY.ENEMY1,
    {
      scale: new Vec3(1.5, 1.5, 0),
      property: [30, 10, 1, 1, []],
    },
  ],
  [
    ENUM_ENTITY.ENEMY2,
    {
      scale: new Vec3(1.5, 1.5, 0),
      property: [30, 10, 1, 1, []],
    },
  ],
  [
    ENUM_ENTITY.ENEMY3,
    {
      scale: new Vec3(1.5, 1.5, 0),
      property: [30, 10, 1, 1, []],
    },
  ],
  [
    ENUM_ENTITY.ENEMY4,
    {
      scale: new Vec3(1.5, 1.5, 0),
      property: [30, 10, 1, 1, []],
    },
  ],
  [
    ENUM_ENTITY.ENEMY5,
    {
      scale: new Vec3(1.5, 1.5, 0),
      property: [30, 10, 1, 1, []],
    },
  ],
  [
    ENUM_ENTITY.ENEMY6,
    {
      scale: new Vec3(1.5, 1.5, 0),
      property: [30, 10, 1, 1, []],
    },
  ],
  [
    ENUM_ENTITY.ENEMY7,
    {
      scale: new Vec3(1.5, 1.5, 0),
      property: [30, 10, 1, 1, []],
    },
  ],
  [
    ENUM_ENTITY.ENEMY8,
    {
      scale: new Vec3(1.5, 1.5, 0),
      property: [30, 10, 1, 1, []],
    },
  ],
]);

//HP ATK ARM AP SKILL
export const CONFIG_ENEMY = new Map<ENUM_ENTITY, any>([
  [ENUM_ENTITY.ENEMY1, [30, 10, 1, 1, []]],
]);

export type TYPE_MAP = {
  addi: number;
  map: ENUM_RESOURCE_MAP;
  enemys: ENUM_ENTITY[];
};
export const CONFIG_LEVEL = new Map<ENUM_LEVEL, TYPE_MAP>([
  [
    ENUM_LEVEL.LEVEL1,
    {
      addi: 1.0,
      map: ENUM_RESOURCE_MAP.MAP1,
      enemys: [ENUM_ENTITY.ENEMY1, ENUM_ENTITY.ENEMY2, ENUM_ENTITY.ENEMY3],
    },
  ],
  [
    ENUM_LEVEL.LEVEL2,
    {
      addi: 1.0,
      map: ENUM_RESOURCE_MAP.MAP2,
      enemys: [ENUM_ENTITY.ENEMY2, ENUM_ENTITY.ENEMY3, ENUM_ENTITY.ENEMY4],
    },
  ],
  [
    ENUM_LEVEL.LEVEL3,
    {
      addi: 1.5,
      map: ENUM_RESOURCE_MAP.MAP3,
      enemys: [ENUM_ENTITY.ENEMY2, ENUM_ENTITY.ENEMY3, ENUM_ENTITY.ENEMY4],
    },
  ],
  [
    ENUM_LEVEL.LEVEL4,
    {
      addi: 2.0,
      map: ENUM_RESOURCE_MAP.MAP4,
      enemys: [ENUM_ENTITY.ENEMY3, ENUM_ENTITY.ENEMY4, ENUM_ENTITY.ENEMY5],
    },
  ],
  [
    ENUM_LEVEL.LEVEL5,
    {
      addi: 2.5,
      map: ENUM_RESOURCE_MAP.MAP1,
      enemys: [ENUM_ENTITY.ENEMY4, ENUM_ENTITY.ENEMY5, ENUM_ENTITY.ENEMY6],
    },
  ],
  [
    ENUM_LEVEL.LEVEL6,
    {
      addi: 3.0,
      map: ENUM_RESOURCE_MAP.MAP1,
      enemys: [ENUM_ENTITY.ENEMY5, ENUM_ENTITY.ENEMY6, ENUM_ENTITY.ENEMY7],
    },
  ],
  [
    ENUM_LEVEL.LEVEL7,
    {
      addi: 3.5,
      map: ENUM_RESOURCE_MAP.MAP1,
      enemys: [ENUM_ENTITY.ENEMY6, ENUM_ENTITY.ENEMY7, ENUM_ENTITY.ENEMY8],
    },
  ],
  [
    ENUM_LEVEL.LEVEL8,
    {
      addi: 4.0,
      map: ENUM_RESOURCE_MAP.MAP1,
      enemys: [ENUM_ENTITY.ENEMY7, ENUM_ENTITY.ENEMY8, ENUM_ENTITY.ENEMY9],
    },
  ],
]);
