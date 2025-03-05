import { Schema } from 'prosemirror-model';
import { toggleMark } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { Plugin } from 'prosemirror-state';

export function bold(schema: Schema): Plugin[] {
  return [
    keymap({
      'Mod-b': toggleMark(schema.marks.strong)
    })
  ];
} 