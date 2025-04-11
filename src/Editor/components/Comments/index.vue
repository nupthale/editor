<script lang="tsx">
import { defineComponent, watch, computed } from 'vue';

import CommentPanel from './CommentPanel.vue';
import { useLayout } from './hooks/useLayout';
import { useActiveComment } from './hooks/useActiveComment';
import { useDocCommentClick } from './hooks/useDocCommentClick';
import { useScroll } from './hooks/useScroll';
import { layoutComments$ } from './event';
import { useCommentStore } from '../../store/comment';

export default defineComponent({
    setup() {
        const { state } = useCommentStore();

        const { transformYMap, docCommentRefMap, totalHeight, layoutReady, filteredDocCommentsRef } = useLayout();
        const { offsetY, updateOffsetY } = useActiveComment(docCommentRefMap, transformYMap);

        useDocCommentClick();

        useScroll(offsetY, updateOffsetY);

        watch(() => state.value?.docComments, () => {
            setTimeout(() => {
                layoutComments$.next();
            }, 0);
        });

        const filteredCommentsCount = computed(() => {
            let count = 0;

            Object.keys(state.value?.docComments).map((refId) => {
                if (filteredDocCommentsRef.value[refId]) {
                    count += state.value.docComments[refId]?.length || 0
                }
            });

            return count;
        });

        return () => (
            <div class="doc-comments">
                <div class="doc-comments_title">
                    评论（{ filteredCommentsCount.value }）
                </div>

                <div 
                    class={['doc-comments_body', layoutReady.value ? 'opacity-1' : 'opacity-0']}
                    style={{
                        minHeight: `${totalHeight.value}px`,
                    }}
                >
                    {
                        Object.keys(state.value?.docComments).map((refId) => (
                            filteredDocCommentsRef.value[refId] ? (state.value.docComments[refId].map((commentId) => (
                                <CommentPanel
                                    active={state.value?.activeDocCommentId === commentId}
                                    key={commentId} 
                                    id={commentId} 
                                    refId={refId} 
                                    top={transformYMap.value?.[commentId] - offsetY.value} 
                                />
                            ))) : ''
                        ))
                    }
                </div>
            </div>
        );
    }
});
</script>

<style scoped>
.doc-comments {
    position: absolute;
    top: 0;
    right: 0;
    min-height: 100%;
    overflow: hidden;

    width: 294px;
    padding: 0px 0 96px;
    border-left: 1px solid #dee0e3;
}

.doc-comments_title {
    padding: 8px 12px;
    position: sticky;
    top: 0;
    border-bottom: 1px solid #dee0e3;
    font-weight: 500;
    font-size: 14px;
    background: #fff;
    z-index: 1;
}

.doc-comments_body {
    padding: 0 12px;
}
</style>