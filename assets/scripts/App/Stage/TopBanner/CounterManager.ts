import {
  animation,
  Animation,
  AnimationClip,
  Component,
  Label,
  LabelComponent,
  Node,
  UITransform,
  Vec3,
} from "cc";
import { NodeClass } from "../../../Base/NodeClass";
import { CONFIG_SYSTEM } from "../../../Reference/Config";
import { ENUM_NODE } from "../../../Reference/Enum";
import { sleep } from "../../Util";

export class CounterManager extends NodeClass {
  label: Label = null;
  current: number = 1;
  limit: number = CONFIG_SYSTEM.counter.limit;

  constructor(parentNode: Node, current: number) {
    super();
    this.current = current;
    this.node.name = ENUM_NODE.COUNTER;
    this.node.setPosition(0, 100);
    this.label = this.node.addComponent(Label);
    this.label.fontSize = 14;
    this.setLabelString();
    this.node.setParent(parentNode);
  }

  protected setLabelString() {
    if (this.current <= this.limit) {
      this.label.string = `层数 ${this.current} / ${this.limit}`;
    } else {
      this.label.string = `层数 ${this.limit}`;
    }
  }

  change(current: number) {
    this.current = current;
    this.setLabelString();
  }
}
