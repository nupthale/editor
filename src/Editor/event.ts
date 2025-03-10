import { Subject } from 'rxjs';
import { EditorView } from 'prosemirror-view';
import { BaseBlockView } from './plugins/nodes/_common/baseBlockView';

export const blockMouseEnter$ = new Subject<{
  view: EditorView,
  nodeView: BaseBlockView,
  offsetY?: number,
}>();

export const blockMouseLeave$ = new Subject();