import { assert, Asset, Enum, resources, SpriteAtlas, SpriteFrame } from "cc";
import { SingleTon } from "../Base/SingleTon";
import { CONFIG_RESOURCE, T_RESOURCE_ITEM } from "../Reference/Config";
import {
  ENUM_ENTITY,
  ENUM_RESOURCE_EXTRA,
  ENUM_RESOURCE_MAP,
  ENUM_RESOURCE_PLAYER_STATE,
} from "../Reference/Enum";

export class ResourceBus extends SingleTon {
  static get instance() {
    return super.getInstance<ResourceBus>();
  }

  extra: Map<ENUM_RESOURCE_EXTRA, SpriteFrame> = new Map();
  map: Map<ENUM_RESOURCE_MAP, SpriteFrame> = new Map();
  player_state: Map<ENUM_RESOURCE_PLAYER_STATE, SpriteAtlas> = new Map();
  enemy_state: Map<ENUM_ENTITY, SpriteAtlas> = new Map();

  async load() {
    const p_extra = this.loadDir(CONFIG_RESOURCE.extra, "extra");
    const p_map = this.loadDir(CONFIG_RESOURCE.map, "map");
    const p_p_s = this.loadDir(CONFIG_RESOURCE.player_state, "player_state");
    const p_e_s = this.loadDir(
      CONFIG_RESOURCE.enemy_state,
      "enemy_state",
      true,
      ENUM_ENTITY
    );
    await Promise.all([p_extra, p_map, p_p_s, p_e_s]);
  }

  protected loadDir(
    { path, type }: T_RESOURCE_ITEM,
    ctxstr: string,
    smode?: boolean,
    enums?: typeof Enum
  ) {
    return new Promise<boolean>((resolve, reject) => {
      resources.loadDir(path, type, (err, asserts) => {
        if (err) reject(err);
        asserts.forEach((item, index) => {
          if (!smode) {
            this[ctxstr].set(index, item);
          } else {
            this[ctxstr].set(enums[item.name.toUpperCase()], item);
          }
        });
        resolve(true);
      });
    });
  }
}
