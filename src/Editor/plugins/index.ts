import { Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { keymapPlugin } from './core/keymap';
import { history } from './core/history';
import { bubbleMenuPlugin } from './core/bubbleMenu';
import { title } from './nodes/title/plugin';
import { paragraph } from './nodes/paragraph/plugin';
import { heading } from './nodes/heading/plugin';


// 导入更多插件...

// 集中注册所有插件
export function plugins(schema: Schema): Plugin[] {
  return [
    ...keymapPlugin(),
    ...history(),
    ...bubbleMenuPlugin(),
    ...title(schema),
    ...paragraph(schema),
    ...heading(schema),
    // 添加更多插件...
  ];
}