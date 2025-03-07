import { Node } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';

import { BaseBlockView } from '../_common/baseBlockView';
import { blockMouseEnter$ } from '../../../event';

import './index.less';

export class HeadingView extends BaseBlockView implements NodeView {
  contentDOM: HTMLElement;

  level: number = 1;

  constructor(node: Node, view: EditorView) {
    super(node, view);

    this.level = node.attrs.level;

    // 创建容器元素
    this.dom.classList.add('doc-heading');
    this.dom.classList.add(`level${this.level}`);

    // 创建标题元素
    const headingElement = document.createElement(`h${this.level}`);

    // 设置contentDOM为标题元素
    this.contentDOM = headingElement;

    // 组装DOM结构
    this.dom.appendChild(headingElement);

    this.initEvt();
  }

  mouseEnter = () => {
    const map = {
      1: 5,
      2: 2,
      3: 0,
    }

   
    blockMouseEnter$.next({
      view: this,
      offsetY: map[this.level] || -1,
    });
  }
}

