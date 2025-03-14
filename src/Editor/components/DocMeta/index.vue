<script lang="tsx">
import { defineComponent } from 'vue';
import { UserProfile, User } from '@zsfe/zsui';

export default defineComponent({
    setup() {
        return () => (
            <div>
                <UserProfile username="王瑞">
                    {{
                        user: () => (
                            <div class="inline-flex items-center">
                                <User size="small" username="王瑞" showText={false} />
                                <span class="ml-1 text-sm text-[#646a73]">王瑞</span>
                            </div>
                        ),
                        profile: () => (
                            <div class="p-[15px]">这是关于王瑞的个人简介</div>
                        ),
                    }}
                </UserProfile>
            </div>
        );
    }
});
</script>