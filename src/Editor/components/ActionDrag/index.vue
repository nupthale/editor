<script lang="tsx">
import { defineComponent, Teleport, ref, watchEffect, nextTick, computed, Ref } from 'vue';
import { switchMap, tap } from 'rxjs';
import { useSubscription } from '@vueuse/rxjs';
import domAlign from 'dom-align';
import { Type, GripVertical, Heading1, Heading2, Heading3, List, ListOrdered } from 'lucide';
import { Popover, Menu } from 'ant-design-vue';

import { useUpdateBlockNodeType } from './useUpdateBlockNodeType';
import { BaseBlockView } from '../../plugins/nodes/_common/baseBlockView';
import LucideIcon from '../LucideIcon/index.vue';

import { blockMouseEnter$, blockMouseLeave$ } from '../../event';

const MenuItem = Menu.Item;

export default defineComponent({
    setup() {
        const visibleRef = ref(false);
        const targetRef = ref<HTMLElement | null>(null);
        const offsetYRef = ref(0);
        const crtNodeViewRef = ref<BaseBlockView | null>(null);

        const cancelTimerId = ref<number | null>(null);
        const sourceRef = ref<HTMLElement | null>(null);

        const nodeIconRef = computed(() => {
            return crtNodeViewRef.value?.icon;
        });

        const { handleSelectType } = useUpdateBlockNodeType(
            crtNodeViewRef as Ref<BaseBlockView | null>,
        );

        const hide = (delay: number = 1000) => {
            cancelTimerId.value = setTimeout(() => {
                visibleRef.value = false;
            }, delay);
        }

        const cancelHide = () => {
            if (!cancelTimerId.value) return;

            clearTimeout(cancelTimerId.value);
            cancelTimerId.value = null;
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
                tap(({ nodeView, offsetY }) => {
                    crtNodeViewRef.value = nodeView;

                    targetRef.value = nodeView.contentDOM as HTMLElement;
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

        return () => visibleRef.value ? (
            <Teleport to={document.body}>
                <Popover title="" placement="left" overlayClassName="actionDrag-popover" onOpenChange={() => cancelHide()}>
                    {{
                        default: () => (
                            <div class="actionDrag flex items-center justify-between" ref={sourceRef} onMouseenter={handleMounseenter} onTransitionend={handleTransitionEnd}>
                                <span class="inline-flex items-center justify-center w-[24px] h-[24px]">
                                    <LucideIcon icon={nodeIconRef.value} width={14} color="#336df4"></LucideIcon>
                                </span>
                                <LucideIcon icon={GripVertical} width={14} color="#8f959e"></LucideIcon>
                            </div>
                        ),
                        content: () => (
                            <div class="w-[230px] p-2">
                                <Menu class="text-[#2b2f36] !border-none">
                                    <MenuItem key="1" class="!w-full !p-1 !m-0 !h-auto !min-h-auto !leading-none !rounded-[4px]" onClick={() => handleSelectType('paragraph')}>
                                        <div class="flex items-center">
                                            <span class="mr-4 inline-flex items-center justify-center w-[24px] h-[24px]">
                                                <LucideIcon icon={Type} width={18}></LucideIcon>
                                            </span>
                                            正文
                                        </div>
                                    </MenuItem>
                                    <MenuItem key="2" class="!w-full !p-1 !m-0 !h-auto !min-h-auto !leading-none !rounded-[4px]" onClick={() => handleSelectType('heading', { level: 1 })}>
                                        <div class="flex items-center">
                                            <span class="mr-4 inline-flex items-center justify-center w-[24px] h-[24px]">
                                                <LucideIcon icon={Heading1} width={20}></LucideIcon>
                                            </span>
                                            一级标题
                                        </div>
                                    </MenuItem>
                                    <MenuItem key="3" class="!w-full !p-1 !m-0 !h-auto !min-h-auto !leading-none !rounded-[4px]" onClick={() => handleSelectType('heading', { level: 2 })}>
                                        <div class="flex items-center">
                                            <span class="mr-4 inline-flex items-center justify-center w-[24px] h-[24px]">
                                                <LucideIcon icon={Heading2} width={20}></LucideIcon>
                                            </span>
                                            二级标题
                                        </div>
                                    </MenuItem>
                                    <MenuItem key="4" class="!w-full !p-1 !m-0 !h-auto !min-h-auto !leading-none !rounded-[4px]" onClick={() => handleSelectType('heading', { level: 3 })}>
                                        <div class="flex items-center">
                                            <span class="mr-4 inline-flex items-center justify-center w-[24px] h-[24px]">
                                                <LucideIcon icon={Heading3} width={20}></LucideIcon>
                                            </span>
                                            三级标题
                                        </div>
                                    </MenuItem>
                                    <MenuItem key="5" class="!w-full !p-1 !m-0 !h-auto !min-h-auto !leading-none !rounded-[4px]">
                                        <div class="flex items-center">
                                            <span class="mr-4 inline-flex items-center justify-center w-[24px] h-[24px]">
                                                <LucideIcon icon={ListOrdered} width={20}></LucideIcon>
                                            </span>
                                            有序列表
                                        </div>
                                    </MenuItem>
                                    <MenuItem key="6" class="!w-full !p-1 !m-0 !h-auto !min-h-auto !leading-none !rounded-[4px]">
                                        <div class="flex items-center">
                                            <span class="mr-4 inline-flex items-center justify-center w-[24px] h-[24px]">
                                                <LucideIcon icon={List} width={20}></LucideIcon>
                                            </span>
                                            无序列表
                                        </div>
                                    </MenuItem>
                                </Menu>
                            </div>
                        ),
                    }}
                </Popover>
                
            </Teleport>
        ) : '';
    }
});
</script>

<style>
.actionDrag-popover .ant-popover-arrow {
    display: none !important;;
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
}

.actionDrag:hover {
    background: #eff0f1;
}
</style>