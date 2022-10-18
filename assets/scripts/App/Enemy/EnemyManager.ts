import {
  Animation,
  animation,
  AnimationClip,
  Color,
  Node,
  Sprite,
  SpriteFrame,
  UITransform,
  Vec3,
  Widget,
} from "cc";
import { Entity } from "../../Base/Entity";
import { CONFIG_ENTITY, T_ENTITY } from "../../Reference/Config";
import {
  ENUM_ENEMY_STATE,
  ENUM_ENTITY,
  ENUM_RESOURCE_EXTRA,
} from "../../Reference/Enum";
import { ResourceBus } from "../../Runtime/ResourceBus";
import { PlayerManager } from "../Player/PlayerManager";
import { createUINode, sleepAnimation } from "../Util";

export class EnemyManager extends Entity {
  isDeal: boolean = false;
  protected entity_key: ENUM_ENTITY;
  protected entity: T_ENTITY;
  protected position: Vec3;
  protected HPNode: Node;
  private property = {
    HP: 30,
    ATK: 10,
    AMR: 10,
    AP: 1,
    SKILL: [],
  };

  constructor(entity: ENUM_ENTITY, addi: number, position?: Vec3) {
    super(CONFIG_ENTITY.get(entity), position);
    this.entity_key = entity;
    this.position = position;
    this.isDeal = false;
    this.tokeRotation();
    this.entity = CONFIG_ENTITY.get(entity);
    this.loadClips();
    this.animationComponent.on(
      Animation.EventType.FINISHED,
      (e) => {
        console.log(e);
      },
      this
    );
    this.createHPBlock();
  }

  protected loadClips() {
    this.loadIdleClip();
    this.loadAttackClip();
    this.loadBeAttackClip();
    this.loadDealClip();
  }

  protected loadIdleClip() {
    const spriteFrames = ResourceBus.instance.enemy_state
      .get(this.entity_key)
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

  protected loadDealClip() {
    const clip = new AnimationClip();
    clip.name = ENUM_ENEMY_STATE.DEAL;
    clip.duration = 0.3;
    clip.wrapMode = AnimationClip.WrapMode.Normal;

    const trackRo = new animation.VectorTrack();
    trackRo.componentsCount = 3;
    trackRo.path = new animation.TrackPath().toProperty("scale");
    const [x1, y1, z1] = trackRo.channels();
    let tempValue = this.entity.scale.y ? this.entity.scale.y : 1;
    const frames: Array<[number, any]> = [
      [0.1, { value: tempValue }],
      [0.2, { value: tempValue / 2 }],
      [0.3, { value: 0 }],
    ];
    y1.curve.assignSorted(frames);
    clip.addTrack(trackRo);
    this.animationComponent.clips.push(clip);
  }

  protected createHPBlock() {
    this.HPNode = createUINode();
    this.node.addChild(this.HPNode);
    const sprite = this.HPNode.addComponent(Sprite);
    const ui = this.HPNode.getComponent(UITransform);
    ui.setContentSize(15, 2);
    sprite.color = new Color(255, 255, 255);
    sprite.sizeMode = Sprite.SizeMode.CUSTOM;
    sprite.spriteFrame = ResourceBus.instance.extra.get(
      ENUM_RESOURCE_EXTRA.NULL
    );
    const widget = this.HPNode.addComponent(Widget);
    widget.isAlignBottom = true;
    widget.bottom = -3;
  }

  protected createHP() {
    // const ui = this.HPNode.getComponent(UITransform)
    // ui.setContentSize( , 2)
  }

  async attack(player: PlayerManager) {
    this.animationComponent.play(ENUM_ENEMY_STATE.ATTACK);
    await player.beAttacked(this);
    return true;
  }

  async beAttacked(player: PlayerManager) {
    this.animationComponent.play(ENUM_ENEMY_STATE.BEATTACKED);
    await sleepAnimation(this.animationComponent, ENUM_ENEMY_STATE.BEATTACKED);
  }

  async deal(): Promise<void> {
    this.animationComponent.play(ENUM_ENEMY_STATE.DEAL);
    await sleepAnimation(this.animationComponent, ENUM_ENEMY_STATE.DEAL);
    this.node.removeFromParent();
    this.node.destroy();
    this.isDeal = true;
  }
}
