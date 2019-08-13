
<template>
  <div class="selector">
    <div class="filter-list">
      <div class="filter-part genders" :class="{'hidden-part': hidden.genders}">
        <div class="title" @click="hide('genders')">
          <span>性别</span>
        </div>
        <Options v-show="!hidden.genders" :names="selectedNames.genders" v-model="filters.genders"></Options>
      </div>
      <div class="filter-part professions" :class="{'hidden-part': hidden.professions}">
        <div class="title" @click="hide('professions')">
          <span>职业</span>
        </div>
        <Options
          v-show="!hidden.professions"
          :names="selectedNames.professions"
          v-model="filters.professions"
          v-slot="{ item }"
        >
          <ArkIcon :name="item"></ArkIcon>
          {{item}}
        </Options>
      </div>
      <div class="filter-part tags" :class="{'hidden-part': hidden.tags}">
        <div class="title" @click="hide('tags')">
          <span>标签</span>
        </div>
        <Options v-show="!hidden.tags" :names="selectedNames.tags" v-model="filters.tags"></Options>
      </div>
      <div class="filter-part rairties" :class="{'hidden-part': hidden.rairties}">
        <div class="title" @click="hide('rairties')">
          <span>资历</span>
        </div>
        <Options
          v-show="!hidden.rairties"
          :names="selectedNames.rairties"
          v-model="filters.rairties"
        ></Options>
      </div>
      <div class="filter-part methods" :class="{'hidden-part': hidden.methods}">
        <div class="title" @click="hide('methods')">
          <span>方式</span>
        </div>
        <Options v-show="!hidden.methods" :names="selectedNames.methods" v-model="filters.methods"></Options>
      </div>
      <div class="filter-part orders" :class="{'hidden-part': hidden.orders}">
        <div class="title" @click="hide('orders')">
          <span>排序</span>
        </div>
        <OrderOptions
          v-show="!hidden.orders"
          :names="selectedOrderNames"
          v-model="orderFilters"
          @change="$emit('filterchange', orderFilters)"
        ></OrderOptions>
      </div>
      <div class="filter-part tools" :class="{'hidden-part': hidden.tools}">
        <div class="title" @click="hide('tools')">
          <span>选项</span>
        </div>
        <div class="subpart" v-if="!hidden.tools">
          <ArkButton class="red" @click="reset">重置</ArkButton>
          <ArkButton @click="$emit('evolve', 0)">
            <WikiImage name="elite_0_large.png" :size="20"></WikiImage>
          </ArkButton>
          <ArkButton @click="$emit('evolve', 1)">
            <WikiImage name="elite_1_large.png" :size="20"></WikiImage>
          </ArkButton>
          <ArkButton @click="$emit('evolve', 2)">
            <WikiImage name="elite_2_large.png" :size="20"></WikiImage>
          </ArkButton>
          <ArkButton @click="$emit('evolve', 3)">
            <ArkIcon name="skin" style="font-size:20px"></ArkIcon>
          </ArkButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Model, Watch } from 'vue-property-decorator';
import { mapValues } from 'lodash-es';
import { HRFilter } from '../common/hr.i';
import Options from './Options.vue';
import OrderOptions, { OrderOption } from './OrderOptions.vue';

@Component({ components: { Options, OrderOptions } })
export default class Selector extends Vue {
  @Model('change') _filter: HRFilter;
  get filters() {
    return this._filter;
  }
  set filters(val) {
    this.$emit('change', val);
  }
  names: HRFilter = {
    genders: ['男', '女'],
    locations: ['近战位', '远程位'],
    professions: ['辅助', '近卫', '狙击', '术师', '特种', '先锋', '医疗', '重装'],
    tags: ['输出', '防护', '生存', '治疗', '费用回复', '群攻', '减速', '支援', '快速复活', '削弱', '位移', '召唤', '控场', '爆发'],
    rairties: ['一星干员', '新手', '三星干员', '四星干员', '资深干员', '高级资深干员'],
    methods: ['公开招募', '干员寻访'],
  };

  hidden: { [key: string]: boolean } = {
    genders: true,
    locations: true,
    professions: true,
    tags: true,
    rairties: true,
    methods: true,
    orders: true,
    tools: true,
  };

  hide(key: string) {
    if (key in this.hidden) {
      delete this.hidden[key];
    } else {
      this.hidden[key] = true;
    }
    this.hidden = Object.assign({}, this.hidden);
  }

  orderFilters: OrderOption[] = [];
  orderNames = ['稀有度', '名称', '职业'];

  get selectedOrderNames() {
    const selected = this.orderFilters.map(v => v.name);
    return [...selected, ...this.orderNames.filter(s => !selected.includes(s))];
  }

  get selectedNames() {
    return mapValues(this.names, (v, n: keyof HRFilter) => {
      const selected = this.filters[n];
      return [...selected.filter(s => v.includes(s)), ...v.filter(s => !selected.includes(s))];
    });
  }

  reset() {
    this.filters = mapValues(this.filters, v => []);
  }
}
</script>

<style lang="less" scoped>
.selector {
  position: relative;
  // overflow: hidden;
  // &::before {
  //   content: '';
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   width: 100%;
  //   height: 100%;
  //   // background: url(../../public/bg_0_rhodes2.png) no-repeat center;
  //   // background-size: cover;
  //   filter: blur(5px);
  //   z-index: -1;
  // }
  background: rgba(0, 0, 0, 0.4);
  padding: 8px 0;
}
.filter-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.filter-part {
  display: flex;
  align-items: center;
  color: #fff;
  white-space: nowrap;
  margin: 4px 0;
  width: 100%;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6);
  min-height: 80px;
  background-image: linear-gradient(19deg, #293031 0%, #33373f 100%);
  transition: 0.5s;
  .title {
    padding: 12px 24px;
    // background-color: #213a52;
    // background-image: linear-gradient(207deg, #223a53, #142637);
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.02em;
    text-decoration: none;
    text-transform: uppercase;
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      word-break: break-all;
      white-space: normal;
      line-height: 16px;
      text-align: center;
      position: relative;
      user-select: none;
      cursor: pointer;

      &::before {
        content: '';
        position: absolute;
        display: inline-block;
        width: 36px;
        height: 36px;
        border: 3px solid #fff;
        transform: rotate(45deg);
        box-shadow: 0 0 6px rgba(255, 255, 255, 0.6), 0 0 6px rgba(255, 255, 255, 0.6) inset;
      }
    }
  }
  &.hidden-part {
    justify-content: center;
    width: 84px;
    height: 32px;
    min-height: unset;
    order: -1;
    margin: 4px;
    flex-wrap: nowrap;
    .title {
      padding: 0;
    }
    span::before {
      opacity: 0;
    }
  }
}
.subpart {
  display: flex;
  flex-wrap: wrap;
  margin: 4px 0;
}
</style>
