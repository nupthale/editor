import { nanoid } from 'nanoid';

import { schema } from '../../../schema/index';
import { getRangeByPos } from '../../../../shared/index';
import { ListTypeEnum } from '../interface';

// 如果前面是数字. 就把当前paragarph 转换为 list
export const whitespace = (state, dispatch, _view) => {
    const { $from } = state.selection;
    const tr = state.tr;

    if (
      $from.parent.type.name !== 'textBlock_head'
    ) {
      return false;
    }

    const textBlock = $from.node();
    const content = textBlock.textContent;

    // content startWith 是数字. 就把当前paragarph 转换为 list
    if (/^\d+\.$/.test(content)) {
      const range = getRangeByPos($from);
      
      tr.replaceRangeWith(
        range[0], 
        range[1], 
        schema.nodes.list.create(
            {
                id: nanoid(8),
                type: ListTypeEnum.ORDERED,
            },
            schema.nodes.list_head.create(
                {
                    id: nanoid(8),
                },
            )
        )
      );

      dispatch?.(tr);
      return true;
    }

    return false;
}