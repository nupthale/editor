import { ySyncPlugin, yCursorPlugin, yUndoPlugin } from 'y-prosemirror';

import { LOCAL_MODE } from '../../../doc';
import { sharedDoc } from './doc';
import { provider } from './core';

import './comment';

export * from './core';

export const collab = LOCAL_MODE ? [] : [
  ySyncPlugin(sharedDoc),
  yCursorPlugin(provider?.awareness!),
  yUndoPlugin(),
];