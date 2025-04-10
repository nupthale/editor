import { Schema } from 'prosemirror-model';
import { Plugin, PluginKey } from 'prosemirror-state';
import { HighlightView } from './view';

export function highlight(_schema: Schema): Plugin[] {
  return [
    new Plugin({
      key: new PluginKey('highlight'),
      props: {
        nodeViews: {
          highlight: (node, view, getPos) => {
            return new HighlightView(node, view, getPos);
          }
        }
      }
    })
  ];
}