<script lang="tsx">
import { defineComponent, ref, computed } from 'vue';

import CommentPanel from './CommentPanel.vue';

export default defineComponent({
    setup() {
        return () => (
            <div class="doc-comments">
                <div class="doc-comments_title">
                    评论
                </div>

                <div class="doc-comments_body">
                    <CommentPanel />
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

    width: 294px;
    padding: 0px 0 96px;
    border-left: 1px solid #dee0e3;
}

.doc-comments_title {
    padding: 8px 12px;
    position: sticky;
    top: 64px;
    border-bottom: 1px solid #dee0e3;
    font-weight: 500;
    font-size: 14px;
}

.doc-comments_body {
    padding: 0 12px;
}
</style>