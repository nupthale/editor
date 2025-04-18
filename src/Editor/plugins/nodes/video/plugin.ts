import { Schema } from 'prosemirror-model';
import { Plugin, PluginKey } from 'prosemirror-state';
import { VideoView } from './view';

export function video(_schema: Schema): Plugin[] {
  return [
    new Plugin({
      key: new PluginKey('video'),
      props: {
        nodeViews: {
          video: (node, view, getPos) => {
            return new VideoView(node, view, getPos);
          }
        }
      }
    })
  ];
}