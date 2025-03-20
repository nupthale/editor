import { Fragment } from 'prosemirror-model';
import { TextSelection } from 'prosemirror-state';

import { message } from 'ant-design-vue';

import { schema } from '../../../schema/index';
import { decorationKey } from './decoration';

const getListNode = (state) => {
    const { $from } = state.selection;

    if (
      $from.parent.type.name!== 'list_head'
    ) {
      return false;
    }

    return $from.node($from.depth - 1);
}

const getCurrentPos = (state) => {
    const { $from } = state.selection;
    return $from.before($from.depth - 1);
}

// 同一级找到上一个 list
const getPrevListNode = (state) => {
    const { $from } = state.selection;

    // 获取前一个节点的位置
    const currentListPos = getCurrentPos(state);
    const resolvedPrevPos = state.doc.resolve(currentListPos - 1);
    // 当前 list 节点的深度
    const currentDepth = $from.depth - 1;  // list 节点的深度
    const prevPos = resolvedPrevPos.before(resolvedPrevPos.depth);

    debugger;
    if (resolvedPrevPos.depth !== currentDepth) {
        return {
            prevPos,
            prevListNode: null,
        };
    }

    return {
        prevPos,
        prevListNode: resolvedPrevPos.node(),
    };
}

// 找父级的list
const getParentListNode = (state) => {
    const { $from } = state.selection;

    const node = $from.node($from.depth - 3);

    if (!node || node.type.name !== 'list') {
        return null;
    }

    return node;
}

export const increaseIndent = (state, dispatch, view) => {
    const listNode = getListNode(state);

    if (!listNode) return false;

    const currentListPos = getCurrentPos(state);
    const { prevListNode, prevPos } = getPrevListNode(state);

    const { tr } = state;
    const { $from } = state.selection;

    if (
        !prevListNode ||
        prevListNode.type.name !== 'list'
    ) {
        dispatch(tr.setMeta(decorationKey, {
            type: 'indent-max',
            pos: currentListPos,
            nodeSize: listNode.nodeSize,
            view,
        }));

        message.warning('当前块已达到最大层级');

        return true;
    }

    if (prevListNode.childCount > 1) {
        // 已有 body，直接移动到 body 末尾
        const bodyPos = prevPos + prevListNode.nodeSize - 2;

        tr.delete(currentListPos, currentListPos + listNode.nodeSize)
          .insert(bodyPos, listNode);
    } else {
        // 创建 body 并移动
        const newBody = schema.nodes.list_body.create(null, Fragment.from(listNode));
        const insertPos = prevPos + prevListNode.firstChild.nodeSize;
        // 计算当前光标相对于 listNode 开始位置的偏移量
        const relativePos = $from.pos - currentListPos;

        tr.delete(currentListPos, currentListPos + listNode.nodeSize)
          .insert(insertPos, newBody)
          .setSelection(TextSelection.create(tr.doc, insertPos + relativePos + 2));
    }

    dispatch?.(tr);

    return true;
}

// 找到上一层的list， 从上一层的list的body里移到上一层list后面
export const decreaseIndent = (state, dispatch, view) => {
    const listNode = getListNode(state);

    if (!listNode) return false;

    const parentListNode = getParentListNode(state);
    const currentListPos = getCurrentPos(state);

    if (!parentListNode) {
        return false;
    }

    const { $from } = state.selection;
    const { tr } = state;

    const parentStart = $from.before($from.depth - 3);
    const parentEnd = parentStart + parentListNode.nodeSize;

    tr.delete(currentListPos - 1, currentListPos + listNode.nodeSize);
    //   .insert(parentEnd, listNode);

    dispatch?.(tr);

    return true;
}