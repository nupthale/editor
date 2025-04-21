import { Plugin, PluginKey } from 'prosemirror-state';

import { CoderView } from '../view';

export const coder = () => {
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
    }),
  ];
};