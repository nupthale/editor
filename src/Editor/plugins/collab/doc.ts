import { prosemirrorToYXmlFragment } from 'y-prosemirror';

import { schema } from '../schema/index';
import { doc } from '../../../doc';

import { ydoc, provider } from './core';

// 创建初始文档
const initialDoc = schema.node('doc', null, doc);

// y-prosemirror 内部默认使用 'prosemirror' 作为命名空间， 不能随便改
const namespace = 'prosemirror';

export const sharedDoc = ydoc.getXmlFragment(namespace);


// 添加初始化逻辑
provider.on('status', ({ status }) => {
  console.log('WebRTC 连接状态:', status, '文档长度:', sharedDoc.length);
  
  /**
   * 在协同编辑中， sharedDoc 在以下情况下会是空的：
   * 1. 当你是第一个连接到这个房间的用户时，因为还没有任何人创建或编辑过文档
   * 2. 当服务器上没有保存这个房间的历史数据时
   * 3. 当房间刚刚被创建，还没有任何内容被同步时
   * 而在以下情况下 sharedDoc 不会是空的：
   * 1. 当你不是第一个连接到房间的用户，前面已经有人初始化了文档
   * 2. 当你重新连接到一个已经有内容的房间时
   * 3. 当服务器上保存了这个房间的历史数据，并且在连接时已经同步到了本地
   * 简单来说， sharedDoc.length === 0 检查的是当前协同文档是否为空，如果为空则需要初始化，如果不为空则说明已经有内容了，不需要再初始化。
   */
  if (status === 'connected' && sharedDoc.length === 0) {
    try {
      console.log('开始初始化协同文档...', prosemirrorToYXmlFragment, initialDoc);
      // 第一次空的时候， 可以初始化到服务器， 后端服务器有了， 就不需要本地初始化了
      // prosemirrorToYXmlFragment(initialDoc, sharedDoc);
    } catch (err) {
      console.error('初始化文档失败:', err);
    }
  }
});

// 监听文档变化
sharedDoc.observe(event => {
  console.log('文档变化:', event);
});

// setTimeout(() => {
// prosemirrorToYXmlFragment(initialDoc, sharedDoc);
// }, 300);