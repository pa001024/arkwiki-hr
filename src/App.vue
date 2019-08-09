
<template>
  <div class="app">
    <HRTool></HRTool>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator';
import HRTool from './components/HRTool.vue';

@Component({ components: { HRTool } })
export default class App extends Vue {}
</script>

<style lang="less" scoped>
</style>
