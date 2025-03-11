<script lang="tsx">
import { defineComponent, ref, computed } from 'vue';
import { switchMap, debounceTime } from 'rxjs';
import { useSubscription } from '@vueuse/rxjs';

import { contextStore } from '../../context';
import { docChanged$ } from '../../event';

import { getText } from './util';
import Tree from './Tree.vue';

export default defineComponent({
    setup() {
        const docJsonRef = ref<Record<string, any> | null>(null);

        const docTitle = computed(() => {
            if (!docJsonRef.value) return '';
            
            return docJsonRef.value?.doc?.content?.[0]?.content?.[0]?.text;
        })

        const headingsRef = computed(() => {
            if (!docJsonRef.value) return [];

            const body = docJsonRef.value?.doc?.content?.[1];
            
            const headings = body.content.filter(item => item.type === 'heading');

            return headings.map(item => ({
                id: item.attrs.id,
                level: item.attrs.level,
                text: getText(item.content),
            }));
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

        return () => headingsRef.value?.length ? (
            <div class="doc-catalog-container w-fit h-fit">
                <div class="font-medium text-[15px] mb-2 text-[#1456f0]">{docTitle.value}</div>
                <Tree headings={headingsRef.value} />
            </div>
        ) : '';
    }
});
</script>

<style scoped>
.doc-catalog-container {
    position: sticky;
    top: 20px;
    left: 20px;
    z-index: 10;
    padding-top: 60px;
}
</style>