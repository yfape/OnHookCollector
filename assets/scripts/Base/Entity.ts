import {
  Component,
  math,
  Node,
  Quat,
  Sprite,
  UITransform,
  Vec3,
  Animation,
  Enum,
  Widget,
  Color,
} from "cc";
import { createUINode, sleep } from "../App/Util";
import { T_ENTITY } from "../Reference/Config";
import { ENUM_RESOURCE_EXTRA } from "../Reference/Enum";
import { ResourceBus } from "../Runtime/ResourceBus";

export abstract class Entity extends Component {
  node: Node = null;
  protected entityConfig: T_ENTITY = null;
  protected position: Vec3 = null;
  protected shadowInit = {
    size: math.size(13, 4),
    position: new Vec3(0, -12, 0),
  };
  protected shadowNode: Node = null;
  protected animationComponent: Animation = null;

  constructor(entity: T_ENTITY, position?: Vec3) {
    super();
    this.position = position;
    this.entityConfig = entity;
    this.create();
    this.createShadow();
  }

  /**
   * 创建主节点
   */
  protected create() {
    this.node = createUINode();
    this.position && this.node.setPosition(this.position);
    this.entityConfig.scale && this.node.setScale(this.entityConfig.scale);
    this.animationComponent = this.node.addComponent(Animation);
    this.animationComponent.playOnLoad = true;
    this.animationComponent.on(Animation.EventType.FINISHED, () => {
      this.animationComponent.play();
    });
    const sprite = this.node.addComponent(Sprite);
    sprite.sizeMode = Sprite.SizeMode.TRIMMED;
  }

  /**
   * 创建阴影
   */
  protected createShadow() {
    const config = this.entityConfig.shadow
      ? this.entityConfig.shadow
      : this.shadowInit;
    this.shadowNode = createUINode();
    this.node.addChild(this.shadowNode);
    this.shadowNode.setPosition(config.position);
    const ui = this.shadowNode.getComponent(UITransform);
    ui.setContentSize(config.size);
    const sprite = this.shadowNode.addComponent(Sprite);
    sprite.sizeMode = Sprite.SizeMode.CUSTOM;
    sprite.spriteFrame = ResourceBus.instance.extra.get(
      ENUM_RESOURCE_EXTRA.SHADOW
    );
  }

  /**
   * 角色转向
   */
  tokeRotation() {
    this.node.setRotation(new Quat(0, 1, 0));
  }

  /**
   * 显示伤害数值
   */
  protected showHurt() {}

  /**
   * 攻击
   */
  abstract attack(enetity: Entity);

  /**
   * 被攻击
   */
  abstract beAttacked(entity: Entity);

  /**
   * 死亡
   */
  abstract deal(): void;
}
