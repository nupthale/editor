import { Schema } from 'prosemirror-model';
import { toggleMark } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { Plugin } from 'prosemirror-state';

export function italic(schema: Schema): Plugin[] {
  return [
    keymap({
      'Mod-i': toggleMark(schema.marks.em)
    })
  ];
} 