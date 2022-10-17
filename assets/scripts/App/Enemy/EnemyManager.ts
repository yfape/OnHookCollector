import {
  Animation,
  animation,
  AnimationClip,
  Component,
  Node,
  Quat,
  Size,
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
  ENUM_ENEMY_STATE,
  ENUM_ENTITY,
  ENUM_EVENT,
  ENUM_PLAYER_STATE,
  ENUM_RESOURCE_PLAYER_STATE,
} from "../../Reference/Enum";
import { EventBus } from "../../Runtime/EventManager";
import { ResourceBus } from "../../Runtime/ResourceBus";

export class EnemyManager extends Entity {
  entity: T_ENTITY;
  position: Vec3;

  constructor(entity: ENUM_ENTITY, position?: Vec3) {
    super(CONFIG_ENTITY.get(entity), position);
    this.position = position;
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
    this.loadAttackClip();
    this.animationComponent.playOnLoad = true;
  }

  protected loadAttackClip() {
    let startX = this.position.x;
    const track = new animation.VectorTrack();
    track.componentsCount = 3;
    track.path = new animation.TrackPath().toProperty("position");
    const [x, y, z] = track.channels();
    const xs: Array<[number, any]> = [
      [0.1, { value: startX }],
      [0.2, { value: startX - 30 }],
      [0.3, { value: startX }],
    ];
    x.curve.assignSorted(xs);
    const clip = new AnimationClip();
    clip.name = ENUM_ENEMY_STATE.ATTACK;
    clip.duration = 0.3;
    clip.wrapMode = AnimationClip.WrapMode.Normal;
    clip.addTrack(track);
    this.animationComponent.clips.push(clip);
  }

  protected loadBeAttackClip() {
    let startX = this.position.x;
    const track = new animation.VectorTrack();
    track.componentsCount = 3;
    track.path = new animation.TrackPath().toProperty("position");
    const [x, y, z] = track.channels();
    const xs: Array<[number, any]> = [
      [0.1, { value: startX }],
      [0.2, { value: startX + 30 }],
      [0.3, { value: startX }],
    ];
    x.curve.assignSorted(xs);
    const clip = new AnimationClip();
    clip.name = ENUM_ENEMY_STATE.BEATTACKED;
    clip.duration = 0.3;
    clip.wrapMode = AnimationClip.WrapMode.Normal;
    clip.addTrack(track);
    this.animationComponent.clips.push(clip);
  }

  attack() {
    this.animationComponent.play(ENUM_ENEMY_STATE.ATTACK);
  }

  beAttacked() {
    this.animationComponent.play(ENUM_ENEMY_STATE.BEATTACKED);
  }
}
