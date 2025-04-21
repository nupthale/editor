import { Node } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';
import { filter, tap } from 'rxjs';

import { BaseBlockView, Convertible } from '../../_common/baseBlockView';
import { FloatMenuTrigger } from '../../_common/floatMenuTrigger';

import { focusColumns$ } from '../event';
import '../index.less';

export class ColumnsView extends BaseBlockView implements Convertible {
  floatMenuTrigger: FloatMenuTrigger;
  
  constructor(public node: Node, public view: EditorView, public getPos: () => number | undefined) {
    super(node, view, getPos);

    this.dom.classList.add('doc-columns');

    this.contentDOM = document.createElement('div');
    this.contentDOM.classList.add('doc-columns-content');

    this.dom.appendChild(this.contentDOM);
    
    this.floatMenuTrigger = new FloatMenuTrigger(this);

    this.subscribe();
  }

  subscribe = () => {
    super.subscribe();

    this.subscribers.push(
      focusColumns$.pipe(
        tap(({ id }) => {
          this.dom.classList.remove('focused');

          if (this.id === id) {
            this.dom.classList.add('focused');
          }
        }),
      ).subscribe(),
    );
  }

  destroy() {
    super.destroy();

    this.floatMenuTrigger.destroy();
  }

  convertTo(targetType: string, attrs?: Record<string, any>) {
     console.info('convertTo', targetType, attrs);
  }
}