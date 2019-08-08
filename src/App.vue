
<template>
  <div class="hr">
    <div class="header">
      <CharSelector v-model="filters"></CharSelector>
      <HRResult :results="filteredChars"></HRResult>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator';
import Selector from './components/Selector.vue';
import HRResult from './components/HRResult.vue';
import { HRFilter } from './common/hr.i';
import { HRSystem } from './common/char';

@Component({ components: { CharSelector: Selector, HRResult } })
export default class App extends Vue {
  filters: HRFilter = {
    genders: [],
    locations: [],
    professions: [],
    tags: [],
    rairties: [],
    methods: [],
  };
  hr = new HRSystem();
  get filteredChars() {
    return this.hr.filterChars(this.filters).sort((a, b) => b.star - a.star || a.name.localeCompare(b.name));
  }
}
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
