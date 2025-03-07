<script lang="tsx">
import { defineComponent } from 'vue';
import { UserProfile, User } from '@zsfe/zsui';

export default defineComponent({
    setup() {
        return () => (
            <div>
                <UserProfile username="哈乐">
                    {{
                        user: () => (
                            <div class="inline-flex items-center">
                                <User size="small" username="哈乐" showText={false} />
                                <span class="ml-1 text-sm text-[#646a73]">哈乐</span>
                            </div>
                        ),
                        profile: () => (
                            <div class="p-[15px]">这是关于哈乐的个人简介</div>
                        ),
                    }}
                </UserProfile>
            </div>
        );
    }
});
</script>