import { Plugin } from 'prosemirror-state';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap } from 'prosemirror-commands';

import { getPrevNode } from '../../shared/index';

import { focusAtEnd$ } from '../../event';

export function coreKeymapPlugin(): Plugin[] {
  return [
    keymap({
      Backspace: (state, _dispatch, _view) => {
        const { $from } = state.selection;

        const prevNode = getPrevNode(
          state.doc.resolve(
            $from.before($from.depth - 1) + 1
          )
        );

        // 在最开始位置了, 则移动到前一个节点最后
        if (
          $from.parentOffset === 0
        ) {
          if (prevNode?.type.name === 'coder') {
            focusAtEnd$.next({
              id: prevNode.attrs.id,
            });

            return true;
          }
        }

        return false;
      },
    })
  ];
}

export function baseKeymapPlugin(): Plugin[] {
  return [
    keymap(baseKeymap),
  ];
} 