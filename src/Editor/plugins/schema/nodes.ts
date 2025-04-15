
import { NodeSpec, DOMOutputSpec } from 'prosemirror-model';

import { titleSchema } from '../nodes/title/schema';
import { textBlockSchema } from '../nodes/text/schema';
import { headerSchema } from '../nodes/header/schema';
import { mentionSchema } from '../nodes/mention/schema';
import { highlightSchema } from '../nodes/highlight/schema';
import { listSchema } from '../nodes/list/schema';
import { tableSchema } from '../nodes/table/schema';

export const nodes: Record<string, NodeSpec> = {
  // 使用基础节点
  // ...basicNodes,
  
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
    toDOM(): DOMOutputSpec { 
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
  
  // 添加硬换行节点定义
  hardBreak: {
    inline: true,
    group: "inline",
    selectable: false,
    parseDOM: [{tag: 'br'}],
    toDOM() { return ['br'] }
  },

  // 不允许光标进入内部
  emoji: {
    inline: true,
    group: 'inline',
    selectable: false,
    content: 'text*',  // 允许包含文本内容
    parseDOM: [{tag: 'span.emoji'}],
    toDOM(node) { return ['span', {
      class: 'emoji',
    }, node.textContent]}
  },

  ...textBlockSchema,
  ...headerSchema,
  ...mentionSchema,
  ...highlightSchema,
  ...listSchema,
  ...tableSchema,

  // 添加更多自定义节点...
};