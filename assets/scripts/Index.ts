import { _decorator, Component, Node, find } from "cc";
import { MenuManager } from "./App/Menu/MenuManager";
import { StageManager } from "./App/Stage/StageManager";
import { WorldMap } from "./Direct/WorldMap";
import { ENUM_EVENT, ENUM_RESOURCE_MAP } from "./Reference/Enum";
import { EventBus } from "./Runtime/EventManager";
import { ResourceBus } from "./Runtime/ResourceBus";
const { ccclass, property } = _decorator;

@ccclass("Index")
export class Index extends Component {
  worldmap: Node = null;
  menu: MenuManager = null;
  stage: StageManager = null;

  onLoad() {
    this.worldmap = find("worldmap", this.node);
    EventBus.instance.on(ENUM_EVENT.TRIGGLGWORLDMAP, () => {
      if (find("worldmap", this.node)) {
        this.worldmap.removeFromParent();
      } else {
        this.worldmap.setParent(this.node);
      }
    });
    ResourceBus.instance.load().then(() => {
      this.loadMenu();
      // this.loadStage();
      // this.stage.begin();
    });
  }

  loadMenu() {
    this.menu = new MenuManager();
    this.node.addChild(this.menu.node);
  }

  loadStage() {
    this.stage = new StageManager();
    this.node.addChild(this.stage.node);
  }
}
