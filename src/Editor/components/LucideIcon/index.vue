<script lang="tsx">
import { ref, onMounted, PropType, defineComponent } from 'vue';
import { createElement, IconNode, SVGProps } from 'lucide';

export default defineComponent({
    props: {
        icon: {
            type: Object as PropType<IconNode>,
            default: () => ({}),
        },
        width: {
            type: Number,
            default: 16,
        },
        color: String,
    },
    setup(props) {
        const iconRef = ref<HTMLElement | null>(null);

        const attrs: SVGProps = {
            width: props.width,
        };

        if (props.color) {
            attrs.color = props.color;
        }
 
        const iconElement = createElement(props.icon, attrs);

        onMounted(() => {
            if (iconRef.value) {
                iconRef.value.appendChild(iconElement);
            }
        });

        return () => <div ref={iconRef}></div>;
    }
});
</script>