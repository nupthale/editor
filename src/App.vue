<script lang="tsx">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import { message } from 'ant-design-vue';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { applyDevTools } from 'prosemirror-dev-toolkit';

import { plugins } from './Editor/plugins';
import { schema } from './Editor/plugins/schema';

import FloatingMenu from './Editor/components/FloatingMenu/index.vue';
import BubbleMenu from './Editor/components/BubbleMenu/index.vue';
import Catalog from './Editor/components/Catalog/index.vue';
import Comments from './Editor/components/Comments/index.vue';
import MentionSelectPopopver from './Editor/components/MentionSelectPopover/index.vue';
import LikeSection from './Editor/components/LikeSection/index.vue';

import { contextStore } from './Editor/store/context';
import { commentStore } from './Editor/store/comment';
import { docChanged$, docScroll$ } from './Editor/event';
import { useAddEmptyBlock } from './Editor/hooks/useAddEmptyBlock';
import { useClickEditorOutside } from './Editor/hooks/useClickEditorOutside';
import { useDocScrollTo } from './Editor/hooks/useDocScrollTo';  

import { doc, docComments, commentInfoMap } from './doc';

import './Editor/theme/index.less';
import headerImage from './header.jpeg';

message.config({
  maxCount: 1,
});

export default defineComponent({
  name: 'App',
  setup() {
    const editorRef = ref<HTMLElement | null>(null);
    const scrollEl = ref<HTMLElement | null>(null);
    let view: EditorView | null = null;

    const { editorDomRef } = useAddEmptyBlock();

    useClickEditorOutside(editorDomRef);
    useDocScrollTo();

    onMounted(() => {
      if (!editorRef.value) return;

      // 创建初始 EditorState
      const state = EditorState.create({
        schema,
        plugins: plugins(schema),
        doc: schema.node('doc', null, doc)
      });

      // 创建 EditorView
      view = new EditorView(editorRef.value, {
        state,
        dispatchTransaction(transaction) {
          if (!view) return; 

          // 监听文档变化
          const newState = view!.state.apply(transaction);
          view!.updateState(newState);

          if (transaction.docChanged) {
            // 在这里处理文档变化
            docChanged$.next();
          }
        },
      });

      // 在编辑器区域内阻止默认行为
      editorRef.value.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          e.stopPropagation();
          e.preventDefault();
        }
      });

      contextStore.getState().setEditorView(view);
      contextStore.getState().setScrollEl(scrollEl.value);
      commentStore.getState().setDocComments(docComments);
      commentStore.getState().setCommentInfoMap(commentInfoMap);

      // 初始化
      docChanged$.next();

      applyDevTools(view);
    });

    onUnmounted(() => {
      if (view) {
        view.destroy();
      }
    });

    return () => (
      <div class="w-full h-full overflow-auto" ref={scrollEl} onScroll={(e) => docScroll$.next({ e })}>
        <div class="sticky top-0 h-[64px] border-b-[1px] border-[#dee0e3] border-solid bg-white z-10"></div>

        <div class="h-[278px] overflow-hidden bg-[auto_591px] bg-center" style={{ backgroundImage: `url(${headerImage})`}}>
        </div>
        
        <div class="relative">
          {/* 左侧目录 */}
          <Catalog />

          <div class="flex">
            <div class="w-[820px] pb-[72px] mx-auto" ref={editorDomRef}>
                <div ref={editorRef} class="min-h-[580px] prose max-w-none" />
            </div>
          </div>

          {/* 右侧评论 */}
          <Comments />

          <LikeSection />
        </div>

        <FloatingMenu />

        <BubbleMenu />

        <MentionSelectPopopver />
      </div>
    );
  }
});
</script>./Editor/hooks/useMouseLeaveDocBody