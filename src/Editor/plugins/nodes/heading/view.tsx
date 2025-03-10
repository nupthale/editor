import { Node } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import { Heading1, Heading2, Heading3, Heading4, Heading5, Heading6 } from 'lucide';

import { BaseBlockView } from '../_common/baseBlockView';
import { blockMouseEnter$ } from '../../../event';
import './index.less';

export class HeadingView extends BaseBlockView implements NodeView {
  contentDOM: HTMLElement;

  level: number = 1;

  get icon() {
    switch (this.level) {
      case 1:
        return Heading1;
      case 2:
        return Heading2;  
      case 3:
        return Heading3;
      case 4:
        return Heading4;
      case 5:
        return Heading5;
      case 6:
        return Heading6;
      default:
        return Heading1;  
    }
  }

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

