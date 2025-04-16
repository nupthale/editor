import { Node } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';

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

        this.initPseudoEvts();

        this.floatMenuTrigger = new FloatMenuTrigger(this);
    }

    updatePseudoDOM(node) {

      // 获取父节点（list）的属性
      const pos = this.getPos();

      if (pos !== undefined) {
          const type = this.node.attrs.type;
          this.pseudoDOM.innerHTML = this.getPseudo(node, type);
      } else {
          this.pseudoDOM.innerHTML = this.getPseudo(node);
      }
    }

    update(node: Node) {
        if (node.type !== this.node.type) return false;
        
        if (
          node.attrs.id !== this.node.attrs.id ||
          node.attrs.type !== this.node.attrs.type ||
          node.attrs.checked !== this.node.attrs.checked || 
          node.attrs.opened !== this.node.attrs.opened
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

    getPseudo = (node: Node, type: ListTypeEnum = ListTypeEnum.BULLET) => {
      const dot = '<div class="text-center" style="-webkit-transform: scale(1.375)">•</div>';

      if (type === ListTypeEnum.ORDERED) {
        const id = this.getListId();

        const map = listStore.getState().orderedListMap || {};
        const indexStr = getOrderedIndex(map[id]);
        
        return indexStr ? `${indexStr}.` : '?';
      }

      if (type === ListTypeEnum.TODO) {
        if (node.attrs.checked) {
          return `<div class="doc-list-checkbox">
            <svg width="12" height="12" fill="none"><path d="M9.589 2.903l.808.809a.35.35 0 010 .495L5.18 9.425a.35.35 0 01-.495 0l-2.981-2.98a.35.35 0 010-.496l.808-.808a.35.35 0 01.495 0l1.925 1.925 4.163-4.163a.35.35 0 01.495 0z" fill="currentColor"></path></svg>
          </div>`;
        }

        return '<div class="doc-list-checkbox"></div>';
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

    toggleCheck = () => {
      const pos = this.getPos();
      if (pos === undefined) return;
      const tr = this.view.state.tr;
      
      tr.setNodeAttribute(pos, 'checked', !this.node.attrs.checked);

      this.view.dispatch(tr);
    }

    pseudoClickHandler = (e) => {
      this.preventSelection(e);

      if (this.node?.attrs?.type === ListTypeEnum.TODO) {
        this.toggleCheck();
      }
    }
    
    preventSelection = (e) => {
      e.stopPropagation();
      e.preventDefault();
    }
    
    initPseudoEvts = () => {
      this.pseudoDOM.addEventListener('click', this.pseudoClickHandler);
      // 防止点击checkbox， 造成选中文本
      this.pseudoDOM.addEventListener('mousedown', this.preventSelection);
      this.pseudoDOM.addEventListener('mouseup', this.preventSelection);
      this.pseudoDOM.addEventListener('dblclick', this.preventSelection);
    }

    destroy() {
      this.listeners.forEach((fn) => fn());
      this.floatMenuTrigger.destroy();

      this.pseudoDOM.removeEventListener('click', this.pseudoClickHandler);
      this.pseudoDOM.removeEventListener('mousedown', this.preventSelection);
      this.pseudoDOM.removeEventListener('mouseup', this.preventSelection);
      this.pseudoDOM.removeEventListener('dblclick', this.preventSelection);
    }
}