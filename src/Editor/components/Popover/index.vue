<script lang="tsx">
import { PropType } from 'vue';
import { defineComponent, ref, nextTick } from 'vue';
import { tap, filter } from 'rxjs';
import { useSubscription } from '@vueuse/rxjs';
import domAlign from 'dom-align';
import { showPopover$, hidePopover$ } from '../../event';
import { PopoverTypeEnum } from '../../interface';

export default defineComponent({
    props: {
        type: String as PropType<PopoverTypeEnum>
    },
    setup(props, { slots }) {
        const visibleRef = ref(true);

        const coordRef = ref<[number, number]>([0, 0]);
        const sourceRef = ref<HTMLElement | null>(null);
        const targetRef = ref<HTMLElement | null>(null);

        const hide = () => {
            visibleRef.value = false;
        }

        const layout = () => {
            nextTick(() => {
                const $source = sourceRef.value;
            
                if (!$source || !targetRef.value) return;
                
                domAlign(
                    $source,
                    targetRef.value,
                    {
                        points: ['bc', 'tc'], 
                        offset: [0, -10], 
                        overflow: { adjustX: false, adjustY: false }, 
                        useCssTransform: true,
                    }
                );
            });   
        }

        useSubscription(
            showPopover$.pipe(
                filter(({ type }) => type === props.type),
                tap(({ x, y }) => {
                    visibleRef.value = true;
                    coordRef.value = [x, y];

                    layout();
                }),
            ).subscribe()
        );

        useSubscription(
            hidePopover$.pipe(
                tap(() => {
                    hide();
                }),
            ).subscribe(),
        );

        return () => (
            <div>
                <div ref={targetRef} class="fixed" style={{ left: `${coordRef.value?.[0]}px`, top: `${coordRef.value?.[1]}px` }}></div>
                <div ref={sourceRef} class="content">
                    {visibleRef.value ? slots.default?.() : ''}
                </div>
            </div>
        );
    }
});
</script>

<style scoped>
.content {
    position: fixed;
    cursor: pointer;

    border: 1px solid #dee0e3;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 6px 24px #1f232914;
}
</style>