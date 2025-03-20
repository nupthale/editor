import { v4 as uuidv4 } from 'uuid';

import { schema } from '../../../schema/index';

export const enter = (state, dispatch, _view) => {
    const { $from } = state.selection;
    const tr = state.tr;

    if (
      $from.parent.type.name !== 'list_head'
    ) {
      return false;
    }

    const listNode = $from.node($from.depth - 1);

    if (!listNode) return false;

    tr.split($from.pos, 2, [{
        type: schema.nodes.list,
        attrs: {
            level: listNode.attrs.level,
            id: uuidv4(),
            parentId: listNode.attrs.parentId,
        },
    }]).scrollIntoView();

    dispatch?.(tr);

    return true;
}