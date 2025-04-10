<script lang="tsx">
import { defineComponent, toRef, computed, PropType } from 'vue';

import { docScrollTo$ } from '../../event';
import { InputNode, toTree } from './util';

export default defineComponent({
    props: {
        headings: {
            type: Array as PropType<InputNode[]>,
            default: () => [],
        },
        activeId: String,
    },
    setup(props) {
        const headingsRef = toRef(props, 'headings');

        const catalogsRef = computed(() => toTree(headingsRef.value));

        const handleClick = (item: InputNode) => {
            docScrollTo$.next({
                el: document.querySelector(`[data-id="${item.id}"]`) as HTMLElement,
            });
        };                          
        
        return () => (
            <div class="catalogTree">
                {
                    catalogsRef.value.map((item) => (
                        <div key={item.id} class={['heading', `level-${item.level}`, props.activeId === item.id ? 'active' : '']} style={{ paddingLeft: `${item.indent * 14}px` }} onClick={() => handleClick(item)}>
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.heading.active {
    color: #1456f0;
    font-weight: 600;
}

.heading:hover {
    color: #1456f0;
}
</style>