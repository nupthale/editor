import { Subject } from 'rxjs';

import { BaseBlockView } from './plugins/nodes/_common/baseBlockView';

import { PopoverTypeEnum } from './interface';

// doc scroll
export const docScroll$ = new Subject<{ e: Event }>();

// floating menu
export const blockMouseEnter$ = new Subject<{
  nodeView: BaseBlockView,
  offsetY?: number,
}>();

export const blockMouseLeave$ = new Subject<{
  delay?: number,
}>();

export const showPopover$ = new Subject<{
  range: [number, number],
  type: PopoverTypeEnum,
}>();

export const hidePopover$ = new Subject<{
  type: PopoverTypeEnum,
}>();

// 文档内容变化
export const docChanged$ = new Subject<void>();