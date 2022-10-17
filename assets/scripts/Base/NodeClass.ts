import { Component, Node } from "cc";
import { createUINode } from "../App/Util";

export class NodeClass extends Component {
  Node: Node = null;
  constructor() {
    super();
    this.node = createUINode();
  }
}
