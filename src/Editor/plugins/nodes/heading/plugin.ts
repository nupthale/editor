import { Schema } from 'prosemirror-model';
import { Plugin, PluginKey } from 'prosemirror-state';
import { HeadingView } from './view';

export function heading(schema: Schema): Plugin[] {
  return [
    new Plugin({
      key: new PluginKey('heading'),
      props: {
        nodeViews: {
          heading: (node, view, getPos) => {
            return new HeadingView(node, view, getPos);
          }
        }
      }
    })
  ];
}