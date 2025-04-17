import { nanoid } from 'nanoid';
import { Node } from 'prosemirror-model';
import { EditorView, NodeView, ViewMutationRecord } from 'prosemirror-view';

import './index.less';
import { getParentNode } from '../../../shared';

export interface Convertible {
  convertTo(targetType: string, attrs?: Record<string, any>): any;
}

export class BaseBlockView implements NodeView {
  dom: HTMLElement;
  contentDOM: HTMLElement | null = null;

  id: string = '';

  get range() {
    const from = this.getPos() || 0;

    return {
      from,
      to: from + this.node.nodeSize,
    };
  }

  get isEmpty() {
    if (this.node.type.spec?.isolating) {
      return false;
    }

    return this.node.content.size === 0;
  }

  get depth() {
    const pos = this.getPos();
    if (pos === undefined) return false;
    
    const $pos = this.view.state.doc.resolve(pos);
    return $pos.depth;  // doc -> body -> block (depth = 2)
  }

  get parentNode() {
    const pos = this.getPos();
    if (pos === undefined) return null;
    
    const $pos = this.view.state.doc.resolve(pos);

    return $pos.node();
  }

  constructor(public node: Node, public view: EditorView, public getPos: () => number | undefined, tag: string = 'div') {
    this.dom = document.createElement(tag);
    this.dom.classList.add('doc-block');

    if (node.attrs.id) {
      this.id = node.attrs.id || nanoid(8);
      this.dom.setAttribute('data-id', this.node.attrs.id);
    }
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
}

