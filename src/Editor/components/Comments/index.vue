<script lang="tsx">
import { defineComponent, watch } from 'vue';

import CommentPanel from './CommentPanel.vue';
import { useLayout } from './useLayout';
import { useFocusComment } from './useFocusComment';
import { useDocCommentClick } from './useDocCommentClick';
import { layoutComments$ } from './event';
import { useContextStore } from '../../context';

export default defineComponent({
    setup() {
        const { state } = useContextStore();

        const { transformYMap, docCommentRefMap, layoutReady } = useLayout();
        const { offsetY } = useFocusComment(docCommentRefMap, transformYMap);

        useDocCommentClick();

        watch(() => state.value?.comments, () => {
            setTimeout(() => {
                layoutComments$.next();
            }, 0);
        });

        return () => (
            <div class="doc-comments">
                <div class="doc-comments_title">
                    评论
                </div>

                <div class={['doc-comments_body', layoutReady.value ? 'opacity-1' : 'opacity-0']}>
                    {
                        Object.keys(state.value?.comments).map((refId) => (
                            state.value.comments[refId].map((commentId) => (
                                <CommentPanel
                                    active={state.value?.activeCommentId === commentId}
                                    key={commentId} 
                                    id={commentId} 
                                    refId={refId} 
                                    top={transformYMap.value?.[commentId] - offsetY.value} 
                                />
                            ))
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