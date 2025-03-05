import { history as historyPlugin, undo, redo } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { Plugin } from 'prosemirror-state';

export function history(): Plugin[] {
  return [
    historyPlugin(),
    keymap({
      'Mod-z': undo,
      'Mod-y': redo,
      'Shift-Mod-z': redo
    })
  ];
} 