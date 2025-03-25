import { Node } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';

import { BaseBlockView } from '../../_common/baseBlockView';

import '../index.less';

export class TableView extends BaseBlockView implements NodeView {
  constructor(public node: Node, public view: EditorView, public getPos: () => number | undefined) {
    super(node, view, getPos);

    this.dom.classList.add('doc-table');
    const table = document.createElement('table');
    table.setAttribute('data-id', node.attrs.id);
    
    const body = document.createElement('tbody');
    table.appendChild(body); // 将 tbody 追加到 table 中
    this.contentDOM = body; // 将 contentDOM 指向 tbody

    this.dom.appendChild(table);
    
    this.initEvt();
  }

  update(node: Node) {
    if (node.type !== this.node.type) return false;
    
    // 更新节点引用
    this.node = node;
    
    return true;
  }
}