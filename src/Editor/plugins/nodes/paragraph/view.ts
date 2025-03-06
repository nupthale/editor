import { Node } from 'prosemirror-model';
import { EditorView, NodeView, ViewMutationRecord } from 'prosemirror-view';

import { blockMouseEnter$, blockMouseLeave$ } from '../../../event';

import './index.less';

export class ParagraphView implements NodeView {
  dom: HTMLElement;
  contentDOM: HTMLElement;
  node: Node;
  view: EditorView;
  app: any;

  constructor(node: Node, view: EditorView) {
    this.node = node;
    this.view = view;

    // 创建容器元素
    this.dom = document.createElement('div');
    this.dom.className = 'doc-paragraph-container';

    // 创建标题元素
    const paragraphElement = document.createElement('p');
    paragraphElement.className = 'doc-paragraph doc-block';

    // 设置contentDOM为标题元素
    this.contentDOM = paragraphElement;

    // 组装DOM结构
    this.dom.appendChild(paragraphElement);

    this.initEvt();
  }

  mouseEnter = () => {
    blockMouseEnter$.next({
      view: this,
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
    this.node = node;
    return true;
  }

  ignoreMutation(record: ViewMutationRecord): boolean {
    // 忽略metaContainer及其子元素的修改
    const metaContainer = this.dom.querySelectorAll('[contentEditable=false]');

    if (metaContainer?.length) {
      for (let i = 0; i < metaContainer.length; i++) {
        if (metaContainer[i].contains(record.target) || record.target === metaContainer[i]) {
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

