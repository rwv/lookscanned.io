<template>
  <div class="main-container">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.main-container {
  width: calc(100% - 30px);
  padding-right: 15px;
  padding-left: 15px;
  margin-top: 15px;
  margin-bottom: 40px;
  margin-right: auto;
  margin-left: auto;

  @media (min-width: 576px) {
    & {
      max-width: 540px;
    }
  }
  @media (min-width: 768px) {
    & {
      max-width: 720px;
    }
  }
  @media (min-width: 992px) {
    & {
      max-width: 960px;
    }
  }
  @media (min-width: 1200px) {
    & {
      max-width: 1140px;
    }
  }
}
</style>
