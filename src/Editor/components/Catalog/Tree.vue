<script lang="tsx">
import { defineComponent, toRef, computed, PropType } from 'vue';

import { InputNode, toTree } from './util';

export default defineComponent({
    props: {
        headings: {
            type: Array as PropType<InputNode[]>,
            default: () => [],
        }
    },
    setup(props) {
        const headingsRef = toRef(props, 'headings');

        const catalogsRef = computed(() => toTree(headingsRef.value));

        return () => (
            <div class="catalogTree">
                {
                    catalogsRef.value.map((item) => (
                        <div key={item.id} class={['heading', `level-${item.level}`]} style={{ paddingLeft: `${item.indent * 14}px` }}>
                            {item.text}
                        </div>
                    ))
                }
            </div>
        );
    }
});
</script>

<style scoped>
.catalogTree {
    color: #646a73;
    line-height: 22px;
    font-size: 14px;
}

.catalogTree .level-1 {
    font-weight: 500;
}

.heading {
    cursor: pointer;
    padding-bottom: 8px;
}

.heading:hover {
    color: #1456f0;
}
</style>