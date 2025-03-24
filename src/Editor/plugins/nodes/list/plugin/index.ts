import { Plugin, PluginKey } from 'prosemirror-state';
import { keymap } from 'prosemirror-keymap';

import { ListView } from '../view/index';
import { ListHeadView } from '../view/head';
import { ListBodyView } from '../view/body';

import { increaseIndent, decreaseIndent } from './indent';
import { enter } from './enter';
import { backspace } from './backspace';
import { decorationPlugin } from './decoration';
import { listOrderPlugin } from './order';

const pluginKey = new PluginKey('list');

export const list = () => {
  return [
    decorationPlugin,
    listOrderPlugin,
    new Plugin({
      key: pluginKey,
      
      props: {
        nodeViews: {
          list: (node, view, getPos) => {
            return new ListView(node, view, getPos);
          },
          list_head: (node, view, getPos) => {
            return new ListHeadView(node, view, getPos);
          },
          list_body: (node, view, getPos) => {
            return new ListBodyView(node, view, getPos);
          }
        },
        decorations(state) {
          return this.getState(state);
        },
      }
    }),
    keymap({
      'Shift-Tab': (state, dispatch, view) => {
        return decreaseIndent(state, dispatch, view);
      },
      Tab: (state, dispatch, view) => {
        return increaseIndent(state, dispatch, view);
      },
      Enter: (state, dispatch, view) => {
        return enter(state, dispatch, view);
      },
      Backspace: (state, dispatch, view) => {
        return backspace(state, dispatch, view);
      }
    })
  ];
};