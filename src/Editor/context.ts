import { ref, onUnmounted } from 'vue';
import { EditorView } from 'prosemirror-view';
import { createStore } from 'zustand/vanilla';

import { PopoverTypeEnum } from './interface';

export const contextStore = createStore<{
    editorView: EditorView | null,
    popovers: Record<PopoverTypeEnum, boolean>,
    hasPopoverVisible: boolean,
    orderedListMap: Record<string, number[]>,
    comments: Record<string, string[]>,
    setEditorView: (view: EditorView) => void,
    setPopoverVisible: (type: PopoverTypeEnum, visible: boolean) => void,
    setOrderedListMap: (map: Record<string, number[]>) => void, 
    setComments: (comments: Record<string, string[]>) => void,
    addComment: (refId: string, commentId: string) => void,
    deleteComment: (commentId: string) => void,
}>((set, get) => ({
    editorView: null,
    popovers: {
        [PopoverTypeEnum.MENTION]: false,
        [PopoverTypeEnum.BUBBLE_MENU]: false,
    },
    orderedListMap: {},
    comments: {},
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
    setOrderedListMap: (map: Record<string, number[]>) => set(() => {
        return {
            orderedListMap: map,
        };
    }),
    setComments: (comments: Record<string, string[]>) => set(() => {
        return {
            comments,
        };
    }),
    addComment: (refId, commentId) => set((state) => {
        const comments = state.comments || {};
        comments[refId] = comments[refId] || [];
        comments[refId].push(commentId);

        return {
            comments,
        };
    }),
    deleteComment: (commentId) => set((state) => {
        const comments = state.comments || {};
        for (const refId in comments) {
            comments[refId] = comments[refId].filter(id => id !== commentId);
        }

        return {
            comments,
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