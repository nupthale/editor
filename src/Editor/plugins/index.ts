import { Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { keymapPlugin } from './core/keymap';
import { history } from './core/history';
import { bold } from './formatting/bold';
import { italic } from './formatting/italic';
import { title } from './nodes/title/plugin';

// 导入更多插件...

// 集中注册所有插件
export function plugins(schema: Schema): Plugin[] {
  return [
    ...keymapPlugin(),
    ...history(),
    ...bold(schema),
    ...italic(schema),
    ...title(schema),
    // 添加更多插件...
  ];
}