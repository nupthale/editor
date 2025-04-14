import { nanoid } from 'nanoid';

import { schema } from '../../../schema/index';
import { decreaseIndent } from './indent';
import { ListTypeEnum } from '../interface';

export const enter = (state, dispatch, view) => {
    const { $from } = state.selection;
    const tr = state.tr;
    
    if (
      $from.parent.type.name !== 'list_head'
    ) {
      return false;
    }

    const listNode = $from.node($from.depth - 1);

    if (!listNode) return false;

    const listHeadNode = $from.node();

    if (listHeadNode.textContent === '' && $from.depth - 3 > 0) {
      // doc -> body -> list -> list_head， 所以depth是3
      // if ($from.depth - 3 === 0) {
       
      //   backspace(state, dispatch, view);
      //   return true;
      // }

      return decreaseIndent(state, dispatch, view);
    }

    tr.split($from.pos, 2, [{
        type: schema.nodes.list,
        attrs: {
            level: listNode.attrs.level,
            id: nanoid(8),
            parentId: listNode.attrs.parentId,
            type: listNode.attrs.type as ListTypeEnum,
        },
    }]).scrollIntoView();

    dispatch?.(tr);

    return true;
}