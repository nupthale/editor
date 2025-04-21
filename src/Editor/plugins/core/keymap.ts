import { Plugin, NodeSelection, TextSelection } from 'prosemirror-state';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap } from 'prosemirror-commands';

import { getPrevNode, getRangeByNode } from '../../shared/index';

import { focusAtEnd$, selectBlock$ } from '../../event';

export function coreKeymapPlugin(): Plugin[] {
  return [
    keymap({
      Backspace: (state, dispatch, _view) => {
        const { $from } = state.selection;
        const tr = state.tr;

        if ($from.depth <= 1) {
          return false;
        }

        const prevNode = getPrevNode(
          state.doc.resolve(
            $from.before($from.depth - 1) + 1
          )
        );

        // 在最开始位置了, 则移动到前一个节点最后
        if (
          $from.parentOffset === 0 && prevNode
        ) {
          const prevName = prevNode?.type.name;

          if (prevName === 'coder') {
            focusAtEnd$.next({
              id: prevNode.attrs.id,
            });

            return true;
          }

          if (['image', 'video'].includes(prevName)) {
            const prevPos = getRangeByNode(state, prevNode);

            selectBlock$.next({
              id: prevNode.attrs.id,
            });

            // 光标定位到video和image
            tr.setSelection(
              TextSelection.create(
                state.doc,
                prevPos[1],
              ),
            );

            dispatch?.(tr);

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