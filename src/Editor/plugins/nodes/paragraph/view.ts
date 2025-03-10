import { Node } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import { Type } from 'lucide';

import { BaseBlockView } from '../_common/baseBlockView';

import './index.less';

export class ParagraphView extends BaseBlockView implements NodeView {
  contentDOM: HTMLElement;

  get icon() {
    return Type;
  }

  constructor(public node: Node, public view: EditorView, public getPos: () => number | undefined) {
    super(node, view, getPos);

    // 创建容器元素
    this.dom.classList.add('doc-paragraph');

    // 创建标题元素
    const paragraphElement = document.createElement('p');

    // 设置contentDOM为标题元素
    this.contentDOM = paragraphElement;

    // 组装DOM结构
    this.dom.appendChild(paragraphElement);

    this.initEvt();
  }
}

