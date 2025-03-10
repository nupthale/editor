/**
 * 输入一个数组， 结构如下：
 * [
 *  { attrs: { level: 1 }, content: [{ text: '标题1-1' }] }
 *  { attrs: { level: 3 }, content: [{ text: '标题3-1' }] }
 *  { attrs: { level: 4 }, content: [{ text: '标题4' }] }
 *  { attrs: { level: 3 }, content: [{ text: '标题3-2' }] }
 *  { attrs: { level: 1 }, content: [{ text: '标题1-2' }] }
 * ]， 转换返回一个树形结构如下:
 * [
 *  { 
 *      attrs: { level: 1 }, 
 *      content: [{ text: '标题1-1' }], 
 *      children: [
 *          { 
*               attrs: { level: 3 }, 
 *              content: [{ text: '标题3-1' }], 
 *              children: [
 *                  { 
 *                      attrs: { level: 4 }, 
 *                      content: [{ text: '标题4' }] 
 *                  }
*               ]
*           },
*           { 
*               attrs: { level: 3 }, 
*               content: [{ text: '标题3-2' }] 
*           },
 *     ]
 * },
 * { attrs: { level: 1 }, content: [{ text: '标题1-2' }] } 
 * ]
 */
interface Node {
    title: string;
    key: string;
    level: number;
    children?: Node[];
}

export const getText = (content) => {
    return content.reduce((acc, crt) => {
        return acc + crt.text;
    }, '');
}


export const toTree = (items) => {
    const tree: Node[] = [];
    const levelMap: { [key: number]: Node } = {};

    items.forEach(item => {
        if (item.type !=='heading') return;

        const title = getText(item.content);
        const newNode = { 
            title, 
            key: item.attrs.level,
            level: item.attrs.level, 
            children: [],
        };
        const level = item.attrs.level;

        // 如果是第一级节点，直接添加到树中
        if (level === 1) {
            tree.push(newNode);
            levelMap[level] = newNode; // 记录当前级别的节点
        } else {
            // 找到合适的父节点
            let parentNode: Node | null = null;

            // 从当前级别向上查找合适的父节点
            for (let i = level - 1; i > 0; i--) {
                if (levelMap[i]) {
                    parentNode = levelMap[i];
                    break;
                }
            }

            if (parentNode) {
                parentNode.children!.push(newNode); // 添加为父节点的子节点
            } else {
                // 如果没有找到合适的父节点，可能是顶级节点
                tree.push(newNode);
            }
        }

        // 更新 levelMap
        levelMap[level] = newNode; // 更新当前级别的节点
    });

    return tree;
}