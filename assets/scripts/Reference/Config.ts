import { AnimationClip, Asset, math, SpriteAtlas, SpriteFrame, Vec3 } from "cc";
import {
  ENUM_BUTTON,
  ENUM_ENTITY,
  ENUM_PLAYER_STATE,
  ENUM_RESOURCE_PLAYER_STATE,
} from "./Enum";
import { TYPE_BUTTON } from "./Type";

export type T_RESOURCE_ITEM = {
  path: string;
  type: typeof Asset;
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

export const CONFIG_SYSTEM_STYLE = {
  WIDTH: 400,
  HEIGHT: 600,
};

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
]);

export type T_SHADOW = {
  size: math.Size;
  position: math.Vec3;
};
export type T_ENTITY = {
  scale?: Vec3;
  shadow?: T_SHADOW;
  name?: ENUM_ENTITY;
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
      name: ENUM_ENTITY.ENEMY1,
    },
  ],
  [
    ENUM_ENTITY.ENEMY2,
    {
      scale: new Vec3(1.5, 1.5, 0),
      name: ENUM_ENTITY.ENEMY2,
    },
  ],
  [
    ENUM_ENTITY.ENEMY3,
    {
      scale: new Vec3(1.5, 1.5, 0),
      name: ENUM_ENTITY.ENEMY3,
    },
  ],
  [
    ENUM_ENTITY.ENEMY4,
    {
      scale: new Vec3(1.5, 1.5, 0),
      name: ENUM_ENTITY.ENEMY4,
    },
  ],
  [
    ENUM_ENTITY.ENEMY5,
    {
      scale: new Vec3(1.5, 1.5, 0),
      name: ENUM_ENTITY.ENEMY5,
    },
  ],
]);

export const CONFIG_WORLDMAP = {
  speed: 4,
};
