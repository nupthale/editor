import { Plugin, PluginKey } from 'prosemirror-state';

import { TableView } from '../view/table';
import { TableRowView } from '../view/row';
import { TableCellView } from '../view/cell';

const pluginKey = new PluginKey('table');

export const table = () => {
  return [
    new Plugin({
      key: pluginKey,
      
      props: {
        nodeViews: {
          table: (node, view, getPos) => {
            return new TableView(node, view, getPos);
          },
          table_row: (node, view, getPos) => {
            return new TableRowView(node, view, getPos);
          },
          table_cell: (node, view, getPos) => {
            return new TableCellView(node, view, getPos);
          }
        },
      }
    }),
  ];
};