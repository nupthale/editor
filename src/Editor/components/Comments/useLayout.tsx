import { ref, computed } from 'vue';
import { useSubscription } from '@vueuse/rxjs';
import { tap, switchMap, map, debounceTime } from 'rxjs';

import { docChanged$ } from '../../event';
import { contextStore, useContextStore } from '../../context';
import { layoutComments$, updateCommentHeight$ } from './event';

/**
 * context comments:
 * {
 *  [refId1]: [id1, id2, id3],
 *  [refId2]: [id4, id5],
 * }
 * 
 * => 按照顺序排序
 * [
 *  { refTop: 100, refId: refId1, comments: [id1, id2, id3] },
 *  { refTop: 200, refId: refId2, comments: [id4, id5]
 * ],
 * 
 * => 计算baseTop baseTop = Math.max(refTop, 上一个的baseTop + 上一个的height综合 + 上下margin);
 *  [
 *   { baseTop: 100, refTop: 100, refId: refId1, comments: [id1, id2, id3] },
 *   { baseTop: 800, refTop: 200, refId: refId2, comments: [id4, id5]
 *  ],
 * 
 * => 最后得到每个commentId的transformYMap
 * {
 *  [id1]: baseTop + (index === 0 ? 0 : 上一个的height + 上下margin),
 * }
 * 
 * 当focus到中间某一个时， 根据transformYMap获取到offsetY， 然后所有的id都transform - offsetY；
 * 
 * 同时维护， 高度索引，方便查询
 * {
 *    [id1]: 300,
 *    [id4]: 500,
 * }
 * 需要同时维护， 顺序用于渲染layout， 数据用于快速根据id查找信息。
 * 增删时，修改顺序模型，和数据模型。
 * commentPanel高度变化时，修改数据模型。
 */

const MARGIN = 22;

type RefType = { refId: string, refTop: number, comments: string[], baseTop?: number };

export const useLayout = () => {
    const layoutReady = ref(false);

    const commentsHeightMap = ref<Record<string, number>>({});
    const siderCommentRefMap = ref<Record<string, RefType>>({});
    const docCommentRefMap = ref<Record<string, RefType>>({});

    const { state } = useContextStore();

    const transformYMap = ref<Record<string, number>>({});

    useSubscription(
        docChanged$.pipe(
            debounceTime(300),
            switchMap(async () => {
                layoutComments$.next();
            }),
        ).subscribe()
    );

    useSubscription(
        updateCommentHeight$.pipe(
            tap(({ id, height }) => {
                commentsHeightMap.value[id] = height;
            }),
        ).subscribe(),
    );

    useSubscription(
        layoutComments$.pipe(
            debounceTime(300),
            switchMap(async () => {
                const comments = state.value.comments || {};

                const array: RefType[] = [];
                Object.keys(comments).forEach((refId) => {
                    const refDom = document.querySelector(`[data-comment-id="${refId}"]`);
                    if (!refDom) return;
                    
                    const { top } = refDom.getBoundingClientRect();
                    const pageHeadHeight = 278 + 64;

                    array.push({
                        refId,
                        refTop: top - pageHeadHeight,
                        comments: comments[refId],
                    });
                });

                return array;
            }),
            map((unordered) => {
                // 排序
                return unordered.sort((a, b) => a.refTop - b.refTop);
            }),
            map((ordered) => {
                // 计算baseTop
                let lastBaseTop = 0;
                return ordered.map((item, index) => {
                    const prev = ordered[index - 1];
                    const prevHeight = prev ? prev.comments.reduce((acc, crt) => {
                        return acc + (commentsHeightMap.value[crt] || 0);
                    }, 0) + (prev.comments?.length || 0) * MARGIN : 0;

                    const baseTop = Math.max(item.refTop, lastBaseTop !== 0 ? lastBaseTop + prevHeight + MARGIN : 0);
                    lastBaseTop = baseTop;
                    
                    return {
                        ...item,
                        baseTop,
                    };
                })
            }),
            map((ordered) => {
                // 计算每个comment的transformY
                const map: Record<string, number> = {};
                ordered.forEach((item) => {
                    docCommentRefMap.value[item.refId] = item;

                    item.comments.forEach((commentId, index) => {
                        const prevHeight = item.comments.slice(0, index).reduce((acc, crt) => {
                            return acc + (commentsHeightMap.value[crt] || 0);
                        }, 0);

                        siderCommentRefMap.value[commentId] = item;

                        map[commentId] = 
                            (item.baseTop || 0) + 
                            (index === 0 ? 0 : prevHeight + index * MARGIN);
                    })
                });

                transformYMap.value = map;

                setTimeout(() => {
                    layoutReady.value = true;
                }, 300);
            })
        ).subscribe(),
    );

    return {
        layoutReady,
        transformYMap,
        docCommentRefMap,
        siderCommentRefMap,
    };
}