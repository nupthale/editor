import { ref, watchEffect, Ref } from 'vue';
import { useSubscription } from '@vueuse/rxjs';
import { tap } from 'rxjs';

import { docScroll$ } from '../../event'; 

/**
 * .doc-title和headingsRef.value按照offsetTop排序， 判断当前距离顶部最近的一个， 然后高亮
 */

export const useActive = (titleRef: Ref<{ id?: string }>, headingsRef: Ref<{ id: string }[]>) => {
    const activeIdRef = ref(titleRef.value?.id);
    const nodesRef = ref<{ id: string, offsetTop: number }[]>([]);

    watchEffect(() => {
        const nodes = titleRef?.value?.id ? [titleRef.value, ...headingsRef.value] : [];
        const resultNodes: { id: string, offsetTop: number }[] = [];

        nodes.forEach((node) => {
            const el = document.querySelector(`[data-id="${node.id}"]`) as HTMLElement;
            if (el) {
                resultNodes.push({
                    id: node.id!,
                    offsetTop: el.offsetTop,
                });
            }
        });

        nodesRef.value = resultNodes.sort((prev, next) => prev.offsetTop - next.offsetTop);
    });

    useSubscription(
        docScroll$.pipe(
            tap(({ e }) => {
                const scrollTop = (e.target as HTMLElement).scrollTop;
                let activeId: string | null = null;
                let minDistance = Infinity;

                nodesRef.value.forEach((node) => {
                    const distance = Math.abs(node.offsetTop - scrollTop);
                    if (distance < minDistance) {
                        minDistance = distance;
                        activeId = node.id;
                    }
                });

                activeIdRef.value = activeId || titleRef.value?.id;
            }),
        ).subscribe(),
    );

    return {
        activeIdRef,
    };
}