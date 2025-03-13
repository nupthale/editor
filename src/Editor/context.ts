import { ref, onUnmounted } from 'vue';
import { EditorView } from 'prosemirror-view';
import { createStore } from 'zustand/vanilla';

export const contextStore = createStore<{
    editorView: EditorView | null,
    popoverVisible: boolean,
    setEditorView: (view: EditorView) => void,
    setPopoverVisible: (visible: boolean) => void,
}>((set) => ({
    editorView: null,
    popoverVisible: false,
    setEditorView: (view: EditorView | null) => set({ editorView: view }),
    setPopoverVisible: (visible: boolean) => set({ popoverVisible: visible }),
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