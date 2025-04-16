import { Node } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';

import { BaseBlockView, Convertible } from '../../_common/baseBlockView';

import '../index.less';

export class TextBlockView extends BaseBlockView implements Convertible {
  constructor(public node: Node, public view: EditorView, public getPos: () => number | undefined) {
    super(node, view, getPos);

    // 创建容器元素
    this.dom.classList.add('doc-textBlock');

    // 设置contentDOM为标题元素
    this.contentDOM = this.dom;
  }

  convertTo(targetType: string, attrs?: Record<string, any>) {
    console.info(targetType, attrs);
  }
}

