import { Node } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import { Type } from 'lucide';

import '../index.less';

export class TextBlockView implements NodeView {
  dom: HTMLElement;
  contentDOM: HTMLElement | null = null;

  get icon() {
    return Type;
  }

  constructor(public node: Node, public view: EditorView, public getPos: () => number | undefined) {
    this.dom = document.createElement('div');

    // 创建容器元素
    this.dom.classList.add('doc-textBlock');

    // 设置contentDOM为标题元素
    this.contentDOM = this.dom;
  }
}

