<script lang="tsx">
import { defineComponent, Teleport, ref, watchEffect, nextTick, computed } from 'vue';
import { switchMap, tap, filter } from 'rxjs';
import { useSubscription } from '@vueuse/rxjs';
import domAlign from 'dom-align';
import { GripVertical, Plus } from 'lucide';
import { Popover } from 'ant-design-vue';

import { BaseBlockView } from '../../plugins/nodes/_common/baseBlockView';
import LucideIcon from '../LucideIcon/index.vue';

import Menu from './Menu/index.vue';
import EmptyMenu from './EmptyMenu/index.vue';
import { blockMouseEnter$, blockMouseLeave$, docScroll$ } from '../../event';
import { getNodeViewIcon } from '../../shared/icon';
import { isAncestor } from '../../shared/index';

export default defineComponent({
    setup() {
        const visibleRef = ref(false);
        const targetRef = ref<HTMLElement | null>(null);
        const offsetYRef = ref(0);
        const crtNodeViewRef = ref<BaseBlockView | null>(null);

        const cancelTimerIds = ref<number[]>([]);
        const sourceRef = ref<HTMLElement | null>(null);

        const nodeIconRef = computed(() => {
            const nodeView = crtNodeViewRef.value;
            
            if (nodeView?.isEmpty) {
                return Plus;
            }
            return getNodeViewIcon(nodeView);
        });

        const hide = (delay: number = 400) => {
            const timerId = setTimeout(() => {
                visibleRef.value = false;
            }, delay);

            cancelTimerIds.value.push(timerId);
        }

        const cancelHide = () => {
            if (!cancelTimerIds.value?.length) return;

            cancelTimerIds.value.forEach(timerId => {
                clearTimeout(timerId);
            });

            cancelTimerIds.value = [];
        }

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
                    offset: [-10, offsetYRef.value], 
                    overflow: { adjustX: false, adjustY: false }, 
                    useCssTransform: true,
                }
            );
        }

        useSubscription(
            blockMouseEnter$.pipe(
                filter(({ nodeView }) => {
                    // 如果新的nodeView， 是crtNodeView的祖先的话， 则不处理
                    return !isAncestor(crtNodeViewRef.value?.node, nodeView.node);
                }),
                tap(({ nodeView, offsetY }) => {
                    crtNodeViewRef.value = nodeView;

                    targetRef.value = nodeView.dom as HTMLElement;
                    offsetYRef.value = offsetY || 0;

                    cancelHide();
                }),
                switchMap(async () => {
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
                switchMap(async ({ delay }) => {
                    hide(delay);
                }),
            ).subscribe(),
        );

        useSubscription(
            docScroll$.pipe(
                switchMap(async () => {
                    hide(0);
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

        const handleMounseenter = () => {
            cancelHide();
        }

        const handleTransitionEnd = () => {
            sourceRef.value?.classList.remove('overlay-transition');
        };

        const renderContent = () => {
            const nodeView = crtNodeViewRef.value as BaseBlockView;

            if (!nodeView) return '';
            const type = nodeView.node.type.name;

            if (type === 'textBlock' && nodeView.isEmpty) {
                return (<EmptyMenu nodeView={crtNodeViewRef.value as BaseBlockView} />);
            }

            return (<Menu nodeView={nodeView} />);
        }

        return () => visibleRef.value ? (
            <Teleport to={document.body}>
                <Popover title="" placement="left" overlayClassName="actionDrag-popover" onOpenChange={() => cancelHide()}>
                    {{
                        default: () => (
                            <div class={['actionDrag', 'flex', 'items-center', 'justify-between']} ref={sourceRef} onMouseenter={handleMounseenter} onTransitionend={handleTransitionEnd}>
                                <span class="inline-flex items-center justify-center w-[24px] h-[24px]">
                                    <LucideIcon icon={nodeIconRef.value} width={14} color="#336FFF"></LucideIcon>
                                </span>
                                <LucideIcon icon={GripVertical} width={14} color="#8f959e"></LucideIcon>
                            </div>
                        ),
                        content: () => renderContent(),
                    }}
                </Popover>
                
            </Teleport>
        ) : '';
    }
});
</script>

<style>
.actionDrag-popover .ant-popover-arrow {
    display: none !important;
}
</style>

<style scoped>
.actionDrag {
    position: fixed;

    width: 42px;
    height: 26px;
    padding: 1px;
    cursor: grabbing;
    border-radius: 6px;
    background: #fff;
    border: 1px solid #dee0e3;
    user-select: none;
    z-index: 1000;
}

.actionDrag:hover {
    background: #eff0f1;
}
</style>