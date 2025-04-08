import { nanoid } from 'nanoid';

import { contextStore } from '../../context';
import { schema } from '../../plugins/schema';

export const useComment = () => {
  const handleComment = () => {
    const editorView = contextStore.getState().editorView;
    const selection = editorView?.state.selection;

    if (!editorView || !selection) return;

    const commentMark = schema.marks.comment.create({
        id: nanoid(8),
        active: true,
    });

    // 在编辑器中应用这个 mark
    const { state, dispatch } = editorView;
    const { from, to } = selection;

    dispatch(
        state.tr.addMark(from, to, commentMark)
    );
  };

  return {
    handleComment,
  };
}