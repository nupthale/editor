import { onMounted, onUnmounted } from 'vue';

import { contextStore } from '../../context';
import { focusComment$ } from './event';

export const useDocCommentClick = () => {
    const handleClick = (event: MouseEvent) => {

        const target = event.target as HTMLElement;
        const commentEl = target.closest('.doc-comment');
        if (commentEl) {
            const refId = commentEl.getAttribute('data-comment-id')!;

            focusComment$.next({
                refId,
            });

            
        }
    }
    
    onMounted(() => {
        document.addEventListener('click', handleClick);
    });

    onUnmounted(() => {
        document.removeEventListener('click', handleClick);
    });
}