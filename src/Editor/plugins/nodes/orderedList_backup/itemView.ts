import { Node } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import { orderListNumberCache } from './cache';

export class ItemView implements NodeView {
  dom: HTMLElement;
  contentDOM: HTMLElement;
  numberSpan: HTMLElement;
  node: Node;
  view: EditorView;
  getPos: () => number | undefined;

  constructor(node: Node, view: EditorView, getPos: () => number | undefined) {
    this.node = node;
    this.view = view;
    this.getPos = getPos;

    // 创建列表项元素
    this.dom = document.createElement('li');
    
    // 创建序号显示元素
    this.numberSpan = document.createElement('span');
    this.numberSpan.className = 'list-number';
    this.dom.appendChild(this.numberSpan);
    
    // 创建内容容器
    this.contentDOM = document.createElement('div');
    this.contentDOM.className = 'list-item-content';
    this.dom.appendChild(this.contentDOM);
    
    // 更新序号显示
    this.updateNumberDisplay();
  }

  update(node: Node) {
    if (node.type !== this.node.type) return false;
    this.node = node;
    
    // 只更新显示，不重新计算
    this.updateNumberDisplay();
    return true;
  }

  updateNumberDisplay() {
    const id = this.node.attrs.id;
    if (!id) return;
    
    // 从缓存获取序号
    const number = orderListNumberCache.getNumber(id);
    if (number) {
      this.numberSpan.textContent = `${number}. `;
    }
  }
}