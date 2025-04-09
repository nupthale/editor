import { ref, onUnmounted } from 'vue';
import { createStore } from 'zustand/vanilla';

import { CommentInfoType } from '../interface';

export const commentStore = createStore<{
    // 左侧文档评论信息
    docComments: Record<string, string[]>,
    activeDocCommentId: string,
    // 右侧评论具体信息
    commentInfoMap: Record<string, CommentInfoType>,
    setCommentInfoMap: (infoMap: Record<string, CommentInfoType>) => void,
    setDocComments: (comments: Record<string, string[]>) => void,
    setActiveDocCommentId: (commentId: string) => void,
    addDocComment: (refId: string, commentId: string) => void,
    deleteDocComment: (commentId: string) => void,
}>((set, get) => ({
    docComments: {},
    activeDocCommentId: '',
    commentInfoMap: {},
    setDocComments: (docComments: Record<string, string[]> = {}) => set(() => {
        return {
            docComments,
        };
    }),
    setActiveDocCommentId: (activeDocCommentId) => set(() => {
        return {
            activeDocCommentId,
        };
    }),
    setCommentInfoMap: (commentInfoMap: Record<string, CommentInfoType> = {}) => set(() => {
        return {
            commentInfoMap,
        };
    }),
    setCommentInfo: (id, info) => set((state) => {
        const map = { ...state.commentInfoMap}

        map[id] = info;
        return {
            commentInfoMap: map,
        };
    }),
    addDocComment: (refId, commentId) => set((state) => {
        const docComments = { ...state.docComments };
        docComments[refId] = docComments[refId] || [];
        docComments[refId].push(commentId);

        return {
            docComments,
        };
    }),
    deleteDocComment: (commentId) => set((state) => {
        const docComments = { ... state.docComments };
        for (const refId in docComments) {
            docComments[refId] = docComments[refId].filter(id => id !== commentId);
        }

        return {
            docComments,
        };
    }),
}))

export function useCommentStore() {
    const state = ref(commentStore.getState());

    const unsubscribe = commentStore.subscribe((newState) => {
        state.value = newState;
    });

    onUnmounted(() => {
        unsubscribe();
    });

    return {
        state,
    };
}