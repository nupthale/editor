import { onMounted, onUnmounted, ref } from 'vue';
import { useSubscription } from '@vueuse/rxjs';
import { tap } from 'rxjs';

import { docScroll$ } from '../../../event';

export const useScroll = (offsetY, updateOffsetY) => {
    const scrollTop = ref(0);

    useSubscription(
        docScroll$.pipe(
            tap(({ e }) => {
                scrollTop.value = (e.target as HTMLElement)?.scrollTop || 0;
            }),
        ).subscribe(),
    );

    const handleWheel = (e: WheelEvent) => {
        // 判断页面已经滚动到顶部了， 则移动。
        if (scrollTop.value > 0) {
            return;
        }

        updateOffsetY(
            Math.max(offsetY.value + e.deltaY, 0),
        );
    }

    onMounted(() => {
        document.addEventListener('wheel', handleWheel);
    });

    onUnmounted(() => {
        document.removeEventListener('wheel', handleWheel);
    });
}
