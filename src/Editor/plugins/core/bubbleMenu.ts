import { Plugin, PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { showPopover$, hidePopover$ } from '../../event';
import { PopoverTypeEnum } from '../../interface';

export const bubbleMenuPluginKey = new PluginKey('bubbleMenu');

export const bubbleMenuPlugin = () => {
    return [
        new Plugin({
            key: bubbleMenuPluginKey,
            
            view(editorView: EditorView) {
                return {
                    update: (view, prevState) => {
                        const { state } = view;
                        const { selection } = state;
                        const { empty, from, to } = selection;

                        // 如果选区为空，隐藏菜单
                        if (empty || from === to) {
                            hidePopover$.next({ type: PopoverTypeEnum.BUBBLE_MENU });
                            return;
                        }

                        // 先隐藏，再展示
                        hidePopover$.next({ type: PopoverTypeEnum.BUBBLE_MENU });

                        // 触发显示气泡菜单
                        showPopover$.next({
                            type: PopoverTypeEnum.BUBBLE_MENU,
                            range: [from, to],
                        });
                    }
                };
            },
        })
    ];
}