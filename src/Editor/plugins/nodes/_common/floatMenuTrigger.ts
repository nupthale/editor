import { NodeView } from 'prosemirror-view';

import { blockMouseEnter$, blockMouseLeave$ } from '../../../event';

export class FloatMenuTrigger {
  constructor(
    public nodeView: NodeView,
    public getMouseEnterProps?: () => Record<string, any>,
  ) {
    this.initFloatMenuEvt();
  }

  mouseEnter = () => {
    blockMouseEnter$.next({
      nodeView: this.nodeView,
      ...this.getMouseEnterProps?.()
    });
  }

  mouseLeave = () => {
    blockMouseLeave$.next({});
  }

  initFloatMenuEvt() {
    if (!this.nodeView?.dom) return;

    this.nodeView.dom.addEventListener('mouseenter', this.mouseEnter);

    this.nodeView.dom.addEventListener('mouseleave', this.mouseLeave);
  }

  destroy() {
    if (!this.nodeView?.dom) return;

    this.nodeView.dom.removeEventListener('mouseenter', this.mouseEnter);
    this.nodeView.dom.removeEventListener('mouseleave', this.mouseLeave);
  }
}

