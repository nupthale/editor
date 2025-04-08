
import { Subject } from 'rxjs';

export const layoutComments$ = new Subject<void>();

export const updateCommentHeight$ = new Subject<{ id: string, height: number }>();

export const focusComment$ = new Subject<{ refId: string }>();
