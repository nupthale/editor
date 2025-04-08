<script lang="tsx">
import { defineComponent, ref, watch } from 'vue';
import { useElementSize } from '@vueuse/core';
import { User } from '@zsfe/zsui';

import { updateCommentHeight$ } from './useLayout';

export default defineComponent({
    props: {
        id: String,
        refId: String,
        top: Number,
    },
    setup(props) {
        const elRef = ref<HTMLElement>();

        const { height } = useElementSize(elRef);

        watch(height, (newHeight) => {
            updateCommentHeight$.next({
                id: props.id!,
                height: newHeight,
            });
        });

        return () => (
            <div class="doc-comment" ref={elRef} style={{ transform: `translate3d(0, ${props.top || 0}px, 0)`}}>
                <div class="doc-comment_head">
                    <div class="doc-comment_headTitle truncate">
                        标题1标题1标题1标题1标题1标题1标题1标题1标题1标题1
                    </div>
                </div>
                <div class="doc-comment_body">
                    <div class="doc-comment-item flex items-start">
                        <User class="mt-1.5" showText={false} username="李贺" size="large" />
                        <div class="ml-3">
                            <div class="text-xs">李贺 <span class="lightText">5分钟前</span></div>
                            <div class="mt-1 text-sm break-all">
                                123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123
                            </div>
                        </div>
                    </div>
                </div>
                <div class="doc-comment_foot">

                </div>
            </div>
        );
    }
});
</script>

<style scoped>
.doc-comment {
    position: absolute;
    width: 270px;
    top: 0;
    line-height: 1.5;
    border-radius: 6px;
    border: 1px solid #dee0e3;
    box-shadow: 0 8px 16px #1f23291a;

    opacity: 1;
}

.doc-comment:before {
    content: '';
    position: absolute;
    top: -2px;
    left: -1px;
    right: -1px;
    border-top: 6px solid #ffc60a;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
}

.doc-comment_head {
    position: relative;
    display: flex;
    align-items: center;
    height: 35px;
    padding: 9px 12px 6px;
}

.doc-comment_head:before {
    content: "";
    width: 2px;
    height: 16px;
    margin-right: 6px;
    background-color: #bbbfc4 !important;
    border-radius: 1px;
}

.doc-comment_headTitle {
    font-size: 12px;
    color: #646a73;
    line-height: 20px;
}

.doc-comment-item {
    padding: 6px 12px;
}

.doc-comment_foot {
    min-height: 20px;
}
</style>