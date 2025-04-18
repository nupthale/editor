import { Schema } from 'prosemirror-model';
import { Plugin, PluginKey } from 'prosemirror-state';
import { CoderView } from './view';

export function coder(_schema: Schema): Plugin[] {
  return [
    new Plugin({
      key: new PluginKey('coder'),
      props: {
        nodeViews: {
          coder: (node, view, getPos) => {
            return new CoderView(node, view, getPos);
          }
        }
      }
    })
  ];
}