import { Schema } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
import { coreKeymapPlugin, baseKeymapPlugin } from './core/keymap';
import { history } from './core/history';
import { copyPastePlugin } from './core/copyPaste';
import { bubbleMenuPlugin } from './core/bubbleMenu';
import { title } from './nodes/title/plugin';
import { textBlock } from './nodes/textBlock/plugin';
import { header } from './nodes/header/plugin/index';

import { mention } from './nodes/mention/plugin';
import { highlight } from './nodes/highlight/plugin';

import { list } from './nodes/list/plugin/index';
import { table } from './nodes/table/plugin/index';
import { image } from './nodes/image/plugin';
import { video } from './nodes/video/plugin';
import { coder } from './nodes/coder/plugin/index';

import { collab } from './collab/index';

// 导入更多插件...

// 集中注册所有插件
export function plugins(schema: Schema): Plugin[] {
  return [
    ...coreKeymapPlugin(), // 优先级最高，必须在最前面
    ...history(),
    ...copyPastePlugin(),
    ...bubbleMenuPlugin(),
    ...title(schema),
    ...textBlock(schema),
    ...header(schema),
    // 添加更多插件...
    ...mention(schema),
    ...highlight(schema),
    ...list(),
    ...table(),
    ...image(),
    ...video(),
    ...coder(),

    // 优先级最低
    ...baseKeymapPlugin(),

    ...collab,
  ];
}