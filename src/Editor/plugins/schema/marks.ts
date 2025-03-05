import { MarkSpec } from 'prosemirror-model';
import { marks as basicMarks } from 'prosemirror-schema-basic';

export const marks: Record<string, MarkSpec> = {
  // 使用基础标记
  ...basicMarks,
  
  // 自定义标记
  // 例如，可以添加下划线标记
  underline: {
    parseDOM: [{tag: "u"}, {style: "text-decoration=underline"}],
    toDOM() { return ["u", 0] }
  },
  
  // 添加更多自定义标记...
}; 