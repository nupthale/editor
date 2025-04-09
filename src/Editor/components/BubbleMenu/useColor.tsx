import { schema } from '../../plugins/schema';
import { contextStore } from '../../store/context';

export const useColor = () => {
    const updateTextColor = (color: string) => {
        const editorView = contextStore.getState().editorView;
        const selection = editorView?.state.selection;

        if (!editorView || !selection) return;

        const colorMark = schema.marks.color.create({ color });

        // 在编辑器中应用这个 mark
        const { state, dispatch } = editorView;
        const { from, to } = selection;

        dispatch(
            state.tr.addMark(from, to, colorMark)
        );
    }

    const updateBackgroundColor = (color: string) => {
        const editorView = contextStore.getState().editorView;
        const selection = editorView?.state.selection;

        if (!editorView || !selection) return;

        const backgroundMark = schema.marks.background.create({ color });

        // 在编辑器中应用这个 mark
        const { state, dispatch } = editorView;
        const { from, to } = selection;

        dispatch(
            state.tr.addMark(from, to, backgroundMark)
        );
    }

    return {
        updateTextColor,
        updateBackgroundColor,
    };
}