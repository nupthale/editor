import { ydoc, provider } from './core';
import { commentStore } from '../../store/comment';
import { CommentInfoType } from '../../interface';

// 创建专门的评论数据结构
const commentsDoc = ydoc.getMap('comments');

// 初始化评论数据
export const initComments = (initialDocComments: any, initialCommentInfoMap: any) => {
  // 只在首次初始化时设置
  if (!commentsDoc.get('docComments') && !commentsDoc.get('commentInfoMap')) {
    commentsDoc.set('docComments', initialDocComments);
    commentsDoc.set('commentInfoMap', initialCommentInfoMap);
  }
  
  // 初始同步到 store
  syncToLocal();
};

// 从 yjs 同步到 store
const syncToLocal = () => {
  const json = commentsDoc.toJSON();
  commentStore.getState().setComment(
    json.docComments || {}, 
    json.commentInfoMap || {}
  );
};

// 从 store 同步到 yjs
export const syncToRemote = (docComments, commentInfoMap) => {
  commentsDoc.set('docComments', docComments);
  commentsDoc.set('commentInfoMap', commentInfoMap);
};

// 监听远程变化
commentsDoc.observe(() => {
  syncToLocal();
});

// 在 provider 连接成功时同步一次
provider.on('sync', (synced: boolean) => {
  if (synced) {
    syncToLocal();
  }
});