
import { Fragment } from 'prosemirror-model';
import { TextSelection } from 'prosemirror-state';

import { getPrevNodeRange, getDeepestContentEnd, getRangeByNode } from '../../../../shared';

export const removeText = (state, dispatch, _view) => {
  const { $from } = state.selection;
  const tr = state.tr;

  const textNode = $from.node($from.depth - 1);

  // 当光标位于head start，则去除text节点， 把head的文本放到上一个node的末尾， body的内容提升一层
  if (
    $from.parentOffset === 0
  ) {
      // head的文本内容
      const leftNodeContent = $from.node().children;
      // body node
      const bodyNode = textNode.children[1];
      
      const range = getRangeByNode(state, textNode);

      if (bodyNode?.children?.length) {
        tr.replaceRangeWith(
          range[0],
          range[1],
          bodyNode?.children,
        );
      } else {
        tr.deleteRange(
          range[0],
          range[1],
        );
      }

      const prevNodeRange = getPrevNodeRange(
        state.doc.resolve(
          $from.before($from.depth - 1) + 1
        )
      );
      
      const prevNodeEnd = getDeepestContentEnd(state.doc.resolve(prevNodeRange?.[0]! + 1));
      tr.insert(prevNodeEnd, Fragment.from(leftNodeContent));
      
      tr.setSelection(
        TextSelection.create(tr.doc, prevNodeEnd),
      );

      dispatch?.(tr);
      return true;
  }

  return false;
}

export const backspace = (state, dispatch, view) => {
    const { $from } = state.selection;

    if ($from.parent.type.name !== 'textBlock_head') return false;

    // 获取body的起始位置
    const bodyStart = $from.start(1);

    // 如果当前位置等于body的起始位置，则在文档开头
    if ($from.pos - 2 === bodyStart) {
      return true;
    }

    if (
      // 当光标位于head start，则去除text节点， 把head的文本放到上一个node的末尾， body的内容提升一层
      removeText(state, dispatch, view)
    ) {
      return true;
    }

    return false;
}