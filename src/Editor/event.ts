import { Subject } from 'rxjs';
import { Selection } from 'prosemirror-state';

import { BaseBlockView } from './plugins/nodes/_common/baseBlockView';

import { PopoverTypeEnum } from './interface';

// doc scroll
export const docScroll$ = new Subject<void>();

// floating menu
export const blockMouseEnter$ = new Subject<{
  nodeView: BaseBlockView,
  offsetY?: number,
}>();

export const blockMouseLeave$ = new Subject<{
  delay?: number,
}>();

// bubble menu
export const showBubbleMenu$ = new Subject<{
  x: number,
  y: number,
  selection: Selection, 
}>();

export const showPopover$ = new Subject<{
  from: number,
  type: PopoverTypeEnum,
}>();

export const hidePopover$ = new Subject<void>();

export const hideBubbleMenu$ = new Subject<void>();

// 文档内容变化
export const docChanged$ = new Subject<void>();