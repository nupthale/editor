import { Schema } from 'prosemirror-model';
import { Plugin, PluginKey } from 'prosemirror-state';
import { ImageView } from './view';

export function image(_schema: Schema): Plugin[] {
  return [
    new Plugin({
      key: new PluginKey('image'),
      props: {
        nodeViews: {
          image: (node, view, getPos) => {
            return new ImageView(node, view, getPos);
          }
        }
      }
    })
  ];
}