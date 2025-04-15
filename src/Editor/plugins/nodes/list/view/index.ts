import { Node } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';

import '../index.less';

export class ListView implements NodeView {
  dom: HTMLElement;
  contentDOM: HTMLElement | null = null;
  id: string;
  
  constructor(public node: Node, public view: EditorView, public getPos: () => number | undefined) {
    this.dom = document.createElement('div');
    this.dom.classList.add('doc-list');
    this.dom.classList.add(`doc-list-${node.attrs.type}`)

    this.dom.setAttribute('data-id', this.node.attrs.id);

    this.id = node.attrs.id || '';
    this.contentDOM = this.dom;
  }

  update(node: Node) {
    if (node.type !== this.node.type) return false;
    
    // 更新节点引用
    this.node = node;
    
    return true;
  }

  selectNode() {
    // 返回 false 表示不要应用选中样式
    return false;
  }
}