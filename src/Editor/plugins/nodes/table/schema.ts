import { NodeSpec } from 'prosemirror-model';

export const tableSchema: Record<string, NodeSpec> = {
  table: {
    content: "table_row+",
    group: "block",
    isolating: true,
    attrs: {
      id: { default: '' },
    },
    parseDOM: [{
      tag: "table",
      getAttrs(dom) {
        return {
          id: dom.getAttribute('data-id') || ''
        };
      }
    }],
    toDOM(node) {
      return ["table", {
        class: "doc-table",
        'data-id': node.attrs.id,
      }, ["tbody", 0]];
    }
  },

  table_row: {
    content: "table_cell+",
    group: "block",
    parseDOM: [{
      tag: "tr"
    }],
    toDOM() {
      return ["tr", 0];
    }
  },

  table_cell: {
    content: "block+",
    attrs: {
      colspan: { default: 1 },
      rowspan: { default: 1 },
      colwidth: { default: null },
    },
    isolating: true,
    parseDOM: [{
      tag: "td",
      getAttrs(dom) {
        return {
          colspan: dom.getAttribute("colSpan") || 1,
          rowspan: dom.getAttribute("rowSpan") || 1,
          colwidth: dom.getAttribute("colWidth") || null
        };
      }
    }],
    toDOM(node) {
      const attrs: any = {
        class: "doc-table-cell"
      };
      
      if (node.attrs.colSpan > 1) attrs.colspan = node.attrs.colSpan;
      if (node.attrs.rowSpan > 1) attrs.rowspan = node.attrs.rowSpan;
      if (node.attrs.colWidth) attrs.colWidth = node.attrs.colWidth;
      
      return ["td", attrs, 0];
    }
  }
};