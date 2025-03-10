import { Schema } from 'prosemirror-model';
import { Plugin, PluginKey } from 'prosemirror-state';
import { ParagraphView } from './view';

export function paragraph(schema: Schema): Plugin[] {
  return [
    new Plugin({
      key: new PluginKey('paragraph'),
      props: {
        nodeViews: {
          paragraph: (node, view, getPos) => {
            return new ParagraphView(node, view, getPos);
          }
        }
      }
    })
  ];
}