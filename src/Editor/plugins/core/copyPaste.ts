import { Plugin } from 'prosemirror-state';
import { Node } from 'prosemirror-model';

export const copyPastePlugin = () => {
    return [new Plugin({
        props: {
            clipboardTextSerializer: (slice) => {
                let text = '';

                 // 递归处理节点及其内容
                 const processNode = (node) => {
                    if (node.type.name === 'mention') {
                        text += `@${node.attrs?.name || ''}`;
                    } else if (node.isText) {
                        text += node.text;
                    } else if (node.content && node.content.size > 0) {
                        // 处理有子内容的节点
                        node.content.forEach(childNode => {
                            processNode(childNode);
                        });
                        
                        // 如果是块级节点，添加换行符
                        if (node.isBlock && !node.type.name.includes('title')) {
                            text += '\n';
                        }
                    }
                };

                // 处理顶层节点
                slice.content.forEach(topNode => {
                    processNode(topNode);
                });

                return text;
            },
            // paste的时候 ， 需要判断， 如果是在空textBlock里paste的， 就把textBlock节点替换为当前节点
            // 如果不是空的， 需要判断， 如果是文本， 就把文本插入， 如果不是文本，就插入一个块。
            handlePaste: (view, _event, slice) => {
                const { state, dispatch } = view;
                const { selection } = state;

                // 检查当前节点是否为空的 textBlock
                const $from = selection.$from;
                const node = $from.node();
                const nodeIsEmpty = node.type.name === 'textBlock' && node.content.size === 0;

                // title 和body不可替换， 所以要判断下$from.depth > 0
                if (nodeIsEmpty && $from.depth > 0) {
                    // 获取粘贴内容的第一个节点
                    let firstNode: Node | null = null;
                    slice.content.forEach(n => {
                        if (!firstNode && n.isBlock) {
                            firstNode = n;
                        }
                    });

                    if (firstNode) {
                        // 替换当前节点
                        const tr = state.tr;
                        const pos = $from.before($from.depth);
                        tr.replaceWith(pos, pos + node.nodeSize, firstNode);

                        dispatch(tr);
                        return true;    
                    }
                    
                }

                return false;
            }
        }
    })];
};