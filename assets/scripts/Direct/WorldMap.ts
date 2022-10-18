import {
  _decorator,
  Component,
  Node,
  NodeEventType,
  Vec2,
  Vec3,
  find,
  Sprite,
} from "cc";
import { SingleTon } from "../Base/SingleTon";
import { CONFIG_SYSTEM } from "../Reference/Config";
import { ENUM_EVENT, ENUM_LEVEL } from "../Reference/Enum";
import { EventBus } from "../Runtime/EventManager";
const { ccclass, property } = _decorator;

@ccclass("WorldMap")
export class WorldMap extends Component {
  protected current_point: Vec2 = null;
  protected current_local: Vec3 = null;
  protected itemNodes: Array<Node> = [];

  start() {
    this.node.on(NodeEventType.TOUCH_START, this.touchStart, this);
    this.node.on(NodeEventType.TOUCH_MOVE, this.touchMove, this);
    this.itemNodes = this.node.children;
    this.addBindToItem();
  }

  update(deltaTime: number) {}

  protected addBindToItem() {
    for (let i = 0; i < this.itemNodes.length; i++) {
      this.itemNodes[i].on(NodeEventType.TOUCH_START, this.toStage);
    }
  }

  protected toStage(e) {
    let level_num = e.target.name.split("_")[1];
    EventBus.instance.emit(
      ENUM_EVENT.STAGE_SHOW,
      ENUM_LEVEL[ENUM_LEVEL[level_num]]
    );
  }

  protected touchStart(e) {
    this.current_local = this.node.getPosition();
    this.current_point = e.touch._point;
  }

  protected touchMove(e) {
    let c = new Vec2();
    Vec2.subtract(c, e.touch._point, this.current_point);
    Vec3.add(
      this.current_local,
      this.current_local,
      new Vec3(
        c.x / CONFIG_SYSTEM.worldMap.speed,
        c.y / CONFIG_SYSTEM.worldMap.speed,
        0
      )
    );
    if (this.current_local.y > 0) {
      this.current_local.y = 0;
    } else if (this.current_local.y < -300) {
      this.current_local.y = -300;
    }

    if (this.current_local.x > -170) {
      this.current_local.x = -170;
    } else if (this.current_local.x < -630) {
      this.current_local.x = -630;
    }
    this.node.setPosition(this.current_local);
    this.current_point = e.touch._point;
  }

  /**
   * 切换显示和隐藏世界地图
   */
  triggle(status?: boolean) {
    let vec3: number[] = [];
    if (status === undefined) {
      vec3 = !this.node.scale.x ? [1, 1, 1] : [0, 0, 0];
    } else {
      vec3 = status ? [1, 1, 1] : [0, 0, 0];
    }
    this.node.setScale(new Vec3(...vec3));
  }
}
