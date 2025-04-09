import { nanoid } from 'nanoid';
import { of, tap, delay } from 'rxjs';

import { contextStore } from '../../store/context';
import { commentStore } from '../../store/comment';
import { schema } from '../../plugins/schema';
import { activeComment$, focusCommentInput$, removeCommentTransition$ } from '../Comments/event';


export const useComment = () => {
  const handleComment = () => {
    const editorView = contextStore.getState().editorView;
    const selection = editorView?.state.selection;

    if (!editorView || !selection) return;

    const refId = nanoid(8);

    const commentMark = schema.marks.comment.create({
        id: refId,
        active: true,
    });

    // 在编辑器中应用这个 mark
    const { state, dispatch } = editorView;
    const { from, to } = selection;

    dispatch(
        state.tr.addMark(from, to, commentMark)
    );

    const commentId = nanoid(8);

    removeCommentTransition$.next();
    commentStore.getState().addDocComment(refId, commentId);
    
    setTimeout(() => {
        of({
          refId,
          id: commentId,
        }).pipe(
            tap((data) => activeComment$.next(data)),
            delay(100),
            tap(() => focusCommentInput$.next({ id: commentId })),
        ).subscribe();
    }, 100);
  };

  return {
    handleComment,
  };
}