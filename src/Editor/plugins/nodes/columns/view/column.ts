import { Node } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';

import { BaseBlockView } from '../../_common/baseBlockView';

export class ColumnView extends BaseBlockView {
  
  constructor(public node: Node, public view: EditorView, public getPos: () => number | undefined) {
    super(node, view, getPos);

    this.dom.classList.add('doc-column');

    this.contentDOM = document.createElement('div');

    this.dom.appendChild(this.contentDOM);
  }

  destroy() {
    super.destroy();
  }
}