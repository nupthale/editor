import { Node } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import { TextQuote } from 'lucide';

import { BaseBlockView } from '../_common/baseBlockView';

import './index.less';

export class HighlightView extends BaseBlockView implements NodeView {
  contentDOM: HTMLElement;

  get icon() {
    return TextQuote;
  }

  constructor(public node: Node, public view: EditorView, public getPos: () => number | undefined) {
    super(node, view, getPos);

    // 创建容器元素
    this.dom.classList.add('doc-highlight');

    // 创建
    const container = document.createElement('div');
    container.classList.add('flex', 'items-start');

    const icon = document.createElement('div');
    icon.classList.add('mr-3');
    icon.contentEditable = 'false';
    icon.innerText = '🎵';

    const content = document.createElement('div');
    content.classList.add('flex-1');
    container.appendChild(icon);
    container.appendChild(content);

    this.contentDOM = content;
    // 组装DOM结构
    this.dom.appendChild(container);

    this.initFloatMenuEvt();
  }
}

