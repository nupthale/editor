import { Node } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';

import { BaseBlockView } from '../../_common/baseBlockView';
import { contextStore } from '../../../../context';

import '../index.less';

export class ListView extends BaseBlockView implements NodeView {
  constructor(public node: Node, public view: EditorView, public getPos: () => number | undefined) {
    super(node, view, getPos);

    this.dom.classList.add('doc-list');

    this.contentDOM = this.dom;

    contextStore.getState()?.addOrderedListMap(node.attrs.id, this);

    this.initEvt();
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