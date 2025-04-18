import { NodeSpec } from 'prosemirror-model';

/**
 * Notion的有序列表（ordered list）有以下主要规则：
 * - 主列表从1开始自动编号
 * - 支持多级列表嵌套：
 * - 每一个子级都会根据父级序号自动生成，如1.1, 1.2等
 * - 可以有多层嵌套，比如1.1.1, 1.1.2等
 * - 列表重置规则：
 *  - 当有空行（空的text block）分隔时，新的列表会重新从1开始计数
 *  - 不同层级的列表之间互不影响序号计数
 * - 自动维护：
 *  - 在列表中间插入新项时会自动重新排序
 *  - 删除列表项时也会自动调整后续序号
 * 
 * List类型一共4种：
 * - bullet list
 * - order list
 * - todo list
 * - toggleList
 */
export const listSchema: Record<string, NodeSpec> = {
  list_head: {
    content: "inline*",
    group: "block",
    attrs: {
      id: { default: '' },
      type: { default: 'bullet' },
      checked: { default: false },
      opened: { default: true },
    },
    parseDOM: [{
      tag: "div",
      attrs: {
        class: "doc-list-head",
      },
      getAttrs(dom: any) {
        return {
          id: dom.getAttribute('data-id'),
          type: dom.getAttribute('data-type'),
          checked: dom.getAttribute('data-checked') === 'true',
          opened: dom.getAttribute('data-opened') === 'true',
        };
      }
    }],
    toDOM(node) {
      return ["div", {
        class: "doc-list-head",
        'data-id': node.attrs.id,
        'data-type': node.attrs.type,
        'data-checked': node.attrs.checked,
        'data-opened': node.attrs.opened,
      }, 0];
    }
  },
  list_body: {
    content: "block*",
    group: "block",
    attrs: {
      id: { default: '' },
      opened: { default: true },
    },
    parseDOM: [{
      tag: "div",
      attrs: {
        class: "doc-list-body",
      },
      getAttrs(dom: any) {
        return {
          id: dom.getAttribute('data-id'),
          opened: dom.getAttribute('data-opened') === 'true',
        };
      }
    }],
    toDOM(node) {
      return ["div", {
        class: "doc-list-body",
        'data-id': node.attrs.id,
        'data-opened': node.attrs.opened,
      }, 0];
    }
  },
  list: {
    content: "list_head list_body?",
    group: "block",
    attrs: {
      id: { default: '' },
    },
    parseDOM: [{
      tag: "div.doc-list",
      priority: 52,  // 提高优先级
      getAttrs(dom: any) {
        return {
          id: dom.getAttribute('data-id'),
        };
      }
    }],
    toDOM(node) {
      return ["div", {
        class: "doc-list",
        'data-id': node.attrs.id,
      }, 0];
    }
  },
};