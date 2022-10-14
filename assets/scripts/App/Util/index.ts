import { Layers, Node, UITransform } from "cc";

type IAnchor = {
  x: number;
  y: number;
};

export const createUINode = (
  name: string = "",
  anchor: IAnchor = { x: 0.5, y: 0.5 }
) => {
  const node = new Node(name);
  const transform = node.addComponent(UITransform);
  transform.setAnchorPoint(anchor.x, anchor.y);
  node.layer = 1 << Layers.nameToLayer("UI_2D");
  return node;
};
