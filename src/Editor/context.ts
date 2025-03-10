import { EditorView } from 'prosemirror-view';
import { createStore } from 'zustand/vanilla';

export const contextStore = createStore<{
    editorView: EditorView | null,
    setEditorView: (view: EditorView) => void,
}>((set) => ({
    editorView: null,
    setEditorView: (view: EditorView | null) => set({ editorView: view }),
}))