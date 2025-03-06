<template>
  <teleport :to="target">
    <slot />
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    target: {
      type: String,
      required: true
    }
  }
});
</script>