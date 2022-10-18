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
import { ENUM_NODE } from "../../../Reference/Enum";
import { sleep } from "../../Util";

interface I_Props {
  maxTime: number;
  position?: Vec3;
}

export class TimeManager extends NodeClass {
  animationComponent: Animation = null;
  props = {
    maxTime: 3,
    position: new Vec3(0, 0, 0),
  };
  label: Label = null;

  constructor(parentNode: Node, maxTime: number) {
    super();
    this.node.name = ENUM_NODE.TIME;
    this.props.maxTime = maxTime;
    this.create();
    this.node.setParent(parentNode);
  }

  protected create() {
    this.label = this.node.addComponent(Label);
    this.label.fontSize = 30;
    this.label.isBold = true;
    this.label.string = "";
    this.animationComponent = this.node.addComponent(Animation);
    const clip = new AnimationClip();
    clip.duration = this.props.maxTime;
    clip.wrapMode = AnimationClip.WrapMode.Normal;

    const trackScale = new animation.VectorTrack();
    trackScale.path = new animation.TrackPath().toProperty("scale");
    const [x, y] = trackScale.channels();
    let scaleArr: Array<[number, any]> = [];

    for (let i = 0; i < this.props.maxTime; i++) {
      scaleArr = scaleArr.concat([
        [i + 0.0, { value: 1 }],
        [i + 0.15, { value: 2 }],
        [i + 0.3, { value: 1 }],
      ]);
    }
    x.curve.assignSorted(scaleArr);
    y.curve.assignSorted(scaleArr);
    clip.addTrack(trackScale);

    const trackText = new animation.ObjectTrack();
    trackText.path = new animation.TrackPath()
      .toComponent(Label)
      .toProperty("string");
    let labelArr: Array<[number, any]> = [];
    for (let i = 0; i < this.props.maxTime; i++) {
      let v = this.props.maxTime - i - 1;
      let vs = !v ? "Fight!" : v.toString();
      labelArr.push([i, vs]);
    }
    labelArr.push([this.props.maxTime - 1 + 0.5, ""]);

    trackText.channel.curve.assignSorted(labelArr);
    clip.addTrack(trackText);
    clip.name = "default";
    this.animationComponent.clips.push(clip);
  }

  async run() {
    this.animationComponent.play("default");
    let timer;
    return new Promise((resolve) => {
      timer = setInterval(() => {
        const as = this.animationComponent.getState("default");
        if (as.isMotionless) {
          clearInterval(timer);
          this.node.removeFromParent();
          this.node.destroy();
          resolve(true);
        }
      }, 100);
    });
  }
}
