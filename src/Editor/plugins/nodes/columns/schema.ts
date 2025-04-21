import { NodeSpec } from 'prosemirror-model';

export const columnsSchema: Record<string, NodeSpec> = {
  columns: {
    content: "column+",
    group: "block",
    isolating: true,
    attrs: {
      id: { default: '' },
    },
    parseDOM: [{
      tag: "div.doc-columns",
      getAttrs(dom) {
        return {
          id: dom.getAttribute('data-id') || '',
        };
      }
    }],
    toDOM(node) {

      return ["div", {
        class: "doc-columns",
        'data-id': node.attrs.id,
      }, 0];
    }
  },

  column: {
    content: "block+",
    group: "block",
    isolating: true,
    attrs: {
      id: { default: '' },
    },
    parseDOM: [{
      tag: "div.doc-column",
      getAttrs(dom) {

        return {
          id: dom.getAttribute('data-id') || '',
        };
      }
    }],
    toDOM(node) {
      return ["div", {
        class: 'doc-column',
        'data-id': node.attrs.id,
      }, 0];
    }
  },
};