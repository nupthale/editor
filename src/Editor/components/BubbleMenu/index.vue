<script lang="tsx">
import { defineComponent, ref, nextTick } from 'vue';
import { Selection } from 'prosemirror-state';
import { toggleMark } from 'prosemirror-commands';
import { MarkType } from 'prosemirror-model';
import { tap } from 'rxjs';
import { useSubscription } from '@vueuse/rxjs';
import domAlign from 'dom-align';
import { Bold, Italic, Strikethrough, Underline, Palette } from 'lucide';
import { Tooltip, Popover } from 'ant-design-vue';

import { schema } from '../../plugins/schema';
import LucideIcon from '../LucideIcon/index.vue';

import { contextStore } from '../../context';
import { showBubbleMenu$, hideBubbleMenu$ } from '../../event';

import ColorPalette from '../ColorPalette/index.vue';
import { useMarks } from './useMarks';
import { useColor } from './useColor';

export default defineComponent({
    setup() {
        const visibleRef = ref(false);

        const coordRef = ref<[number, number]>([0, 0]);
        const sourceRef = ref<HTMLElement | null>(null);
        const targetRef = ref<HTMLElement | null>(null);
        const selectionRef = ref<Selection | null>(null);

        const { updateMarks, marksRef } = useMarks();

        const { updateTextColor, updateBackgroundColor } = useColor(selectionRef);

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
            showBubbleMenu$.pipe(
                tap(({ x, y, selection }) => {
                    visibleRef.value = true;
                    selectionRef.value = selection;
                    coordRef.value = [x, y];

                    updateMarks(selection);

                    layout();
                }),
            ).subscribe()
        );

        useSubscription(
            hideBubbleMenu$.pipe(
                tap(() => {
                    hide();
                }),
            ).subscribe(),
        );

        const handleAction = (markType: MarkType) => {
            const editorView = contextStore.getState().editorView;
            if (!editorView) return;

            const { state, dispatch } = editorView;

            toggleMark(markType)(state, dispatch);

            hide();

            editorView.focus();
        }

        const renderMenus = () => {
            if (!visibleRef.value) return '';

            return (
                <ul class="menuItems flex items-center p-[8px]">
                    <li class={['menuItem', marksRef.value?.includes('strong') ? 'active' : '']} onClick={() => handleAction(schema.marks.strong)}>
                        <Tooltip title="加粗">
                            <LucideIcon icon={Bold} width={18}></LucideIcon>
                        </Tooltip>
                    </li>
                    <li class={['menuItem', marksRef.value?.includes('strikethrough') ? 'active' : '']} onClick={() => handleAction(schema.marks.strikethrough)}>
                        <Tooltip title="删除线">
                            <LucideIcon icon={Strikethrough} width={18}></LucideIcon>
                        </Tooltip>
                    </li>
                    <li class={['menuItem', marksRef.value?.includes('italic') ? 'active' : '']} onClick={() => handleAction(schema.marks.italic)}>
                        <Tooltip title="斜体">
                            <LucideIcon icon={Italic} width={18}></LucideIcon>
                        </Tooltip>
                    </li>
                    <li class={['menuItem', marksRef.value?.includes('underline') ? 'active' : '']} onClick={() => handleAction(schema.marks.underline)}>
                        <Tooltip title="下划线">
                            <LucideIcon icon={Underline} width={18}></LucideIcon>
                        </Tooltip>
                    </li>

                    <li class={['menuItem']} onClick={() => handleAction(schema.marks.underline)}>
                        <Popover trigger="hover">
                            {{
                                default: () => (
                                    <div>
                                        <LucideIcon icon={Palette} width={18}></LucideIcon>
                                    </div>
                                ),
                                content: () => (
                                    <ColorPalette
                                        onColor={(color) => updateTextColor(color)}
                                        onBackground={(color) => updateBackgroundColor(color)}
                                     />
                                )
                            }}
                        </Popover>
                    </li>
                </ul>
            );
        }

        return () => (
            <div>
                <div ref={targetRef} class="fixed" style={{ left: `${coordRef.value?.[0]}px`, top: `${coordRef.value?.[1]}px` }}></div>
                <div ref={sourceRef} class="bubbleMenu">
                    {renderMenus()}
                </div>
            </div>
        );
    }
});
</script>

<style>
.ant-popover .ant-popover-inner {
    box-shadow: none !important;
    border: none!important;
}

.ant-popover .ant-popover-arrow {
    display: none;
}
</style>

<style scoped>
.bubbleMenu {
    position: fixed;
    cursor: pointer;
}

.menuItems {
    border-radius: 6px;
    background: #fff;
    border: 1px solid #dee0e3;
    box-shadow: 0px 4px 8px #1f23291a;
    user-select: none;
}

.menuItem {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 4px;
    color: #2b2f36;

    margin-left: 8px;
}

.menuItem:first-of-type {
    margin-left: 0;
}

.menuItem.active {
    background: #e0e9ff;
    color: #336df4;
}

.menuItem:hover {
    background: #1f23291a;
}
</style>