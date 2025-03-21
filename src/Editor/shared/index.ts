import { Node, ResolvedPos, Fragment } from 'prosemirror-model';

export const getRangeByNode = (state, node: Node) => {
    // 根据node获取node的range
    let from = 0;
    let to = 0;

    state.doc.descendants((childNode, pos) => {
        if (childNode.eq(node)) {
            from = pos;
            to = pos + childNode.nodeSize;
            return false;
        }
    });
    
    return [from, to];
}

export const getRangeByPos = ($pos: ResolvedPos, depthOffset = 0) => {
    // 根据pos获取node的range
    const start = $pos.before($pos.depth - depthOffset);
    const end = $pos.after($pos.depth - depthOffset);
    return [start, end];
}

export const getContentRangeByPos = ($pos: ResolvedPos, depthOffset = 0) => {
    // 根据pos获取node的range
    const start = $pos.start($pos.depth - depthOffset);
    const end = $pos.end($pos.depth - depthOffset);
    return [start, end];
}

export const getListBodyNodes = (list: Node) => {
    // 根据list， 获取list的body里的子list

    if (
        list.type.name !== 'list' ||
        list.childCount !== 2
    ) return null;

    const listBody = list.child(1);

    return listBody.children || [];
}

// 同一级的前一个节点
export const getPrevNode = ($pos: ResolvedPos) => {
    // 获取当前节点在当前深度的索引
   const index = $pos.index($pos.depth - 1);
    
   if (index === 0) return null;  // 如果是第一个节点，没有前一个节点

   // 获取父节点
   const parent = $pos.node($pos.depth - 1);
   // 获取前一个同级节点
   return parent.child(index - 1);
}

export const getPrevNodeResolvedPos = ($pos: ResolvedPos) => {
    const prevNode = getPrevNode($pos);

    if (!prevNode) return null;

    const depth = $pos.depth;
    const prevNodeStart = $pos.before(depth) - prevNode.nodeSize;
    
    return $pos.doc.resolve(prevNodeStart + 1);
}

export const getPrevNodeRange = ($pos: ResolvedPos) => {
    const resolvedPrevPos = getPrevNodeResolvedPos($pos);

    if (!resolvedPrevPos) return null;

    return [resolvedPrevPos.before(), resolvedPrevPos.after()];
}

export const getDeepestContentEnd = ($pos: ResolvedPos) => {
     // 使用迭代而非递归，避免栈溢出
     let currentPos = $pos;
     let currentNode = currentPos.node();
     let depth = currentPos.depth;
     
     // 循环查找最深层级的节点
     while (!currentNode.isText && currentNode.content.size > 0) {
         const lastChild = currentNode.lastChild;
         if (!lastChild) break;
         
         // 计算最后一个子节点的位置
         const childStart = currentPos.end(depth) - lastChild.nodeSize + 1;
         
         try {
             // 更新当前位置到子节点
             currentPos = $pos.doc.resolve(childStart);
             currentNode = lastChild;
             depth = currentPos.depth;
         } catch (e) {
             // 如果解析位置出错，直接返回当前位置的结束位置
             break;
         }
     }
     
     debugger;
     // 返回找到的最深层节点的内容结束位置
     return currentPos.end(depth);
}

export const getParentNode = ($pos: ResolvedPos, depthOffset = 1) => {
    return $pos.node($pos.depth - depthOffset);
}