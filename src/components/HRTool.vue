
<template>
  <div class="hr" :class="{horize:horize,fullscreen:horize||fullscreen}">
    <div class="hr-header">
      <CharSelector
        v-model="filters"
        @evolve="e => evolve = e"
        @filterchange="e => orders = e"
        @stylechange="e => mode = e"
        @horize="e=> horize = !horize"
        :mode="mode"
      ></CharSelector>
    </div>
    <GroupedHRResult
      v-if="filters.methods.includes('公开招募')"
      :mode="mode"
      :groups="reducedChars"
      :evolve="evolve"
    ></GroupedHRResult>
    <HRResult v-else :mode="mode" :results="filteredChars" :evolve="evolve"></HRResult>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import Selector from './Selector.vue';
import HRResult from './HRResult.vue';
import GroupedHRResult from './GroupedHRResult.vue';
import { HRFilter, HRInfo } from '../common/hr.i';
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

  mode = localStorage.getItem('ext.hr.mode') || '文字';

  @Watch('mode')
  modeChange() {
    localStorage.setItem('ext.hr.mode', this.mode);
  }

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
    return orderBy(chars, ...this.ordersParms) as HRInfo[];
  }

  get reducedChars() {
    const { matched, wildcard } = this.hr.reduceChars(this.filters);
    // 组内排序
    const sortedMatched = mapValues(matched, chars => orderBy(chars, ...this.ordersParms) as HRInfo[]);
    const sortedWildcard = mapValues(wildcard, chars => orderBy(chars, ...this.ordersParms) as HRInfo[]);
    // 组间排序
    const sortableWildcard = map(sortedWildcard, (list, name) => ({ name, list }));
    const sorted = sortableWildcard.sort((a, b) => {
      const rankAvgA = maxBy(a.list, 'r').r + minBy(a.list, 'r').r;
      const rankAvgB = maxBy(b.list, 'r').r + minBy(b.list, 'r').r;

      return rankAvgB - rankAvgA || b.name.length - a.name.length;
    });
    return {
      matched: sortedMatched,
      wildcard: mapValues(keyBy(sorted, 'name'), v => v.list),
    } as ReducedHRInfo;
  }

  evolve = 0;

  hozStyle = {};

  horize = false;
  fullscreen = false;
}
</script>

<style lang="less" scoped>
.hr {
  background: #bbbec0;
  transition: transform 0.5s;
  overflow-x: hidden;
  &.fullscreen {
    position: fixed;
    top: 0;
    left: 0;
  }
  &.horize {
    .horized();
  }
}
.menu-panel {
  display: flex;
  .padding {
    flex: 1;
  }
}

@media only screen and (max-width: 767px) {
  .hr {
    zoom: 0.7;
    &.horize {
      .horized($zoom);
    }
  }
}
.horized(@zoom:1) {
  width: 100vh / @zoom;
  height: 100vw / @zoom;
  // transform: rotate(90deg);
  // transform-origin: 50vw/@zoom 50vw/@zoom;
  transform-origin: top left;
  transform: rotate(90deg) translate(0, -100vw / @zoom);
}
</style>
