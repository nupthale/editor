<script lang="tsx">
import { defineComponent, ref, computed } from 'vue';
import { switchMap, debounceTime } from 'rxjs';
import { useSubscription } from '@vueuse/rxjs';

import { contextStore } from '../../store/context';
import { docChanged$, docScrollTo$  } from '../../event';

import { manualSetActiveId$ } from './event';
import { useActive } from './useActive';
import { getText } from './util';
import Tree from './Tree.vue';

export default defineComponent({
    setup() {
        const docJsonRef = ref<Record<string, any> | null>(null);

        const docTitle = computed(() => {
            if (!docJsonRef.value) return '';
            
            return docJsonRef.value?.doc?.content?.[0]?.content?.[0]?.text;
        })

        const titleRef = computed(() => {
            if (!docJsonRef.value) return {};

            const body = docJsonRef.value?.doc?.content?.[0];

            return {
                id: body.attrs.id,
            };
        });
        
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

        const { activeIdRef } = useActive(titleRef, headingsRef);

        useSubscription(
            docChanged$.pipe(
                debounceTime(300),
                switchMap(async () => {
                    const view = contextStore.getState().editorView;
                    docJsonRef.value = view?.state.toJSON();
                }),
            ).subscribe()
        );

        const handleTitleClick = () => {
            docScrollTo$.next({
                el: document.querySelector(`[data-id="${titleRef.value?.id}"]`) as HTMLElement,
            });

            manualSetActiveId$.next(titleRef.value?.id);
        }

        return () => headingsRef.value?.length ? (
            <div class="doc-catalog-wrap">
                <div class="doc-catalog-container w-fit h-fit">
                    <div 
                        class={['heading', 'font-medium', 'text-[15px]', 'mb-2', 'cursor-pointer', activeIdRef.value === titleRef.value?.id ? 'active' : '']} 
                        onClick={handleTitleClick}>
                        {docTitle.value}
                    </div>
                    <Tree headings={headingsRef.value} activeId={activeIdRef.value} />
                </div>
            </div>
        ) : '';
    }
});
</script>

<style scoped>
.heading.active {
    color: #1456f0;
}

.doc-catalog-wrap {
    position: sticky;
    top: 32px;
    left: 20px;
    height: 0px;
    max-width: 495px;
    width: fit-content;
}

.doc-catalog-container {
    z-index: 10;
    padding-top: 60px;

    width: 100%;
    overflow-x: hidden;
}
</style>