<script lang="tsx">
import { defineComponent, Teleport, ref, watchEffect, nextTick } from 'vue';
import { switchMap, tap } from 'rxjs';
import { useSubscription } from '@vueuse/rxjs';
import domAlign from 'dom-align';

import { blockMouseEnter$, blockMouseLeave$ } from '../../event';

export default defineComponent({
    setup() {
        const visibleRef = ref(false);
        const targetRef = ref<HTMLElement | null>(null);

        const cancelTimerId = ref<number | null>(null);
        const sourceRef = ref<HTMLElement | null>(null);

        const layout = (isInit = true) => {
            const $source = sourceRef.value;

            if (!$source || !targetRef.value) return;

            // 只有显示的时候， 才添加 transition
            if (!isInit) {
                $source.classList.add('overlay-transition');
            }
            
            domAlign(
                $source,
                targetRef.value,
                {
                    points: ['tr', 'tl'], 
                    offset: [-10, 0], 
                    overflow: { adjustX: false, adjustY: false }, 
                    useCssTransform: true,
                }
            );
        }

        useSubscription(
            blockMouseEnter$.pipe(
                tap(() => {
                    if (!cancelTimerId.value) return;

                    clearTimeout(cancelTimerId.value);
                    cancelTimerId.value = null;
                }),
                switchMap(async ({ view }) => {
                    targetRef.value = view.dom as HTMLElement;
                    const isVisible = visibleRef.value;
                    
                    // 没展示到展示的话， 通过handleShow处理
                    if (!isVisible) {
                        visibleRef.value = true;
                        return;
                    }

                    // 展示的话， 这里处理
                    visibleRef.value = true;
                    layout(false);
                }),
            ).subscribe()
        );

        useSubscription(
            blockMouseLeave$.pipe(
                switchMap(async () => {
                    const $source = sourceRef.value;

                    if (!$source) return;

                    cancelTimerId.value = setTimeout(() => {
                        visibleRef.value = false;
                    }, 100);
                }),
            ).subscribe(),
        );

        watchEffect(() => {
            if (visibleRef.value) {
                nextTick(() => {
                    // DOM已经挂载，执行需要的操作
                    layout(true);
                });
            }
        });

        const handleTransitionEnd = () => {
            sourceRef.value?.classList.remove('overlay-transition');
        };

        return () => visibleRef.value ? (
            <Teleport to={document.body}>
                <div class="actionDrag" ref={sourceRef} onTransitionend={handleTransitionEnd}>
                    123
                </div>
            </Teleport>
        ) : '';
    }
});
</script>

<style scoped>
.actionDrag {
    position: fixed;

    width: 42px;
    height: 26px;
    cursor: grabbing;
    border-radius: 6px;
    background: #fff;
    border: 1px solid #dee0e3;
}
</style>