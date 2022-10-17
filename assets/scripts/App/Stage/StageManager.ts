import {
  Component,
  find,
  math,
  Node,
  Sprite,
  UITransform,
  Vec3,
  Widget,
} from "cc";
import { NodeClass } from "../../Base/NodeClass";
import { SingleTon } from "../../Base/SingleTon";
import { CONFIG_SYSTEM_STYLE } from "../../Reference/Config";
import {
  ENUM_ENTITY,
  ENUM_NODE,
  ENUM_RESOURCE_MAP,
} from "../../Reference/Enum";
import { ResourceBus } from "../../Runtime/ResourceBus";
import { EnemyManager } from "../Enemy/EnemyManager";
import { PlayerManager } from "../Player/PlayerManager";
import { createUINode, randomFromArray } from "../Util";
import { TimeManager } from "./TimeManager";

export class StageManager extends NodeClass {
  map: ENUM_RESOURCE_MAP = ENUM_RESOURCE_MAP.MAP1;
  player: PlayerManager = null;
  enemys: Array<EnemyManager> = [];
  timeManager: TimeManager = null;

  enemy_hub: Array<ENUM_ENTITY> = [
    ENUM_ENTITY.ENEMY1,
    ENUM_ENTITY.ENEMY2,
    ENUM_ENTITY.ENEMY3,
    ENUM_ENTITY.ENEMY4,
    ENUM_ENTITY.ENEMY5,
  ];

  player_positions: Vec3 = new Vec3(-110, -25);
  entity_positions: Vec3[] = [
    new Vec3(80, -50),
    new Vec3(110, 0),
    new Vec3(110, -100),
  ];

  constructor() {
    super();
    this.create();
    this.setPlayer();
    this.setTime();
  }

  protected create() {
    const ui = this.node.getComponent(UITransform);
    ui.setContentSize(0, CONFIG_SYSTEM_STYLE.HEIGHT / 2);
    const sprite = this.node.addComponent(Sprite);
    sprite.sizeMode = Sprite.SizeMode.CUSTOM;
    this.node.addComponent(Widget);
    this.setMap();
    this.setWidget();
  }

  protected setWidget() {
    const widget = this.node.getComponent(Widget);
    widget.isAlignLeft = widget.isAlignRight = widget.isAlignTop = true;
    widget.top = widget.left = widget.right = 0;
  }

  protected setMap() {
    const sprite = this.node.getComponent(Sprite);
    sprite.spriteFrame = ResourceBus.instance.map.get(this.map);
  }

  async begin() {
    this.setEnemy(3);
    await this.timeManager.run(this.node);
  }

  protected setPlayer() {
    this.player = new PlayerManager(this.player_positions);
    this.node.addChild(this.player.node);
  }

  protected setEnemy(num: number) {
    let i = 0;
    while (i < num) {
      let enetity = randomFromArray(this.enemy_hub);
      const enemy = new EnemyManager(enetity, this.entity_positions[i]);
      enemy.node.setParent(this.node);
      this.enemys.push(enemy);
      i++;
    }
  }
  protected setTime() {
    this.timeManager = new TimeManager(4);
  }
}
