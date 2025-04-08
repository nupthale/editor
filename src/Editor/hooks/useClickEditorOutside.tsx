import { onClickOutside } from '@vueuse/core';

import { hidePopover$ } from '../event';
import { PopoverTypeEnum } from '../interface';

export const useClickEditorOutside = (target) => {
    onClickOutside(target, event => {
        // 如果event.target是.menuItems的子孙元素，那么不执行任何操作
        if (
            (event.target as HTMLElement).closest('.menuItems') ||
            (event.target as HTMLElement).closest('.ant-popover')
        ) {
            return;
        }

        hidePopover$.next({
            type: PopoverTypeEnum.BUBBLE_MENU,
        });
    });
}