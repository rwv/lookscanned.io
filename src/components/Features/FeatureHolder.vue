<template>
  <div>
    <n-h3 prefix="bar">
      <n-icon size="1em" :component="icon" style="margin-right: 0.5em" />{{ title }}
    </n-h3>
    <n-p>
      <slot></slot>
    </n-p>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { NH3, NP, NIcon } from 'naive-ui'

defineProps<{ title: string; icon: Component }>()
</script>
