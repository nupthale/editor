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
            
            return getText(docJsonRef.value?.doc?.content?.[0]?.content);
        })

        const titleRef = computed(() => {
            if (!docJsonRef.value) return {};

            const body = docJsonRef.value?.doc?.content?.[0];

            return {
                id: body.attrs.id,
            };
        });
        
        const headersRef = computed(() => {
            if (!docJsonRef.value) return [];

            const body = docJsonRef.value?.doc?.content?.[1];
        
            const headers = body.content.filter(item => item.type === 'header');

            return headers.map(item => ({
                id: item.attrs.id,
                level: item.attrs.level,
                text: getText(item.content),
            }));
        });

        const { activeIdRef } = useActive(titleRef, headersRef);

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

        return () => headersRef.value?.length ? (
            <div class="doc-catalog-wrap">
                <div class="doc-catalog-container w-fit h-fit">
                    <div 
                        class={['header', 'font-medium', 'text-[15px]', 'mb-2', 'cursor-pointer', activeIdRef.value === titleRef.value?.id ? 'active' : '']} 
                        onClick={handleTitleClick}>
                        {docTitle.value}
                    </div>
                    <Tree headers={headersRef.value} activeId={activeIdRef.value} />
                </div>
            </div>
        ) : '';
    }
});
</script>

<style scoped>
.headers.active {
    color: #1456f0;
}

.doc-catalog-wrap {
    position: sticky;
    top: 32px;
    left: 20px;
    height: 0px;
    max-width: 495px;
}

@media screen and (max-width: 1600px)  {
    .doc-catalog-wrap {
        max-width: 250px;
    }
}

.doc-catalog-container {
    z-index: 10;
    padding-top: 60px;

    width: 100%;
    overflow-x: hidden;
}
</style>