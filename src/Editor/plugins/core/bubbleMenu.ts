import { Plugin, PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { showBubbleMenu$, hideBubbleMenu$ } from '../../event';

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
                            hideBubbleMenu$.next();
                            return;
                        }

                        // 获取选区的 DOM 范围
                        const start = view.coordsAtPos(from);
                        const end = view.coordsAtPos(to);

                        // 计算选区的中心位置
                        const centerX = (start.left + end.right) / 2;
                        const centerY = start.top;

                        // 先隐藏，再展示
                        hideBubbleMenu$.next();

                        // 触发显示气泡菜单
                        showBubbleMenu$.next({
                            x: centerX,
                            y: centerY,
                            selection,
                        });
                    }
                };
            },
        })
    ];
}