import { _decorator, Component, Node, NodeEventType, Vec2, Vec3 } from "cc";
import { CONFIG_WORLDMAP } from "../Reference/Config";
const { ccclass, property } = _decorator;

@ccclass("WorldMap")
export class WorldMap extends Component {
  protected current_point: Vec2 = null;
  protected current_local: Vec3 = null;
  start() {
    this.node.on(NodeEventType.TOUCH_START, this.touchStart, this);
    this.node.on(NodeEventType.TOUCH_MOVE, this.touchMove, this);
  }

  update(deltaTime: number) {}

  touchStart(e) {
    this.current_local = this.node.getPosition();
    this.current_point = e.touch._point;
  }

  touchMove(e) {
    let c = new Vec2();
    Vec2.subtract(c, e.touch._point, this.current_point);
    Vec3.add(
      this.current_local,
      this.current_local,
      new Vec3(c.x / CONFIG_WORLDMAP.speed, c.y / CONFIG_WORLDMAP.speed, 0)
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
}
