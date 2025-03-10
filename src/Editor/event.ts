import { Subject } from 'rxjs';
import { BaseBlockView } from './plugins/nodes/_common/baseBlockView';

export const blockMouseEnter$ = new Subject<{
  nodeView: BaseBlockView,
  offsetY?: number,
}>();

export const blockMouseLeave$ = new Subject<{
  delay?: number,
}>();