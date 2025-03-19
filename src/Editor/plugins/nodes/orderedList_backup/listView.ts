import { Node } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import { orderListNumberCache } from './cache';

export class OrderedListView implements NodeView {
  dom: HTMLElement;
  contentDOM: HTMLElement;
  node: Node;
  view: EditorView;
  getPos: () => number | undefined;

  constructor(node: Node, view: EditorView, getPos: () => number | undefined) {
    this.node = node;
    this.view = view;
    this.getPos = getPos;

    // 创建有序列表元素
    this.dom = document.createElement('ol');
    
    // 设置列表属性
    if (node.attrs.start && node.attrs.start !== 1) {
      this.dom.setAttribute('start', node.attrs.start);
    }
    
    if (node.attrs.level) {
      this.dom.setAttribute('data-level', node.attrs.level);
    }
    
    // 设置列表ID
    if (node.attrs.id) {
      this.dom.setAttribute('data-id', node.attrs.id);
    }
    
    // 内容容器就是列表本身
    this.contentDOM = this.dom;
    
    // 标记缓存需要更新
    orderListNumberCache.markDirty();
  }

  update(node: Node) {
    if (node.type !== this.node.type) return false;
    
    // 更新节点引用
    this.node = node;
    
    // 更新列表属性
    if (node.attrs.start && node.attrs.start !== 1) {
      this.dom.setAttribute('start', node.attrs.start);
    } else {
      this.dom.removeAttribute('start');
    }
    
    if (node.attrs.level) {
      this.dom.setAttribute('data-level', node.attrs.level);
    } else {
      this.dom.removeAttribute('data-level');
    }
    
    // 标记缓存需要更新
    orderListNumberCache.markDirty();
    
    return true;
  }
  
  // 忽略属性变化的突变
  ignoreMutation(mutation) {
    // 忽略属性变化
    if (mutation.type === 'attributes' && mutation.target === this.dom) {
      return true;
    }
    return false;
  }
  
  // 销毁时的清理
  destroy() {
    // 如果需要清理资源，可以在这里进行
  }
}