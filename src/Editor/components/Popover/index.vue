<script lang="tsx">
import { PropType } from 'vue';
import { defineComponent, ref, nextTick } from 'vue';
import { tap, filter } from 'rxjs';
import { useSubscription,  } from '@vueuse/rxjs';
import domAlign from 'dom-align';
import { showPopover$, hidePopover$, docScroll$ } from '../../event';
import { PopoverTypeEnum } from '../../interface';
import { useContextStore } from '../../store/context';

export default defineComponent({
    props: {
        type: String as PropType<PopoverTypeEnum>
    },
    setup(props, { slots }) {
        const { state, setPopoverVisible } = useContextStore();

        const rangeRef = ref<[number, number]>([0, 0]);
        const coordRef = ref<[number, number]>([0, 0]);
        const sourceRef = ref<HTMLElement | null>(null);
        const targetRef = ref<HTMLElement | null>(null);

        const hide = () => {
            setPopoverVisible(props.type!, false);
        }

        const layout = () => {
            // 获取@符号的位置
            const editorView = state.value?.editorView;
            if (!editorView) return;

            // 获取选区的 DOM 范围
            const [from, to] = rangeRef.value;
            const start = editorView.coordsAtPos(from);
            const end = editorView.coordsAtPos(to);

            // 计算选区的中心位置
            const centerX = (start.left + end.right) / 2;
            const centerY = start.top;

            coordRef.value = [centerX, centerY];

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
            docScroll$.pipe(
                filter(() => state.value?.popovers[props.type!]),
                tap(() => {
                    layout();
                }),
            ).subscribe()
        );

        useSubscription(
            showPopover$.pipe(
                filter(({ type }) => type === props.type),
                tap(({ range }) => {
                    // 获取@符号的位置
                    const editorView = state.value?.editorView;
                    if (!editorView) return;

                    setPopoverVisible(props.type!, true);
                    rangeRef.value = range;
                    layout();
                }),
            ).subscribe()
        );

        useSubscription(
            hidePopover$.pipe(
                filter(({ type }) => type === props.type),
                tap(() => {
                    hide();
                }),
            ).subscribe(),
        );

        return () => (
            <div>
                <div ref={targetRef} class="fixed" style={{ left: `${coordRef.value?.[0]}px`, top: `${coordRef.value?.[1]}px` }}></div>
                <div ref={sourceRef} class="content">
                    {state.value?.popovers[props.type!] ? slots.default?.() : ''}
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