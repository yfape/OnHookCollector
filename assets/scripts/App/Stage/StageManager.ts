import { Label, Node, Sprite, UITransform, Vec3, Widget } from "cc";
import { NodeClass } from "../../Base/NodeClass";
import { CONFIG_LEVEL, CONFIG_SYSTEM, TYPE_MAP } from "../../Reference/Config";
import { ENUM_ENTITY, ENUM_LEVEL } from "../../Reference/Enum";
import { ResourceBus } from "../../Runtime/ResourceBus";
import { EnemyManager } from "../Enemy/EnemyManager";
import { PlayerManager } from "../Player/PlayerManager";
import { createUINode, randomFromArray, sleep } from "../Util";
import { CounterManager } from "./TopBanner/CounterManager";
import { TimeManager } from "./Extra/TimeManager";

const player_positions: Vec3 = new Vec3(-110, -25);
const entity_positions: Vec3[] = [
  new Vec3(80, -50),
  new Vec3(110, 0),
  new Vec3(110, -100),
];

export class StageManager extends NodeClass {
  //实例组
  player: PlayerManager = null;
  enemys: Array<EnemyManager> = [];
  timeManager: TimeManager = null;
  counterManager: CounterManager = null;
  mapData: TYPE_MAP;

  constructor() {
    super();
    this.create();
  }

  /**
   * 创建主节点、玩家、计时器等
   */
  protected create() {
    const ui = this.node.getComponent(UITransform);
    ui.setContentSize(0, CONFIG_SYSTEM.window.height / 2);
    const sprite = this.node.addComponent(Sprite);
    sprite.sizeMode = Sprite.SizeMode.CUSTOM;
    this.node.addComponent(Widget);
    const widget = this.node.getComponent(Widget);
    widget.isAlignLeft = widget.isAlignRight = widget.isAlignTop = true;
    widget.top = widget.left = widget.right = 0;
    this.player = new PlayerManager(player_positions);
    this.node.addChild(this.player.node);
    this.timeManager = new TimeManager(this.node, 4);
    this.counterManager = new CounterManager(this.node, 1);
  }

  /**
   * 设置敌人
   */
  protected setEnemy(num: number) {
    let i = 0;
    while (i < num) {
      let enetity = randomFromArray(this.mapData.enemys);
      const enemy = new EnemyManager(
        enetity,
        this.mapData.addi,
        entity_positions[i]
      );
      enemy.node.setParent(this.node);
      this.enemys.push(enemy);
      i++;
    }
  }

  /**
   * 加载
   * @param level
   */
  load(level: ENUM_LEVEL) {
    this.mapData = CONFIG_LEVEL.get(level);
    const sprite = this.node.getComponent(Sprite);
    sprite.spriteFrame = ResourceBus.instance.map.get(this.mapData.map);
  }

  /**
   * 开始
   */
  async begin() {
    await this.enemys.forEach((item) => item.deal());
    await this.timeManager.run();
    while (true) {
      this.setEnemy(3);
      await sleep(500);
      await this.onSection();
      await sleep(500);
    }
  }

  /**
   * 单场
   * @returns
   */
  async onSection() {
    while (this.enemys.length > 0) {
      await this.once();
    }
    return true;
  }

  /**
   * 单回合
   */
  async once() {
    let num = Math.floor(Math.random() * this.enemys.length);
    await this.player.attack(this.enemys[num]);
    await sleep(300);
    for (let i = 0; i < this.enemys.length; i++) {
      if (!this.enemys[i].isDeal) {
        await this.enemys[i].attack(this.player);
      } else {
        this.enemys.splice(i, 1);
      }
      await sleep(300);
    }
    console.log("完成一回合");
  }
}
