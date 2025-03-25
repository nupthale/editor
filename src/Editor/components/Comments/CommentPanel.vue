<script lang="tsx">
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        return () => (
            <div class="doc-comment">
                <div class="doc-comment_head">
                    <div class="doc-comment_headTitle truncate">
                        标题1标题1标题1标题1标题1标题1标题1标题1标题1标题1
                    </div>
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
    line-height: 1.5;
    border-radius: 6px;
    border: 1px solid #dee0e3;
    box-shadow: 0 8px 16px #1f23291a;

    transform: translate3d(0px, 174.25px, 0px);
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
</style>