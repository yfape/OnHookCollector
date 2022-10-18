import { _decorator, Component, Node, find, Vec3, Script } from "cc";
import { MenuManager } from "./App/Menu/MenuManager";
import { StageManager } from "./App/Stage/StageManager";
import { WorldMap } from "./Direct/WorldMap";
import { ENUM_EVENT, ENUM_LEVEL, ENUM_RESOURCE_MAP } from "./Reference/Enum";
import { EventBus } from "./Runtime/EventManager";
import { ResourceBus } from "./Runtime/ResourceBus";
const { ccclass, property } = _decorator;

@ccclass("Index")
export class Index extends Component {
  worldMap: WorldMap = null;
  menu: MenuManager = null;
  stage: StageManager = null;

  onLoad() {
    ResourceBus.instance.load().then(() => {
      //加载实例
      this.menu = new MenuManager();
      this.stage = new StageManager();
      this.worldMap = find("worldmap", this.node).getComponent(
        "WorldMap"
      ) as WorldMap;
      //绑定节点
      this.node.addChild(this.menu.node);
      this.node.addChild(this.worldMap.node);
      //绑定事件
      EventBus.instance.on(ENUM_EVENT.STAGE_SHOW, this.stageShow, this);
      //开发中直接加载战斗场景
      this.worldMap.triggle(true);
    });
  }
  /**
   * 舞台显示
   */
  protected stageShow(level: ENUM_LEVEL) {
    this.worldMap.triggle(false);
    this.stage.load(level);
    this.node.addChild(this.stage.node);
    this.stage.begin();
  }
}
