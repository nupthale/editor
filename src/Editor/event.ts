import { Subject } from 'rxjs';
import { BaseBlockView } from './plugins/nodes/_common/baseBlockView';

export const blockMouseEnter$ = new Subject<{
  nodeView: BaseBlockView,
  offsetY?: number,
}>();

export const blockMouseLeave$ = new Subject<{
  delay?: number,
}>();

// 文档内容变化
export const docChanged$ = new Subject<void>();