import { Component, Node } from "cc";
import { createUINode } from "../App/Util";

export class NodeClass extends Component {
  node: Node = null;
  constructor() {
    super();
    this.node = createUINode();
  }

  destroyNode() {
    this.node.removeFromParent();
    this.node.destroy();
  }
}
