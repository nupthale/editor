import { Ref } from 'vue';
import { Selection } from 'prosemirror-state';

import { schema } from '../../plugins/schema';
import { contextStore } from '../../context';

export const useColor = (selectionRef: Ref<Selection | null>) => {
    const updateTextColor = (color: string) => {
        const editorView = contextStore.getState().editorView;

        if (!editorView || !selectionRef.value) return;

        const colorMark = schema.marks.color.create({ color });

        // 在编辑器中应用这个 mark
        const { state, dispatch } = editorView;
        const { from, to } = selectionRef.value;

        dispatch(
            state.tr.addMark(from, to, colorMark)
        );
    }

    const updateBackgroundColor = (color: string) => {
        const editorView = contextStore.getState().editorView;

        if (!editorView || !selectionRef.value) return;

        const backgroundMark = schema.marks.background.create({ color });

        // 在编辑器中应用这个 mark
        const { state, dispatch } = editorView;
        const { from, to } = selectionRef.value;

        dispatch(
            state.tr.addMark(from, to, backgroundMark)
        );
    }

    return {
        updateTextColor,
        updateBackgroundColor,
    };
}