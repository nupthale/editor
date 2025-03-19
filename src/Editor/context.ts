import { ref, onUnmounted } from 'vue';
import { EditorView, NodeView } from 'prosemirror-view';
import { createStore } from 'zustand/vanilla';
import { PopoverTypeEnum } from './interface';

export const contextStore = createStore<{
    editorView: EditorView | null,
    popovers: Record<PopoverTypeEnum, boolean>,
    hasPopoverVisible: boolean,
    orderedListMap: Record<string, NodeView>,
    setEditorView: (view: EditorView) => void,
    setPopoverVisible: (type: PopoverTypeEnum, visible: boolean) => void,
    addOrderedListMap: (id: string, view: NodeView) => void,
}>((set, get) => ({
    editorView: null,
    popovers: {
        [PopoverTypeEnum.MENTION]: false,
        [PopoverTypeEnum.BUBBLE_MENU]: false,
    },
    orderedListMap: {},
    get hasPopoverVisible() {
        return Object.values(get().popovers).some(visible => visible);
    },
    
    setEditorView: (view: EditorView | null) => set({ editorView: view }),
    setPopoverVisible: (type: PopoverTypeEnum, visible: boolean) => set((state) => ({
        popovers: {
            ...state.popovers,
            [type]: visible,
        }
    })),
    addOrderedListMap: (id: string, view: NodeView) => set((state) => ({
        orderedListMap: {
            ...state.orderedListMap,
            [id]: view,
        }
    })) 
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