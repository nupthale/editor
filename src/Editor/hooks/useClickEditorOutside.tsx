import { onClickOutside } from '@vueuse/core';

import { hidePopover$ } from '../event';
import { PopoverTypeEnum } from '../interface';

export const useClickEditorOutside = (target) => {
    onClickOutside(target, event => {
        hidePopover$.next({
            type: PopoverTypeEnum.BUBBLE_MENU,
        });
    });
}