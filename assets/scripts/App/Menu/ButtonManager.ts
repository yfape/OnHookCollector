import {
  _decorator,
  Component,
  Node,
  Widget,
  Layout,
  math,
  resources,
  SpriteFrame,
  Sprite,
  UITransform,
  find,
  Label,
  Input,
} from "cc";
import { ResourceBus } from "../../Runtime/ResourceBus";
import {
  ENUM_BUTTON,
  ENUM_EVENT,
  ENUM_RESOURCE_EXTRA,
} from "../../Reference/Enum";
import { createUINode } from "../Util";
import { EventBus } from "../../Runtime/EventManager";
import { NodeClass } from "../../Base/NodeClass";
const { ccclass, property } = _decorator;

const STYLE = {
  WIDTH: 50,
  HEIGHT: 25,
};

interface IProps {
  id: ENUM_BUTTON;
  name: string;
  on: boolean;
}

export class ButtonManager extends NodeClass {
  props: IProps = null;
  constructor(props: IProps) {
    super();
    this.props = props;
    this.create();
  }

  private create() {
    let ui = this.node.getComponent(UITransform);
    ui.setContentSize(STYLE.WIDTH, STYLE.HEIGHT);

    const spriteNode = createUINode();
    spriteNode.on(Input.EventType.TOUCH_START, () => {
      EventBus.instance.emit(ENUM_EVENT.MENU_CHANGE, this.props.id);
    });
    const sprite = spriteNode.addComponent(Sprite);
    sprite.sizeMode = Sprite.SizeMode.CUSTOM;
    this.setSprite(sprite);

    ui = spriteNode.getComponent(UITransform);
    ui.setContentSize(STYLE.WIDTH, STYLE.HEIGHT);
    this.node.addChild(spriteNode);

    const labelNode = createUINode();
    const labelComponent = labelNode.addComponent(Label);
    labelComponent.string = this.props.name;
    labelComponent.fontSize = 14;
    this.node.addChild(labelNode);
  }

  private setSprite(sprite: Sprite) {
    sprite.spriteFrame = ResourceBus.instance.extra.get(
      this.props.on
        ? ENUM_RESOURCE_EXTRA.BUTTON1_ON
        : ENUM_RESOURCE_EXTRA.BUTTON1
    );
  }

  triggle() {
    this.props.on = !this.props.on;
    const sprite = this.node.getComponentInChildren(Sprite);
    this.setSprite(sprite);
  }
}
