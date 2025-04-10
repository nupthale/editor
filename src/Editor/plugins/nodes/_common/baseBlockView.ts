import { Node } from 'prosemirror-model';
import { EditorView, NodeView, ViewMutationRecord } from 'prosemirror-view';
import { Type } from 'lucide';

import { blockMouseEnter$, blockMouseLeave$ } from '../../../event';

import './index.less';

export class BaseBlockView implements NodeView {
  dom: HTMLElement;
  contentDOM: HTMLElement | null = null;

  id: string = '';

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

  get isEmpty() {
    return this.node.content.size === 0;
  }

  get depth() {
    const pos = this.getPos();
    if (pos === undefined) return false;
    
    const $pos = this.view.state.doc.resolve(pos);
    return $pos.depth;  // doc -> body -> block (depth = 2)
  }

  constructor(public node: Node, public view: EditorView, public getPos: () => number | undefined) {
    this.id = node.attrs.id || '';

    this.dom = document.createElement('div');
    this.dom.classList.add('doc-block');

    this.dom.setAttribute('data-id', this.node.attrs.id);
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
    // 仅限第一级的block，绑定事件
    // if (this.depth !== 1) {
    //   return;
    // };
  
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

