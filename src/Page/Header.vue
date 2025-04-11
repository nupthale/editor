<script lang="tsx">
import { defineComponent, computed } from 'vue';
import { User } from '@zsfe/zsui';

import UserGroup from './UserGroup.vue';
import { useUserStore } from '../Editor/store/user';

import headerImage from './header.jpeg';

export default defineComponent({
  name: 'App',
  setup() {
    const userStore = useUserStore();

    const user = computed(() => {
        return userStore.state.value?.user;
    });

    const onlineUsers = computed(() => {
        const users = userStore.state.value?.onlineUsers;
        return users.filter(item => item.id !== user.value?.id);
    });

    return () => (
      <>
        <div class="sticky top-0 h-[64px] px-4 border-b-[1px] border-[#dee0e3] border-solid bg-white z-10 flex items-center justify-between">
            <div></div>
            <div class="flex items-center">
                <UserGroup users={onlineUsers.value} maxCount={10} />
                <div class="navLine"></div>
                <User username={user.value?.name} size="large" showText={false} />
            </div>

        </div>

        <div class="h-[278px] overflow-hidden bg-[auto_591px] bg-center" style={{ backgroundImage: `url(${headerImage})`}}>
        </div>
      </>
    );
  }
});
</script>

<style lang="less" scoped>
.navLine {
    margin: 0 16px;
    width: 1px;
    height: 32px;
    background: #dee0e3;
}
</style>