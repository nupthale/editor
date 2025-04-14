
import { LOCAL_MODE } from '../../../doc';

import { UserType } from '../../interface';

import { userStore } from '../../store/user';
import { provider } from './core';

import { nameToColor } from '../../shared/color';

// 获取所有在线用户
export const getOnlineUsers = () => {
    if (LOCAL_MODE) {
      return [];
    }
  
    const states = Array.from(provider?.awareness.getStates().values()!);
    return states
      .filter(state => state.user)
      .map(state => state.user);
};

// 监听用户状态变化
provider?.awareness.on('change', () => {
    const users = getOnlineUsers();
    console.log('在线用户列表:', users);

    userStore.getState().setOnlineUsers(users);
});

// 假设从 store 或 props 获取用户信息

export const setCollabUser = (user: UserType) => {
    if (LOCAL_MODE) {
      return;
    }

    console.info('#nameToColor(user.name)', nameToColor(user.name));

    provider?.awareness.setLocalStateField('user', {
      name: user.name,
      id: user.id,
      color: nameToColor(user.name, 0.92),
    });
};