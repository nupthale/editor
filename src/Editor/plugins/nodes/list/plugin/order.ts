import { Plugin, PluginKey } from 'prosemirror-state';
import { Node } from 'prosemirror-model';

import { contextStore } from '../../../../store/context';

export const listOrderKey = new PluginKey('list-order');

export type ListTreeType = {
    node: Node,
    children: ListTreeType[],
};

export type IndexMapType = {
    [key: string]: number[],
};

// 递归处理list节点
function processListNode(node) {
    // 如果是有序列表节点，保留它
    if (node.type.name !== 'list' || !node.attrs.ordered) {
        return null;
    }

    if (node.childCount === 1) {
       return {
            node,
            children: [],
       };
    }
    
    // 返回处理后的节点
    return {
        node,
        children: getLists(node.lastChild),
    };
}

export const getLists = (node) => {
    const lists: ListTreeType[] = [];
    node.children?.forEach((node) => {
        if (node.type.name === 'list' && node.attrs.ordered) {
            // 找到第一个有序列表
           const orderList = processListNode(node);

           if (orderList) {
                lists.push(orderList);
           }
        }
    });

    return lists;
}

const appendIndex = (lists: ListTreeType[], indexes: number[], indexMap: IndexMapType) => {
    lists?.forEach((list, index) => {
        const listId = list.node.attrs.id;
        indexes.push(index + 1);
        indexMap[listId] = [...indexes];

        if (list.children?.length) {
            appendIndex(list.children, indexes, indexMap);
        }

        indexes.pop();
    });
}

export const processBodyNodes = (body: Node) => {
    if (body?.childCount !== 2) return;

    const indexMap: IndexMapType = {};
    const lists = getLists(body.lastChild);
    appendIndex(lists, [], indexMap);

   
}


/**
 * doc是prosemirror的文档对象，根据文档的内容
 * 1. 过滤掉除了node名为list， 且attrs里包含ordered=true的所有节点， 并且保持原有的树形结构
 */
const updateOrderedListIndex = () => {
    const view = contextStore.getState().editorView;
    const doc = view?.state.doc;

    if (!doc || doc?.childCount !== 2) return;

    const indexMap: IndexMapType = {};
    const lists = getLists(doc.lastChild);
    appendIndex(lists, [], indexMap);

    contextStore.getState().setOrderedListMap(indexMap);
}

export const listOrderPlugin = new Plugin({
    key: listOrderKey,
    view: (_editorView) => {
        return {
            update(view, prevState) {
                if (view.state.doc === prevState.doc) {
                    // 文档未发生变化
                    return;
                }

                updateOrderedListIndex();
            },
            destroy() {
                console.log('destroy');
            }
        };
    }
});