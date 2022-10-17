import { Component, Layout, Node, UITransform, Widget } from "cc";
import { NodeClass } from "../../Base/NodeClass";
import { CONFIG_MENU_BUTTON } from "../../Reference/Config";
import { ENUM_BUTTON, ENUM_EVENT } from "../../Reference/Enum";
import { EventBus } from "../../Runtime/EventManager";
import { createUINode } from "../Util";
import { ButtonManager } from "./ButtonManager";

export const MENU_CONFIG = {
  CONTAINER_HEIGHT: 30,
  CONTAINER_PADDING: 8.3,
};

export class MenuManager extends NodeClass {
  private buttons: Array<ButtonManager> = [];
  private _active: number = ENUM_BUTTON.CHARATOR;
  get active() {
    return this._active;
  }
  set active(newValue: ENUM_BUTTON) {
    if (this._active === newValue) return;
    this.buttons[this._active].triggle();
    this._active = newValue;
    this.buttons[this._active].triggle();
    //修改面板
  }

  constructor() {
    super();
    this.create();
    EventBus.instance.on(
      ENUM_EVENT.CHANGEMENU,
      (button: ENUM_BUTTON) => {
        this.active = button;
      },
      this
    );
  }

  //创建节点
  protected create() {
    const ui = this.node.getComponent(UITransform);
    ui.height = MENU_CONFIG.CONTAINER_HEIGHT;
    const widget = this.node.addComponent(Widget);
    widget.isAlignBottom = widget.isAlignLeft = widget.isAlignRight = true;
    widget.left = widget.right = widget.bottom = 0;
    widget.alignMode = Widget.AlignMode.ONCE;
    const layout = this.node.addComponent(Layout);
    layout.type = Layout.Type.HORIZONTAL;
    layout.alignHorizontal = true;
    layout.resizeMode = Layout.ResizeMode.CHILDREN;
    layout.paddingLeft = layout.paddingRight = MENU_CONFIG.CONTAINER_PADDING;
    layout.affectedByScale = true;
    this.createButtons();
  }

  //创建按钮组
  private createButtons() {
    this.node.removeAllChildren();
    CONFIG_MENU_BUTTON.forEach((item, index) => {
      const button = new ButtonManager({
        id: index,
        name: item.name,
        on: this.active === index ? true : false,
      });
      this.node.addChild(button.node);
      this.buttons.push(button);
    });
  }
}
