<script lang="tsx">
import { defineComponent } from 'vue';
import { toggleMark } from 'prosemirror-commands';
import { MarkType } from 'prosemirror-model';
import { tap, filter } from 'rxjs';
import { useSubscription } from '@vueuse/rxjs';
import { Bold, Italic, Strikethrough, Underline, Palette, MessageSquareText } from 'lucide';
import { Tooltip, Popover as AntdPopover } from 'ant-design-vue';

import Popover from '../Popover/index.vue';
import { schema } from '../../plugins/schema';
import LucideIcon from '../LucideIcon/index.vue';

import { contextStore } from '../../context';
import { showPopover$ } from '../../event';
import { PopoverTypeEnum } from '../../interface';

import ColorPalette from '../ColorPalette/index.vue';
import { useMarks } from './useMarks';
import { useColor } from './useColor';
import { useComment } from './useComment';

export default defineComponent({
    setup() {

        const { updateMarks, marksRef } = useMarks();

        const { updateTextColor, updateBackgroundColor } = useColor();

        const { handleComment } = useComment();

        useSubscription(
            showPopover$.pipe(
                filter(({ type }) => type === PopoverTypeEnum.BUBBLE_MENU),
                tap(() => {
                    updateMarks();
                }),
            ).subscribe()
        );

        const handleAction = (markType: MarkType) => {
            const editorView = contextStore.getState().editorView;
            if (!editorView) return;

            const { state, dispatch } = editorView;

            toggleMark(markType)(state, dispatch);

            editorView.focus();
        }

        const renderMenus = () => {
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
                        <AntdPopover trigger="hover" >
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
                        </AntdPopover>
                    </li>

                    <li class={['menuItem']} onClick={() => handleComment()}>
                        <Tooltip title="评论">
                            <LucideIcon icon={MessageSquareText} width={18}></LucideIcon>
                        </Tooltip>
                    </li>

                </ul>
            );
        }

        return () => (
            <Popover type={PopoverTypeEnum.BUBBLE_MENU}>
                {{
                    default: () => (
                        renderMenus()
                    )
                }}
            </Popover>
        );
    }
});
</script>

<style>

.ant-popover .ant-popover-arrow {
    display: none;
}
</style>

<style scoped>

.menuItems {
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