
import { Fragment } from 'prosemirror-model';

import { decreaseIndent } from './indent';
import { getListBodyNodes, getRangeByPos, getPrevNodeRange, getDeepestContentEnd } from '../../../../shared';

import { schema } from '../../../schema/index';

export const hideIndex = (state, dispatch, view) => {
  const { $from } = state.selection;
  const tr = state.tr;

  const listHeadNode = $from.node();

  // 当内容为空， 且有序号展示， 就先把序号隐藏掉
  if (
    $from.parent.textContent === '' &&
    listHeadNode?.attrs?.showIndex
  ) {
    tr.setNodeMarkup($from.pos - listHeadNode.nodeSize + 1, undefined, {
      ...listHeadNode.attrs,
      showIndex: false,
    });

    dispatch?.(tr);
    return true;
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
      
      if (prevNodeRange && leftNodeContent.length) {
        const prevNodeEnd = getDeepestContentEnd(state.doc.resolve(prevNodeRange?.[0] + 1));

        // 将leftText插入到prevNode的最后
        tr.insert(
          prevNodeEnd,
          schema.text(leftNodeContent?.[0]?.textContent),
          // Fragment.from(leftNodeContent)
        );
      }
      // tr.setSelection(
      //   TextSelection.create(tr.doc, listRange[0]),
      // );

      dispatch?.(tr);

      return true;
  }

  return false;
}

export const backspace = (state, dispatch, view) => {
    // 如果list-head内容删空了， 就改成paragraph
    const { $from } = state.selection;

    if ($from.parent.type.name !== 'list_head') return false;

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