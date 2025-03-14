import { Ref } from 'vue';
import { useEventListener } from '@vueuse/core';

import { contextStore } from '../context';
import { blockMouseLeave$ } from '../event';

export const useEditorBottomHover = (editorDomRef: Ref<HTMLElement | null>) => {

  const handleEditorBottomHover = (event) => {
    if (!editorDomRef.value) return;

    const container = editorDomRef.value as HTMLElement;
    const containerRect = container.getBoundingClientRect();
    const contentRect = container.firstElementChild?.getBoundingClientRect();
        
    const editorView = contextStore.getState().editorView;

    if (!contentRect || !editorView) return;

    // 判断点击位置是否在内容区域下方的 padding 区域
    if (event.clientY > contentRect.bottom && event.clientY <= containerRect.bottom) {
        blockMouseLeave$.next({
            delay: 0,
        });
    }
  };

  useEventListener(editorDomRef, 'mousemove', handleEditorBottomHover);
};