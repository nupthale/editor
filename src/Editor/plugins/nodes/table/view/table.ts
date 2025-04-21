import { Node } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';

import { BaseBlockView, Convertible } from '../../_common/baseBlockView';
import { FloatMenuTrigger } from '../../_common/floatMenuTrigger';

import '../index.less';

export class TableView extends BaseBlockView implements Convertible {
  colgroup: HTMLElement;

  floatMenuTrigger: FloatMenuTrigger;
  
  constructor(public node: Node, public view: EditorView, public getPos: () => number | undefined) {
    super(node, view, getPos);

    this.dom.classList.add('doc-table');
    const container = document.createElement('div');
    container.classList.add('doc-table-scroll');

    const table = document.createElement('table');
    table.setAttribute('data-id', node.attrs.id);

    this.colgroup = document.createElement('colgroup');
    node.attrs.colWidth?.forEach((width: string) => {
      const col = document.createElement('col');
      col.setAttribute('width', width || '100');
      this.colgroup.appendChild(col);
    });

    const body = document.createElement('tbody');
    table.appendChild(this.colgroup);
    table.appendChild(body); // 将 tbody 追加到 table 中
    this.contentDOM = body; // 将 contentDOM 指向 tbody
    container.appendChild(table); // 将 table 追加到 container 中

    this.dom.appendChild(container);
    
    this.floatMenuTrigger = new FloatMenuTrigger(this);
  }

  destroy() {
    super.destroy();

    this.floatMenuTrigger.destroy();
  }

  convertTo(targetType: string, attrs?: Record<string, any>) {
     console.info('convertTo', targetType, attrs);
  }
}