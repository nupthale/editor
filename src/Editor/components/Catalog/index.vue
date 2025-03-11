<script lang="tsx">
import { defineComponent, Teleport, ref, watchEffect, nextTick, computed } from 'vue';
import { switchMap, debounceTime } from 'rxjs';
import { useSubscription } from '@vueuse/rxjs';
import { Tree } from 'ant-design-vue';

import { contextStore } from '../../context';
import { docChanged$ } from '../../event';

import { toTree } from './util';

export default defineComponent({
    setup() {
        const docJsonRef = ref<Record<string, any> | null>(null);

        const docTitle = computed(() => {
            if (!docJsonRef.value) return '';
            
            return docJsonRef.value?.doc?.content?.[0]?.content?.[0]?.text;
        })

        const catalogTreeRef = computed(() => {
            if (!docJsonRef.value) return [];

            const body = docJsonRef.value?.doc?.content?.[1];
            
            return toTree(body.content);
        });

        useSubscription(
            docChanged$.pipe(
                debounceTime(300),
                switchMap(async () => {
                    const view = contextStore.getState().editorView;
                    docJsonRef.value = view?.state.toJSON();
                }),
            ).subscribe()
        );

        return () => catalogTreeRef.value?.length ? (
            <div class="doc-catalog-container w-fit h-fit">
                <div class="font-medium text-[15px] mb-2">{docTitle.value}</div>
                <Tree class="catalogTree" treeData={catalogTreeRef.value} defaultExpandAll>
                    {{
                        title: ({ title, key, level }) => {
                            return (
                                <span key={key} style={{fontWeight: level === 1 ? '500' : ''}}>{title}</span>
                            );
                        }
                    }}
                </Tree>
            </div>
        ) : '';
    }
});
</script>

<style>
.catalogTree.ant-tree .ant-tree-indent-unit {
    width: 14px!important;
}

.catalogTree.ant-tree {
    color: #646a73!important;
}

.catalogTree .ant-tree-switcher {
    width: 10px!important;
}
</style>

<style scoped>
.doc-catalog-container {
    position: sticky;
    top: 80px;
    left: 20px;
    z-index: 10;
}
</style>