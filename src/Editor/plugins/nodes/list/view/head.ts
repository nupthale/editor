import { Node } from 'prosemirror-model';
import { EditorView, NodeView, ViewMutationRecord } from 'prosemirror-view';

import { contextStore } from '../../../../context';
import { getParentNodeByPos } from '../../../../shared';

export class ListHeadView implements NodeView {
    dom: HTMLElement;
    contentDOM: HTMLElement | null = null;
    indexDOM: HTMLElement;

    listeners: Function[] = [];

    constructor(public node: Node, public view: EditorView, public getPos: () => number | undefined) {
        // 创建有序列表元素
        this.dom = document.createElement('div');
        this.dom.classList.add('doc-list-head');
        
        const wrapDOM = document.createElement('div');
        wrapDOM.classList.add('flex-1', 'flex', 'items-start');

        this.indexDOM = document.createElement('div');
        this.indexDOM.classList.add('doc-list-index');
        this.indexDOM.contentEditable = 'false';

        const contentDOM = document.createElement('div');
        contentDOM.classList.add('doc-list-content');

        wrapDOM.appendChild(this.indexDOM);
        wrapDOM.appendChild(contentDOM);

        this.contentDOM = contentDOM;

        this.dom.appendChild(wrapDOM);

        this.updateIndexDOM(node);

        this.subscribeEvts();
    }

    updateIndexDOM(node) {
      if (node.attrs.showIndex) {
        this.indexDOM.style.display = 'block';
      } else {
        this.indexDOM.style.display = 'none';
      }

      // 获取父节点（list）的属性
      const pos = this.getPos();
      if (pos !== undefined) {
          const parentNode = getParentNodeByPos(this.view, pos + 1);  // 获取父节点（list）
          const ordered = parentNode.attrs.ordered;
          this.indexDOM.innerHTML = ordered ? this.getIndex() : '<div class="text-center" style="-webkit-transform: scale(1.375)">•</div>';
      } else {
          this.indexDOM.innerHTML = this.getIndex();
      }
    }

    update(node: Node) {
        if (node.type !== this.node.type) return false;
        
        if (
          node.attrs.showIndex !== this.node.attrs.showIndex ||
          node.attrs.ordered
        ) {
          this.updateIndexDOM(node);
        }
      
        // 更新节点引用
        this.node = node;

        return true;
    }

    ignoreMutation(record: ViewMutationRecord): boolean {
        const noneEditables = this.dom.querySelectorAll('[contentEditable=false]');
    
        if (noneEditables?.length) {
          for (let i = 0; i < noneEditables.length; i++) {
            if (noneEditables[i].contains(record.target) || record.target === noneEditables[i]) {
              return true;
            }
          }
        }
        
        return false;
    }

    selectNode() {
      // 返回 false 表示不要应用选中样式
      return false;
    }

    getListId = () => {
      const pos = this.getPos();
      if (pos === undefined) return;
      const parentNode = getParentNodeByPos(this.view, pos + 1);  // 获取父节点（list）
      return parentNode.attrs.id;
    }

    getIndex = () => {
      const id = this.getListId();

      const map = contextStore.getState().orderedListMap || {};
    
      return map[id]?.join('.') || '';
    }

    subscribeEvts() {
      // 订阅 orderedListMap 变化
      const listener = contextStore.subscribe((state, prevState) => {
          const pos = this.getPos();

          if (pos === undefined || state.orderedListMap === prevState.orderedListMap) return;

          const id = this.getListId();
          const newIndexes = state.orderedListMap[id];
          const prevIndexes = prevState.orderedListMap[id];

          if (
            newIndexes?.join('-') !== prevIndexes?.join('-')
          ) {
            this.updateIndexDOM(this.node);
          }
      });

      this.listeners.push(listener);
    }

    destroy() {
      this.listeners.forEach((fn) => fn());
    }
}