
import { nanoid } from 'nanoid';
import { Fragment } from 'prosemirror-model';
import { TextSelection } from 'prosemirror-state';

import { decreaseIndent } from './indent';
import { getListBodyNodes, getRangeByPos, getPrevNodeRange, getDeepestContentEnd, getRangeByNode } from '../../../../shared';
import { schema } from '../../../schema/index';

export const hideIndex = (state, dispatch, _view) => {
  const { $from } = state.selection;
  const tr = state.tr;

  const listHeadNode = $from.node();
  const listNode = $from.node($from.depth - 1);

  // 当光标位于开始位置
  if (
    $from.parentOffset === 0
  ) {
    // 位于顶层， 且只有head， 没有list_body， 则直接转换为paragraph
    if ($from.depth === 3 && listNode.childCount === 1) {
      const leftNodeContent = $from.node().children;
      const range = getRangeByNode(state, listNode);

      tr.replaceRangeWith(
        range[0],
        range[1],
        schema.nodes.paragraph.create({
          id: nanoid(8),
        }, leftNodeContent),
      );
      
      tr.setSelection(
        TextSelection.create(tr.doc, range[0]),
      );

      dispatch?.(tr);
      return true;
    } else if (listHeadNode?.attrs?.showIndex) {
      // 否则， 只是隐藏序号展示
      tr.setNodeMarkup($from.pos - 1, undefined, {
        ...listHeadNode.attrs,
        showIndex: false,
      });
      dispatch?.(tr);
      return true;
    }
  }

  return false;
}

export const backspaceAtEdge = (state, dispatch, view) => {
  const { $from } = state.selection;
  const tr = state.tr;

  const listNode = $from.node($from.depth - 1);
  if (!listNode) return false;
  const listHeadNode = $from.node();
  
  // 当序号已被隐藏了， 并且光标位于head开始位置， 就decreaseIndent
  if (
    !listHeadNode?.attrs?.showIndex &&
    $from.start() === $from.pos
  ) {
      // 到达顶层
      if ($from.depth !== 3) {
        return decreaseIndent(state, dispatch, view);
      }
      
      // 到顶了后， 把listNode的body里的list， 放到顶层
      const bodyLists = getListBodyNodes(listNode);
      const listRange = getRangeByPos($from, 1);

      tr.delete(
        listRange[0],
        listRange[1],
      );

      tr.insert(
        listRange[0],
        Fragment.from(bodyLists),
      );

      // 把当前list_head里的内容， 全部放到上一个node的最后面， 然后定位光标到最后一个node的-listHead内容的位置
      const leftNodeContent = $from.node().children;

      const prevNodeRange = getPrevNodeRange(
        state.doc.resolve(
          $from.before($from.depth - 1) + 1
        )
      );

      if (!prevNodeRange) {
        return false;
      }

      const prevNodeEnd = getDeepestContentEnd(state.doc.resolve(prevNodeRange?.[0] + 1));
      
      if (leftNodeContent.length) {
        // 将leftText插入到prevNode的最后
        tr.insert(
          prevNodeEnd,
          leftNodeContent
        );
      }

      tr.setSelection(
        TextSelection.create(tr.doc, prevNodeEnd),
      );

      dispatch?.(tr);

      return true;
  }

  return false;
}

export const backspace = (state, dispatch, view) => {
    // 如果list-head内容删空了， 就改成paragraph
    const { $from } = state.selection;

    if ($from.parent.type.name !== 'list_head') return false;

    if ($from.start !== $from.end) return false;

    if (
      // 当内容为空， 且有序号展示， 就先把序号隐藏掉
      hideIndex(state, dispatch, view) ||
      // 当序号已被隐藏了， 并且光标位于head开始位置， 就decreaseIndent
      backspaceAtEdge(state, dispatch, view)
    ) {
      return true;
    }

    return false;
}