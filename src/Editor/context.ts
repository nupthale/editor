import { ref, onUnmounted } from 'vue';
import { EditorView } from 'prosemirror-view';
import { createStore } from 'zustand/vanilla';
import { PopoverTypeEnum } from './interface';

export const contextStore = createStore<{
    editorView: EditorView | null,
    popovers: Record<PopoverTypeEnum, boolean>,
    setEditorView: (view: EditorView) => void,
    setPopoverVisible: (type: PopoverTypeEnum, visible: boolean) => void,
}>((set) => ({
    editorView: null,
    popovers: {
        [PopoverTypeEnum.MENTION]: false,
        [PopoverTypeEnum.BUBBLE_MENU]: false,
    },
    setEditorView: (view: EditorView | null) => set({ editorView: view }),
    setPopoverVisible: (type: PopoverTypeEnum, visible: boolean) => set((state) => ({
        popovers: {
            ...state.popovers,
            [type]: visible,
        }
    })),
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