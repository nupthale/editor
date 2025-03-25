import { Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { keymapPlugin } from './core/keymap';
import { history } from './core/history';
import { copyPastePlugin } from './core/copyPaste';
import { bubbleMenuPlugin } from './core/bubbleMenu';
import { title } from './nodes/title/plugin';
import { paragraph } from './nodes/paragraph/plugin';
import { heading } from './nodes/heading/plugin';

import { mention } from './nodes/mention/plugin';
import { highlight } from './nodes/highlight/plugin';

import { list } from './nodes/list/plugin/index';
import { table } from './nodes/table/plugin/index';

// 导入更多插件...

// 集中注册所有插件
export function plugins(schema: Schema): Plugin[] {
  return [
    ...history(),
    ...copyPastePlugin(),
    ...bubbleMenuPlugin(),
    ...title(schema),
    ...paragraph(schema),
    ...heading(schema),
    // 添加更多插件...
    ...mention(schema),
    ...highlight(schema),
    ...list(),
    ...table(),

    // 优先级最低
    ...keymapPlugin(),
  ];
}