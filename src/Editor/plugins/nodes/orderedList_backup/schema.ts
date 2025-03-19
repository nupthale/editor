import { NodeSpec } from 'prosemirror-model';

export const orderedListSchema: Record<string, NodeSpec> = {
  ordered_list: {
    content: "ordered_list_item+",
    group: "block",
    attrs: {
      start: { default: 1 },
      level: { default: 1 }
    },
    parseDOM: [{
      tag: "ol",
      getAttrs(dom) {
        return {
          start: dom.hasAttribute("start") ? +dom.getAttribute("start")! : 1,
          level: dom.getAttribute("data-level") || 1
        };
      }
    }],
    toDOM(node) {
      return ["ol", {
        start: node.attrs.start !== 1 ? node.attrs.start : null,
        "data-level": node.attrs.level
      }, 0];
    }
  },
  
  ordered_list_item: {
    content: "block+",
    defining: true,
    parseDOM: [{ tag: "li" }],
    toDOM() { return ["li", 0]; }
  }
};