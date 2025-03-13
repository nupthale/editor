import { Schema } from 'prosemirror-model';
import { Plugin, PluginKey } from 'prosemirror-state';
import { MentionView } from './view';

import { showPopover$ } from '../../../event';
import { PopoverTypeEnum } from '../../../interface';

export function mention(schema: Schema): Plugin[] {
  return [
    new Plugin({
      key: new PluginKey('mention'),
      props: {
        nodeViews: {
          mention: (node, view) => {
            return new MentionView(node, view);
          }
        },
        handleKeyDown: (view, event) => {
          if (event.key === '@') {
              const { state } = view;
              const { selection } = state;
              const { from } = selection;
  
              // 获取@符号的位置
              const pos = view.coordsAtPos(from);
  
              // 触发显示选择菜单
              showPopover$.next({
                  x: pos.right,
                  y: pos.top,
                  type: PopoverTypeEnum.MENTION,
              });
          }
          return false;
        },
      }
    })
  ];
}