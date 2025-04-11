import { Plugin, PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { showPopover$, hidePopover$ } from '../../event';
import { PopoverTypeEnum } from '../../interface';

export const bubbleMenuPluginKey = new PluginKey('bubbleMenu');

export const bubbleMenuPlugin = () => {
    return [
        new Plugin({
            key: bubbleMenuPluginKey,
            props: {
                handleDOMEvents: {
                    mousedown: (_view: EditorView, _event) => {
                        // 先隐藏
                        hidePopover$.next({ type: PopoverTypeEnum.BUBBLE_MENU });
                    },
                    mouseup: (view: EditorView, _event) => {
                        const { state } = view;
                        const { selection } = state;
                        const { empty, from, to } = selection;

                        // 如果选区为空，隐藏菜单
                        if (empty || from === to) {
                            hidePopover$.next({ type: PopoverTypeEnum.BUBBLE_MENU });
                            return false;
                        }

                        // 如果在title节点内， 则隐藏菜单
                        const node = state.doc.resolve(from).node();
                        if (node.type.name === 'title') {
                            hidePopover$.next({ type: PopoverTypeEnum.BUBBLE_MENU });
                            return false;
                        }

                         // 先隐藏，再展示
                         hidePopover$.next({ type: PopoverTypeEnum.BUBBLE_MENU });

                         // 触发显示气泡菜单
                         showPopover$.next({
                             type: PopoverTypeEnum.BUBBLE_MENU,
                             range: [from, to],
                         });

                        return true;
                    }
                }
            },
        })
    ];
}