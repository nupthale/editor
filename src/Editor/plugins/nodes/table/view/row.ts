import { Node } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';

import { BaseBlockView } from '../../_common/baseBlockView';
import '../index.less';


export class TableRowView extends BaseBlockView {
  constructor(public node: Node, public view: EditorView, public getPos: () => number | undefined) {
    super(node, view, getPos, 'tr');

    this.dom.classList.add('doc-table-row');
    
    this.contentDOM = this.dom;
  }
}