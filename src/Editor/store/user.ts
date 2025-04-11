import { ref, onUnmounted } from 'vue';
import { createStore } from 'zustand/vanilla';

import { setCollabUser } from '../plugins/collab/user';
import { UserType } from '../interface';

export const userStore = createStore<{
    user: UserType | null,
    setUser: (user: UserType) => void,
    onlineUsers: UserType[],
    setOnlineUsers: (users: UserType[]) => void,
}>((set, get) => ({
    user: null,
    onlineUsers: [],
    setUser: (user: UserType) => {
        setCollabUser(user);
        set({ user });
    },
    setOnlineUsers: (users: UserType[]) => {
        set({ onlineUsers: users });
    },
}))

export function useUserStore() {
    const state = ref(userStore.getState());

    const unsubscribe = userStore.subscribe((newState) => {
        state.value = newState;
    });

    onUnmounted(() => {
        unsubscribe();
    });

    return {
        state,
    };
}