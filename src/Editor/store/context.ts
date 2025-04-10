import { ref, onUnmounted } from 'vue';
import { EditorView } from 'prosemirror-view';
import { createStore } from 'zustand/vanilla';

import { PopoverTypeEnum } from '../interface';

export const contextStore = createStore<{
    editorView: EditorView | null,
    scrollEl: HTMLElement | null,
    popovers: Record<PopoverTypeEnum, boolean>,
    hasPopoverVisible: boolean,
    orderedListMap: Record<string, number[]>,
    setEditorView: (view: EditorView) => void,
    setScrollEl: (el: HTMLElement | null) => void,
    setPopoverVisible: (type: PopoverTypeEnum, visible: boolean) => void,
    setOrderedListMap: (map: Record<string, number[]>) => void, 
}>((set, get) => ({
    editorView: null,
    scrollEl: null,
    popovers: {
        [PopoverTypeEnum.MENTION]: false,
        [PopoverTypeEnum.BUBBLE_MENU]: false,
    },
    orderedListMap: {},
    get hasPopoverVisible() {
        return Object.values(get().popovers).some(visible => visible);
    },
    
    setEditorView: (view: EditorView | null) => set({ editorView: view }),
    setScrollEl: (el: HTMLElement | null) => set({ scrollEl: el }),
    setPopoverVisible: (type: PopoverTypeEnum, visible: boolean) => set((state) => ({
        popovers: {
            ...state.popovers,
            [type]: visible,
        }
    })),
    setOrderedListMap: (map: Record<string, number[]>) => set(() => {
        return {
            orderedListMap: map,
        };
    }),
}))

export function useContextStore() {
    const state = ref(contextStore.getState());

    const unsubscribe = contextStore.subscribe((newState) => {
        state.value = newState;
    });

    onUnmounted(() => {
        unsubscribe();
    });

    return {
        state,
        setEditorView: contextStore.getState().setEditorView,
        setPopoverVisible: contextStore.getState().setPopoverVisible,
    };
}