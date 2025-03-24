import { NodeSpec } from 'prosemirror-model';

export const listSchema: Record<string, NodeSpec> = {
  list_head: {
    content: "inline*",
    group: "block",
    attrs: {
      showIndex: { default: true },
    },
    parseDOM: [{
      tag: "div",
      attrs: {
        class: "doc-list-head",
      },
    }],
    toDOM(node) {
      return ["div", {
        class: "doc-list-head",
      }, 0];
    }
  },
  list_body: {
    content: "(list | paragraph)+",
    group: "block",
    parseDOM: [{
      tag: "div",
      attrs: {
        class: "doc-list-body",
      },
    }],
    toDOM(node) {
      return ["div", {
        class: "doc-list-body",
      }, 0];
    }
  },
  list: {
    content: "list_head list_body?",
    group: "block",
    attrs: {
      start: { default: 1 },
      level: { default: 1 },
      id: { default: '' },
      parentId: { default: null },
      ordered: { default: true },
    },
    parseDOM: [{
      tag: "div.doc-list",
      priority: 52,  // 提高优先级
    }],
    toDOM(node) {
      return ["div", {
        class: "doc-list",
      }, 0];
    }
  },
};