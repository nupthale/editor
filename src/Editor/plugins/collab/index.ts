import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { ySyncPlugin, yCursorPlugin, yUndoPlugin } from 'y-prosemirror';

const ydoc = new Y.Doc()
const provider = new WebsocketProvider(
  'wss://demos.yjs.dev/ws', // 免费的测试服务器
  'haletest',    // 自定义文档ID
  ydoc
)

export const collab = [
  ySyncPlugin(ydoc.getXmlFragment('prosemirror')),
  yCursorPlugin(provider.awareness), // 添加光标同步
  yUndoPlugin(),                     // 添加协作撤销功能
]