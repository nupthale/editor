import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

export const ydoc = new Y.Doc();
// export const provider = new WebrtcProvider('prosemirror-editor-room', ydoc, {
//   signaling: [
//     'ws://localhost:3000',
//     // 'wss://y-webrtc-signaling-us.herokuapp.com',
//     // 'wss://y-webrtc-signaling-eu.herokuapp.com',
//     // 'wss://signaling.yjs.dev',
//     // 'wss://y-webrtc-signaling.fly.dev',
//     // 'wss://signaling.hocuspocus.dev',
//     // 'wss://y-webrtc-signaling-global.herokuapp.com',
//   ],
//   maxConns: 20,
//   filterBcConns: true
// });

export const provider = new WebsocketProvider(
  // 'ws://localhost:3000',
  // 'wss://editor-lh7.pages.dev:3000',
  'wss://editor-server.hale1211.workers.dev',
  'prosemirror-editor-room-hale-dicm1l',
  ydoc
);