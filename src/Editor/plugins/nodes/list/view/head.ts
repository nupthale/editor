import { Node } from 'prosemirror-model';
import { EditorView, NodeView, ViewMutationRecord } from 'prosemirror-view';

import { listStore } from '../../../../store/list';
import { getParentNodeByPos } from '../../../../shared';
import { FloatMenuTrigger } from '../../_common/floatMenuTrigger';

import { getOrderedIndex } from '../util';
import { ListTypeEnum } from '../interface';
import { BaseBlockView } from '../../_common/baseBlockView';

export class ListHeadView extends BaseBlockView {
    pseudoDOM: HTMLElement;

    listeners: Function[] = [];

    floatMenuTrigger: FloatMenuTrigger;

    constructor(public node: Node, public view: EditorView, public getPos: () => number | undefined) {
        super(node, view, getPos);

        // 创建有序列表元素
        this.dom.classList.add('doc-list-head');
        
        const wrapDOM = document.createElement('div');
        wrapDOM.classList.add('flex-1', 'flex', 'items-start');

        this.pseudoDOM = document.createElement('div');
        this.pseudoDOM.classList.add('doc-list-pseudo');
        this.pseudoDOM.contentEditable = 'false';

        const contentDOM = document.createElement('div');
        contentDOM.classList.add('doc-list-content');

        wrapDOM.appendChild(this.pseudoDOM);
        wrapDOM.appendChild(contentDOM);

        this.contentDOM = contentDOM;

        this.dom.appendChild(wrapDOM);

        this.updatePseudoDOM(node);

        this.subscribeEvts();

        this.floatMenuTrigger = new FloatMenuTrigger(this);
    }

    updatePseudoDOM(node) {

      // 获取父节点（list）的属性
      const pos = this.getPos();

      if (pos !== undefined) {
          const parentNode = getParentNodeByPos(this.view, pos + 1);  // 获取父节点（list）
          const type = parentNode.attrs.type;
          this.pseudoDOM.innerHTML = this.getPseudo(type);
      } else {
          this.pseudoDOM.innerHTML = this.getPseudo();
      }
    }

    update(node: Node) {
        if (node.type !== this.node.type) return false;
        
        if (
          node.attrs.showIndex !== this.node.attrs.showIndex ||
          node.attrs.ordered
        ) {
          this.updatePseudoDOM(node);
        }
      
        // 更新节点引用
        this.node = node;

        return true;
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

    getPseudo = (type: ListTypeEnum = ListTypeEnum.BULLET) => {
      const dot = '<div class="text-center" style="-webkit-transform: scale(1.375)">•</div>';

      if (type === ListTypeEnum.ORDERED) {
        const id = this.getListId();

        const map = listStore.getState().orderedListMap || {};
        const indexStr = getOrderedIndex(map[id]);
        
        return indexStr ? `${indexStr}.` : '?';
      }

      return dot;
    }

    subscribeEvts() {
      // 订阅 orderedListMap 变化
      const listener = listStore.subscribe((state, prevState) => {
          const pos = this.getPos();

          if (pos === undefined || state.orderedListMap === prevState.orderedListMap) return;

          const id = this.getListId();
          const newIndexes = state.orderedListMap[id];
          const prevIndexes = prevState.orderedListMap[id];

          if (
            newIndexes?.join('-') !== prevIndexes?.join('-')
          ) {
            this.updatePseudoDOM(this.node);
          }
      });

      this.listeners.push(listener);
    }

    destroy() {
      this.listeners.forEach((fn) => fn());
      this.floatMenuTrigger.destroy();
    }
}