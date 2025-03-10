import { Node } from 'prosemirror-model';
import { EditorView, NodeView, ViewMutationRecord } from 'prosemirror-view';
import { Type } from 'lucide';

import { blockMouseEnter$, blockMouseLeave$ } from '../../../event';

import './index.less';

export class BaseBlockView implements NodeView {
  dom: HTMLElement;
  contentDOM: HTMLElement | null = null;

  get icon() {
    return Type;
  }

  get range() {
    const from = this.getPos() || 0;

    return {
      from,
      to: from + this.node.nodeSize,
    };
  }

  constructor(public node: Node, public view: EditorView, public getPos: () => number | undefined) {
    this.dom = document.createElement('div');
    this.dom.classList.add('doc-block');
  }

  mouseEnter = () => {
    blockMouseEnter$.next({
      nodeView: this,
    });
  }

  mouseLeave = () => {
    blockMouseLeave$.next({});
  }

  initEvt() {
    this.dom.addEventListener('mouseenter', this.mouseEnter);

    this.dom.addEventListener('mouseleave', this.mouseLeave);
  }

  update(node: Node) {
    if (node.type !== this.node.type) return false;

    this.node = node; // 更新节点
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

  destroy() {
    this.dom.removeEventListener('mouseenter', this.mouseEnter);
    this.dom.removeEventListener('mouseleave', this.mouseLeave);
  }
}

