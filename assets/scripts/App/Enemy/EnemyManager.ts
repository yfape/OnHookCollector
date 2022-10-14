import {
  Animation,
  animation,
  AnimationClip,
  Component,
  Node,
  Quat,
  Sprite,
  SpriteFrame,
  Vec3,
} from "cc";
import { Entity } from "../../Base/Entity";
import {
  CONFIG_ENTITY,
  CONFIG_PLAYER_STATE,
  T_ENTITY,
} from "../../Reference/Config";
import {
  ENUM_ENTITY,
  ENUM_EVENT,
  ENUM_PLAYER_STATE,
  ENUM_RESOURCE_PLAYER_STATE,
} from "../../Reference/Enum";
import { EventBus } from "../../Runtime/EventManager";
import { ResourceBus } from "../../Runtime/ResourceBus";

export class EnemyManager extends Entity {
  entity: T_ENTITY;

  constructor(entity: ENUM_ENTITY, position?: Vec3) {
    super(CONFIG_ENTITY.get(entity), position);
    this.tokeRotation();
    this.entity = CONFIG_ENTITY.get(entity);
    this.loadClips();
  }

  protected loadClips() {
    const spriteFrames = ResourceBus.instance.enemy_state
      .get(this.entity.name)
      .getSpriteFrames();
    const track = new animation.ObjectTrack();
    track.path = new animation.TrackPath()
      .toComponent(Sprite)
      .toProperty("spriteFrame");
    let itemtime = 0.4 / spriteFrames.length;
    const frames: Array<[number, SpriteFrame]> = spriteFrames.map(
      (value, index) => [itemtime * index, value]
    );
    track.channel.curve.assignSorted(frames);
    const clip = new AnimationClip();
    clip.duration = 0.4;
    clip.wrapMode = AnimationClip.WrapMode.Loop;
    clip.addTrack(track);
    this.animationComponent.defaultClip = clip;
    this.animationComponent.playOnLoad = true;
  }

  attack() {}
}
