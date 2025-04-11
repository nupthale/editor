import { ref, onUnmounted } from 'vue';
import { createStore } from 'zustand/vanilla';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';

import { syncToRemote as syncCommentToRemote } from '../plugins/collab/comment';
import { mockUsers, commentInfoMap, docComments, LOCAL_MODE, mockUser } from '../../doc';
import { CommentInfoType } from '../interface';

export const commentStore = createStore<{
    // 左侧文档评论信息
    docComments: Record<string, string[]>,
    activeDocCommentId: string | null,
    // 右侧评论具体信息
    commentInfoMap: Record<string, CommentInfoType>,
    addCommentInfo: (id: string, content: string) => void,
    setComment: (comments: Record<string, string[]>, infoMap: Record<string, CommentInfoType>) => void,
    setActiveDocCommentId: (commentId: string | null) => void,
    addDocComment: (refId: string, commentId: string) => void,
    deleteDocComment: (commentId: string) => void,
}>((set) => ({
    docComments: LOCAL_MODE ? docComments : {},
    activeDocCommentId: null,
    commentInfoMap: LOCAL_MODE ? commentInfoMap : {},
    setActiveDocCommentId: (activeDocCommentId) => set(() => {
        return {
            activeDocCommentId,
        };
    }),
    setComment: (docComments: Record<string, string[]> = {}, commentInfoMap: Record<string, CommentInfoType> = {}) => set(() => {       
        return {
            docComments,
            commentInfoMap,
        };
    }),
    addCommentInfo: (id, content) => set((state) => {
        const map = {...state.commentInfoMap }
        const comments = map[id]?.comments || [];
        comments.push({
            id: nanoid(8),
            content,
            user: mockUser.name,
            createTime: dayjs().format('YYYY-MM-DD'),
        });

        map[id] = {
            ...(map[id]),
            comments,
        };

        if (!LOCAL_MODE) {
            syncCommentToRemote(state.docComments, map);
        }

        return {
            commentInfoMap: map,
        };
    }),
    setCommentInfo: (id, info) => set((state) => {
        const map = { ...state.commentInfoMap}

        map[id] = info;

        if (!LOCAL_MODE) {
            syncCommentToRemote(state.docComments, map);
        }

        return {
            commentInfoMap: map,
        };
    }),
    addDocComment: (refId, commentId) => set((state) => {
        const docComments = { ...state.docComments };
        docComments[refId] = docComments[refId] || [];
        docComments[refId].push(commentId);

        if (!LOCAL_MODE) {
            syncCommentToRemote(docComments, state.commentInfoMap);
        }

        return {
            docComments,
        };
    }),
    deleteDocComment: (commentId) => set((state) => {
        const docComments = { ... state.docComments };
        for (const refId in docComments) {
            docComments[refId] = docComments[refId].filter(id => id !== commentId);
        }

        if (!LOCAL_MODE) {
            syncCommentToRemote(docComments, state.commentInfoMap);
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