import {
  Animation,
  animation,
  AnimationClip,
  Sprite,
  SpriteFrame,
  Vec3,
} from "cc";
import { Entity } from "../../Base/Entity";
import { CONFIG_ENTITY, CONFIG_PLAYER_STATE } from "../../Reference/Config";
import {
  ENUM_ENTITY,
  ENUM_EVENT,
  ENUM_PLAYER_STATE,
} from "../../Reference/Enum";
import { EventBus } from "../../Runtime/EventManager";
import { ResourceBus } from "../../Runtime/ResourceBus";
import { EnemyManager } from "../Enemy/EnemyManager";
import { sleep, sleepAnimation } from "../Util";

export class PlayerManager extends Entity {
  constructor(position?: Vec3) {
    super(CONFIG_ENTITY.get(ENUM_ENTITY.PLAYER), position);
    this.animationComponent = this.node.addComponent(Animation);
    this.animationComponent.playOnLoad = true;
    this.animationComponent.on(Animation.EventType.FINISHED, () => {
      this.animationComponent.play();
    });
    this.loadClips();
    EventBus.instance.on(ENUM_EVENT.PLAYER_ATTACK, this.attack, this);
  }

  protected loadClips() {
    CONFIG_PLAYER_STATE.forEach((item, state) => {
      const spriteFrames = ResourceBus.instance.player_state
        .get(state)
        .getSpriteFrames();
      const track = new animation.ObjectTrack();
      track.path = new animation.TrackPath()
        .toComponent(Sprite)
        .toProperty("spriteFrame");
      let itemtime = item.duration / spriteFrames.length;
      const frames: Array<[number, SpriteFrame]> = spriteFrames.map(
        (value, index) => [itemtime * index, value]
      );
      track.channel.curve.assignSorted(frames);
      const clip = new AnimationClip();
      clip.duration = item.duration;
      clip.wrapMode = item.wrap;
      clip.addTrack(track);
      clip.name = item.name;
      if (item.default) {
        this.animationComponent.defaultClip = clip;
      }
      this.animationComponent.clips.push(clip);
    });
  }

  async attack(enemy: EnemyManager) {
    this.animationComponent.play(ENUM_PLAYER_STATE.ATTACK);
    await enemy.beAttacked(this);
    return true;
  }

  async beAttacked(entity: EnemyManager) {
    this.animationComponent.play(ENUM_PLAYER_STATE.BEATTACKED);
    await sleepAnimation(this.animationComponent, ENUM_PLAYER_STATE.BEATTACKED);
  }

  deal(): void {
    this.animationComponent.play(ENUM_PLAYER_STATE.DEAL);
  }
}
