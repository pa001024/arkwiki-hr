
<template>
  <div class="hr">
    <div class="header">
      <CharSelector v-model="filters" @evolve="e => evolve = e" @filterchange="e => orders = e"></CharSelector>
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
import { HRSystem, ReducedHRInfo } from '../common/char';
import { OrderOption } from './OrderOptions.vue';
import { orderBy, map, keyBy, mapValues, maxBy, minBy } from 'lodash-es';

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

  orders: OrderOption[] = [];

  get ordersParms() {
    const nameMaps = {
      稀有度: 'r',
      名称: 'name',
      职业: 'job',
    };
    return [this.orders.map(v => nameMaps[v.name]), this.orders.map(v => (v.asc ? 'asc' : 'desc'))];
  }

  hr = new HRSystem();
  get filteredChars() {
    const chars = this.hr.filterChars(this.filters);
    return orderBy(chars, ...this.ordersParms);
  }

  get reducedChars() {
    const { matched, wildcard } = this.hr.reduceChars(this.filters);
    const sortableWildcard = map(wildcard, (list, name) => ({ name, list }));
    const sorted = sortableWildcard.sort((a, b) => {
      const rankAvgA = maxBy(a.list, 'r').r + minBy(a.list, 'r').r;
      const rankAvgB = maxBy(b.list, 'r').r + minBy(b.list, 'r').r;

      return rankAvgB - rankAvgA || b.name.length - a.name.length;
    });
    console.log(sorted);
    return {
      matched,
      wildcard: mapValues(keyBy(sorted, 'name'), v => v.list),
    } as ReducedHRInfo;
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
