
import { nodes as basicNodes } from 'prosemirror-schema-basic';
import { NodeSpec, DOMOutputSpec } from 'prosemirror-model';

import { titleSchema } from '../nodes/title/schema';
import { paragraphSchema } from '../nodes/paragraph/schema';
import { headingSchema } from '../nodes/heading/schema';
import { mentionSchema } from '../nodes/mention/schema';

export const nodes: Record<string, NodeSpec> = {
  // 使用基础节点
  ...basicNodes,
  
  doc: {
    content: "title body"
  },

  body: {
    content: 'block+',
    parseDOM: [{ 
      tag: "div", 
      attrs: { 
        class: "doc-body",
      } 
    }],
    toDOM(node): DOMOutputSpec { 
      return ["div", { 
        class: "doc-body",
      }, 0] 
    }
  },

  ...titleSchema,

  // 文本节点
  text: {
    group: 'inline'
  },

  ...paragraphSchema,
  ...headingSchema,
  ...mentionSchema,
  
  // 添加更多自定义节点...
};