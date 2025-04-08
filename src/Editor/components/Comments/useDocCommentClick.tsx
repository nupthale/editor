import { onMounted, onUnmounted } from 'vue';

import { contextStore } from '../../context';
import { focusComment$ } from './event';

export const useDocCommentClick = () => {
    const handleClick = (event: MouseEvent) => {

        const target = event.target as HTMLElement;
        const commentEl = target.closest('.doc-comment');
        if (commentEl) {
            const refId = commentEl.getAttribute('data-comment-id')!;

            focusComment$.next({
                refId,
            });

            // 更新commentMark 为active
            const editorView = contextStore.getState().editorView;
            const state = editorView?.state;
            const dispatch = editorView?.dispatch;

            if (!editorView || !state) return;

            const tr = state.tr!;

            state?.doc.descendants((node, pos) => {
                node.marks.forEach(mark => {
                    if (mark.type.name !== 'comment') return;

                    // 创建新的 mark 属性
                    const newAttrs = {
                        ...mark.attrs,
                        active: mark.attrs.id === refId,
                    };
                    
                    // 先移除旧的 mark
                    tr.removeMark(pos, pos + node.nodeSize, mark.type);

                    // 在当前位置添加新的 mark
                    tr.addMark(
                        pos,
                        pos + node.nodeSize,
                        mark.type.create(newAttrs),
                    );
                });
            });

            dispatch?.(tr);
        }
    }
    
    onMounted(() => {
        document.addEventListener('click', handleClick);
    });

    onUnmounted(() => {
        document.removeEventListener('click', handleClick);
    });
}