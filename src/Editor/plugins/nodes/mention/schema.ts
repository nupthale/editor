import { NodeSpec } from 'prosemirror-model';

import { MentionTypeEnum } from '../../../interface';

export const mentionSchema: Record<string, NodeSpec> = {
    mention: {
      inline: true,
      group: "inline",
      attrs: {
        type: { default: MentionTypeEnum.USER },
        info: { default: {} },
      },
      parseDOM: [{ 
        tag: "span", 
        attrs: {
          class: "doc-mention",
        } 
      }],
    },
  };