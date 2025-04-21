import { Node } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';


import { BaseBlockView, Convertible } from '../_common/baseBlockView';
import { FloatMenuTrigger } from '../_common/floatMenuTrigger'

import './index.less';

export class HighlightView extends BaseBlockView implements Convertible {
  floatMenuTrigger: FloatMenuTrigger;

  constructor(public node: Node, public view: EditorView, public getPos: () => number | undefined) {
    super(node, view, getPos);

    // 创建容器元素
    this.dom.classList.add('doc-highlight');

    // 创建
    const container = document.createElement('div');
    container.classList.add('flex', 'items-stretch');

    const icon = document.createElement('div');
    icon.classList.add('mr-3', 'pt-1');
    icon.contentEditable = 'false';
    icon.innerText = '🎵';

    const content = document.createElement('div');
    content.classList.add('flex-1');
    container.appendChild(icon);
    container.appendChild(content);

    this.contentDOM = content;
    // 组装DOM结构
    this.dom.appendChild(container);

    this.floatMenuTrigger = new FloatMenuTrigger(this);
  }

  destroy() {
    super.destroy();

    this.floatMenuTrigger.destroy();
  }

  convertTo(targetType: string, attrs?: Record<string, any>) {
    console.info(targetType, attrs);
  }
}

