
import { nanoid } from 'nanoid';
import { Fragment } from 'prosemirror-model';
import { TextSelection } from 'prosemirror-state';

import { decreaseIndent } from './indent';
import { getListBodyNodes, getRangeByPos, getPrevNodeRange, getDeepestContentEnd, getRangeByNode } from '../../../../shared';
import { schema } from '../../../schema/index';

export const removePseudo = (state, dispatch, _view) => {
  const { $from } = state.selection;
  const tr = state.tr;

  const listNode = $from.node($from.depth - 1);

  // 当光标位于开始位置
  if (
    $from.parentOffset === 0
  ) {
    const leftNodeContent = $from.node().children;

    // body node
    const bodyNode = listNode.children[1];
    const range = getRangeByNode(state, listNode);

    const newChildren = [schema.nodes.textBlock_head.create({}, leftNodeContent)];

    if (bodyNode?.children?.length) {
      newChildren.push(schema.nodes.textBlock_body.create({}, bodyNode?.children));
    }

    tr.replaceRangeWith(
      range[0],
      range[1],
      schema.nodes.textBlock.create({
        id: nanoid(8),
      }, newChildren),
    );
    
    tr.setSelection(
      TextSelection.create(tr.doc, range[0] + 2),
    );

    dispatch?.(tr);
    return true;
  }

  return false;
}

export const backspace = (state, dispatch, view) => {
    // 如果list-head内容删空了， 就改成textBlock
    const { $from } = state.selection;

    if ($from.parent.type.name !== 'list_head') return false;

    if (
      removePseudo(state, dispatch, view)
    ) {
      return true;
    }

    return false;
}