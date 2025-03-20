import { Plugin, PluginKey, TextSelection } from 'prosemirror-state';
import { keymap } from 'prosemirror-keymap';
import { Node, Fragment } from 'prosemirror-model';
import { v4 as uuidv4 } from 'uuid';

import { schema } from '../../../schema/index';

import { ListView } from '../view/index';
import { ListHeadView } from '../view/head';
import { ListBodyView } from '../view/body';

import { increaseIndent, decreaseIndent } from './indent';
import { decorationPlugin } from './decoration';

const pluginKey = new PluginKey('list');

export const list = () => {
  return [
    decorationPlugin,
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
      Enter: (state, dispatch, _view) => {
        const { $from } = state.selection;
        const tr = state.tr;

        if (
          $from.parent.type.name !== 'list_head'
        ) {
          return false;
        }

        const listNode = $from.node($from.depth - 1);

        if (!listNode) return false;

        // 检查是否已有 body
        const hasBody = listNode.childCount > 1;

        if (hasBody) {

        } else {
          // 分割节点
          tr.split($from.pos, 2, [{
            type: schema.nodes.list,
            attrs: {
              level: listNode.attrs.level,
              id: uuidv4(),
              parentId: listNode.attrs.parentId,
            },
          }]).scrollIntoView();

        }

        dispatch?.(tr);

        return true;
      }
    })
  ];
};