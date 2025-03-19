import { Plugin, PluginKey } from 'prosemirror-state';
import { orderListNumberCache } from './cache';
import { OrderedListView } from './listView';
import { ItemView } from './itemView';

const orderedListPluginKey = new PluginKey('orderedList');

export const orderedList = () => {
  return [
    new Plugin({
      key: orderedListPluginKey,
      
      // 当文档变化时，更新序号缓存
      appendTransaction(transactions, _oldState, newState) {
        if (true) {
          // 标记缓存需要更新
          orderListNumberCache.markDirty();
          
          // 如果需要，可以在这里触发一个空的 transaction 来强制视图更新
          return newState.tr;
        }
        
        return null;
      },
      
      props: {
        // 在每次渲染前更新序号缓存
        decorations(state) {
          if (orderListNumberCache.isDirty()) {
            // 重新计算所有序号
            debugger;
            updateAllListNumbers(state);
            orderListNumberCache.clearDirty();
          }
          return null;
        },
        
        nodeViews: {
          ordered_list: (node, view, getPos) => {
            return new OrderedListView(node, view, getPos);
          },
          ordered_list_item: (node, view, getPos) => {
            return new ItemView(node, view, getPos);
          }
        }
      }
    })
  ];
};

// 更新所有列表序号
function updateAllListNumbers(state) {
  // 清空缓存
  orderListNumberCache.clear();
  
  // 遍历文档中的所有列表和列表项
  const listStructure = new Map(); // 存储列表结构：parentId -> [childIds]
  const listStartValues = new Map(); // 存储列表起始值：listId -> startValue
  
  // 第一遍：收集所有列表和列表项的结构信息
  state.doc.descendants((node, pos) => {
    if (node.type.name === 'ordered_list') {
      const id = node.attrs.id;
      listStartValues.set(id, node.attrs.start || 1);
      
      // 找到父列表
      const $pos = state.doc.resolve(pos);
      for (let i = $pos.depth - 1; i >= 0; i--) {
        const parent = $pos.node(i);
        if (parent.type.name === 'ordered_list') {
          const parentId = parent.attrs.id;
          if (!listStructure.has(parentId)) {
            listStructure.set(parentId, []);
          }
          listStructure.get(parentId).push(id);
          break;
        }
      }
    } else if (node.type.name === 'ordered_list_item') {
      const id = node.attrs.id;
      
      // 找到父列表
      const $pos = state.doc.resolve(pos);
      for (let i = $pos.depth - 1; i >= 0; i--) {
        const parent = $pos.node(i);
        if (parent.type.name === 'ordered_list') {
          const parentId = parent.attrs.id;
          if (!listStructure.has(parentId)) {
            listStructure.set(parentId, []);
          }
          listStructure.get(parentId).push(id);
          break;
        }
      }
    }
    return true;
  });
  
  // 第二遍：计算并缓存所有序号
  calculateListNumbers(listStructure, listStartValues);
}

// 递归计算列表序号
function calculateListNumbers(listStructure, listStartValues, parentId = null, parentNumber = '') {
  if (!parentId) {
    // 处理顶级列表
    for (const [listId, children] of listStructure.entries()) {
      if (!isChildOfAnyList(listId, listStructure)) {
        const startValue = listStartValues.get(listId) || 1;
        processListItems(listId, children, startValue, '', listStructure, listStartValues);
      }
    }
  } else {
    // 处理子列表
    const children = listStructure.get(parentId) || [];
    const startValue = listStartValues.get(parentId) || 1;
    processListItems(parentId, children, startValue, parentNumber, listStructure, listStartValues);
  }
}

// 处理列表项
function processListItems(listId, items, startValue, parentNumber, listStructure, listStartValues) {
  items.forEach((itemId, index) => {
    const number = startValue + index;
    const fullNumber = parentNumber ? `${parentNumber}.${number}` : `${number}`;
    
    // 缓存序号
    orderListNumberCache.setNumber(itemId, fullNumber);
    
    // 递归处理子列表
    if (listStructure.has(itemId)) {
      calculateListNumbers(listStructure, listStartValues, itemId, fullNumber);
    }
  });
}

// 检查列表是否是其他列表的子列表
function isChildOfAnyList(listId, listStructure) {
  for (const children of listStructure.values()) {
    if (children.includes(listId)) {
      return true;
    }
  }
  return false;
}