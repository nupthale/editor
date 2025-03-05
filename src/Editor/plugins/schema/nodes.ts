
import { nodes as basicNodes } from 'prosemirror-schema-basic';
import { NodeSpec } from 'prosemirror-model';

import { titleSchema } from '../nodes/title/schema';

export const nodes: Record<string, NodeSpec> = {
  // 使用基础节点
  ...basicNodes,
  
  doc: {
    content: "title block+"
  },

  ...titleSchema,

  // 文本块节点
  block: {
    content: 'text*',
    group: 'block',
    toDOM() {
      return ['p', 0];
    },
    parseDOM: [{ tag: 'p' }]
  },
  // 文本节点
  text: {
    group: 'inline'
  },

  // 自定义节点
  // 例如，可以扩展 paragraph 节点
  paragraph: {
    ...basicNodes.paragraph,
    content: "inline*",
    group: "block",
    parseDOM: [{tag: "p"}],
    toDOM() { return ["p", 0] }
  },
  
  // 添加更多自定义节点...
};