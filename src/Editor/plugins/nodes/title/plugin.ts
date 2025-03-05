import { Schema } from 'prosemirror-model';
import { Plugin, PluginKey } from 'prosemirror-state';
import { TitleView } from './view';

export function title(schema: Schema): Plugin[] {
  return [
    new Plugin({
      key: new PluginKey('title'),
      props: {
        nodeViews: {
          title: (node, view) => {
            return new TitleView(node, view);
          }
        }
      }
    })
  ];
}