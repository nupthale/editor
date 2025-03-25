import { Node } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';

import '../index.less';

export class TableCellView implements NodeView {
  dom: HTMLElement = document.createElement('td');
  contentDOM: HTMLElement | null = null;

  constructor(public node: Node, public view: EditorView, public getPos: () => number | undefined) {
    this.dom.classList.add('doc-table-cell');
    
    this.contentDOM = this.dom;
  }

  update(node: Node) {
    if (node.type !== this.node.type) return false;
    
    // 更新节点引用
    this.node = node;
    
    return true;
  }
}