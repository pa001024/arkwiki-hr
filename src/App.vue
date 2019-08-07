
<template>
  <div class="hr">
    <div class="header">
      <CharSelector></CharSelector>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator';
import Selector from './components/Selector.vue';

@Component({ components: { CharSelector: Selector } })
export default class App extends Vue {}
</script>

<style lang="less" scoped>
.hr {
  // background: #1f2326;
}
.menu-panel {
  display: flex;
  .padding {
    flex: 1;
  }
}
</style>
