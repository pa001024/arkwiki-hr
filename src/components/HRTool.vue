
<template>
  <div class="hr">
    <div class="header">
      <CharSelector v-model="filters" @evolve="e => evolve = e"></CharSelector>
      <GroupedHRResult
        v-if="filters.methods.includes('公开招募')"
        :groups="reducedChars"
        :evolve="evolve"
      ></GroupedHRResult>
      <HRResult v-else :results="filteredChars" :evolve="evolve"></HRResult>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Selector from './Selector.vue';
import HRResult from './HRResult.vue';
import GroupedHRResult from './GroupedHRResult.vue';
import { HRFilter } from '../common/hr.i';
import { HRSystem } from '../common/char';

@Component({ components: { CharSelector: Selector, HRResult, GroupedHRResult } })
export default class HRTool extends Vue {
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
    // TODO: 自定义排序
    return this.hr.filterChars(this.filters).sort((a, b) => b.r - a.r || a.name.localeCompare(b.name));
  }

  get reducedChars() {
    return this.hr.reduceChars(this.filters);
  }

  evolve = 0;
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
