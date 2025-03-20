import { NodeSpec } from 'prosemirror-model';

export const listSchema: Record<string, NodeSpec> = {
  list_head: {
    content: "inline*",
    group: "block",
    parseDOM: [{
      tag: "div",
      contentElement: ".doc-list-content", // 指定可编辑区域
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
    content: "list+",
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
      tag: "div",
      getAttrs(dom) {
        return {
          class: "doc-list",
        };
      }
    }],
    toDOM(node) {
      return ["ol", {
        class: "doc-list",
      }, 0];
    }
  },
};