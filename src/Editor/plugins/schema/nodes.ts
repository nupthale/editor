
import { nodes as basicNodes } from 'prosemirror-schema-basic';
import { NodeSpec } from 'prosemirror-model';

import { titleSchema } from '../nodes/title/schema';
import { paragraphSchema } from '../nodes/paragraph/schema';

export const nodes: Record<string, NodeSpec> = {
  // 使用基础节点
  ...basicNodes,
  
  doc: {
    content: "title block+"
  },

  ...titleSchema,

  // 文本节点
  text: {
    group: 'inline'
  },

  ...paragraphSchema,
  
  // 添加更多自定义节点...
};