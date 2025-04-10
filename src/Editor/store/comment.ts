import { ref, onUnmounted } from 'vue';
import { createStore } from 'zustand/vanilla';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';

import { mockUsers } from '../../doc';
import { CommentInfoType } from '../interface';

export const commentStore = createStore<{
    // 左侧文档评论信息
    docComments: Record<string, string[]>,
    activeDocCommentId: string | null,
    // 右侧评论具体信息
    commentInfoMap: Record<string, CommentInfoType>,
    addCommentInfo: (id: string, content: string) => void,
    setCommentInfoMap: (infoMap: Record<string, CommentInfoType>) => void,
    setDocComments: (comments: Record<string, string[]>) => void,
    setActiveDocCommentId: (commentId: string | null) => void,
    addDocComment: (refId: string, commentId: string) => void,
    deleteDocComment: (commentId: string) => void,
}>((set) => ({
    docComments: {},
    activeDocCommentId: null,
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
    addCommentInfo: (id, content) => set((state) => {
        const map = {...state.commentInfoMap }
        const comments = map[id]?.comments || [];
        comments.push({
            id: nanoid(8),
            content,
            user: mockUsers[Math.floor(Math.random() * mockUsers.length)].username,
            createTime: dayjs().format('YYYY-MM-DD'),
        });

        map[id] = {
            ...(map[id]),
            comments,
        };

        return {
            commentInfoMap: map,
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