import { NodeSpec } from 'prosemirror-model';

export const tableSchema: Record<string, NodeSpec> = {
  table: {
    content: "table_row+",
    group: "block",
    isolating: true,
    attrs: {
      id: { default: '' },
      colWidth: { default: [] },
    },
    parseDOM: [{
      tag: "table",
      getAttrs(dom) {
        // query table下的colgroup， 解析拿到所有的宽度
        const cols = (dom as HTMLElement).querySelector('colgroup')?.children;
        const colWidth = [...(cols || [])].map(col => col.getAttribute('width'));

        return {
          id: dom.getAttribute('data-id') || '',
          colWidth,
        };
      }
    }],
    toDOM(node) {
      const colgroup = ["colgroup", node.attrs.colWidth?.map(width => 
        ["col", { width }]
      )];

      return ["table", {
        class: "doc-table",
        'data-id': node.attrs.id,
      }, 
      colgroup,
      ["tbody", 0]];
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
    },
    isolating: true,
    parseDOM: [{
      tag: "td",
      getAttrs(dom) {
        return {
          colspan: dom.getAttribute("colSpan") || 1,
          rowspan: dom.getAttribute("rowSpan") || 1,
        };
      }
    }],
    toDOM(node) {
      const attrs: any = {
        class: "doc-table-cell"
      };
      
      if (node.attrs.colSpan > 1) attrs.colspan = node.attrs.colSpan;
      if (node.attrs.rowSpan > 1) attrs.rowspan = node.attrs.rowSpan;
      
      return ["td", attrs, 0];
    }
  }
};