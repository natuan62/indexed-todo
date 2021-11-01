<template>
  <span v-if="title">{{ title }}</span>
  <input v-bind="$attrs" type="text" v-model="inputValue" @keyup.enter="$emit('enter-press')"/>
</template>

<script lang="ts">
import { computed, defineComponent, SetupContext } from 'vue';

type Prop = {
  title?: string;
  modelValue?: string | number;
};

export default defineComponent({
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [String, Number],
    },
  },
  emits: ['enter-press'],
  setup(props: Prop, { emit }: SetupContext) {
    const inputValue = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value),
    });

    return {
      inputValue,
    };
  },
});
</script>

<style scoped>
span,
input {
  margin: 5px;
}
</style>
