import { useEventListener } from '@vueuse/core';

import { blockMouseLeave$ } from '../event';

// .doc-body
export const useMouseLeaveDocBody = () => {

  const handleMouseMove = (event) => {

    const container = document.querySelector('.doc-body') as HTMLElement;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();

    // 判断点击位置是否在内容区域下方的 padding 区域
    if (
      event.clientY > containerRect.bottom ||
      event.clientY < containerRect.top ||
      event.clientX > containerRect.right ||
      event.clientX < containerRect.left
    ) {
        blockMouseLeave$.next({
            delay: 0,
        });
    }
  };

  useEventListener(document.body, 'mousemove', handleMouseMove);
};