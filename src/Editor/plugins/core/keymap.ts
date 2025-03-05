import { Plugin } from 'prosemirror-state';
import { keymap } from 'prosemirror-keymap';
import { baseKeymap } from 'prosemirror-commands';

export function keymapPlugin(): Plugin[] {
  return [
    keymap(baseKeymap)
    // 可以添加更多自定义快捷键
  ];
} 