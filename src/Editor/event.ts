import { Subject } from 'rxjs';
import { NodeView } from 'prosemirror-view';

export const blockMouseEnter$ = new Subject<{
  view: NodeView,
}>();

export const blockMouseLeave$ = new Subject();