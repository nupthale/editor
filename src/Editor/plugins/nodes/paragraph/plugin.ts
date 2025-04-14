import { Schema } from 'prosemirror-model';
import { Plugin, PluginKey } from 'prosemirror-state';
import { ParagraphView } from './view/index';
import { ParagraphHeadView } from './view/head';
import { ParagraphBodyView } from './view/body';

export function paragraph(_schema: Schema): Plugin[] {
  return [
    new Plugin({
      key: new PluginKey('paragraph'),
      props: {
        nodeViews: {
          paragraph_head: (node, view, getPos) => {
            return new ParagraphHeadView(node, view, getPos);
          },
          paragraph_body: (node, view, getPos) => {
            return new ParagraphBodyView(node, view, getPos);
          },
          paragraph: (node, view, getPos) => {
            return new ParagraphView(node, view, getPos);
          }
        }
      }
    })
  ];
}