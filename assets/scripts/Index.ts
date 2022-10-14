import { _decorator, Component, Node } from "cc";
import { MenuManager } from "./App/Menu/MenuManager";
import { StageManager } from "./App/Stage/StageManager";
import { ENUM_RESOURCE_MAP } from "./Reference/Enum";
import { ResourceBus } from "./Runtime/ResourceBus";
const { ccclass, property } = _decorator;

@ccclass("Index")
export class Index extends Component {
  start() {
    ResourceBus.instance.load().then(() => {
      this.loadMenu();
      this.loadStage();
    });
  }

  loadMenu() {
    const menu = new MenuManager();
    this.node.addChild(menu.node);
  }

  loadStage() {
    this.node.addChild(StageManager.instance.node);
  }
}
