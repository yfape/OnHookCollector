import { math, Node, Sprite, UITransform, Vec3, Widget } from "cc";
import { SingleTon } from "../../Base/SingleTon";
import { CONFIG_SYSTEM_STYLE } from "../../Reference/Config";
import { ENUM_ENTITY, ENUM_RESOURCE_MAP } from "../../Reference/Enum";
import { ResourceBus } from "../../Runtime/ResourceBus";
import { EnemyManager } from "../Enemy/EnemyManager";
import { PlayerManager } from "../Player/PlayerManager";
import { createUINode } from "../Util";

export class StageManager extends SingleTon {
  static get instance() {
    return super.getInstance<StageManager>();
  }

  node: Node = null;
  map: ENUM_RESOURCE_MAP = ENUM_RESOURCE_MAP.MAP1;
  player: PlayerManager = null;
  enemys: Array<EnemyManager> = [];

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
    this.begin();
  }

  protected create() {
    this.node = createUINode();
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

  protected begin() {
    this.setEnemy(3);
  }

  protected setPlayer() {
    this.player = new PlayerManager(this.player_positions);
    this.node.addChild(this.player.node);
  }

  protected setEnemy(num: number) {
    let i = 0;
    while (i < num) {
      const enemy = new EnemyManager(
        ENUM_ENTITY.ENEMY1,
        this.entity_positions[i]
      );
      enemy.node.setParent(this.node);
      this.enemys.push(enemy);
      i++;
    }
  }
}
