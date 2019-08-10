
<template>
  <div class="selector">
    <div class="filter">
      <div class="filter-part genders">
        <div class="title">
          <span>性别</span>
        </div>
        <Options :names="selectedNames.genders" v-model="filters.genders"></Options>
      </div>
      <div class="filter-part professions">
        <div class="title">
          <span>职业</span>
        </div>
        <Options :names="selectedNames.professions" v-model="filters.professions" v-slot="{ item }">
          <CharIcon :name="item"></CharIcon>
          {{item}}
        </Options>
      </div>
      <div class="filter-part tags">
        <div class="title">
          <span>标签</span>
        </div>
        <Options :names="selectedNames.tags" v-model="filters.tags"></Options>
      </div>
      <div class="filter-part rairties">
        <div class="title">
          <span>资历</span>
        </div>
        <Options :names="selectedNames.rairties" v-model="filters.rairties"></Options>
      </div>
      <div class="filter-part methods">
        <div class="title">
          <span>方式</span>
        </div>
        <Options :names="selectedNames.methods" v-model="filters.methods"></Options>
      </div>
      <div class="filter-part tools">
        <div class="title">
          <span>操作</span>
        </div>
        <div class="tool" @click="reset">重置</div>
        <div class="tool" @click="evolve">
          <WikiImage name="精英阶段2.png" :size="20"></WikiImage>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Model } from 'vue-property-decorator';
import mapValues from 'lodash.mapvalues';
import { HRFilter } from '../common/hr.i';
import Options from './Options.vue';
import CharIcon from './CharIcon.vue';
import WikiImage from './WikiImage.vue';

@Component({ components: { Options, CharIcon, WikiImage } })
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

  get selectedNames() {
    return mapValues(this.names, (v, n: keyof HRFilter) => {
      const selected = this.filters[n];
      return [...selected.filter(s => v.includes(s)), ...v.filter(s => !selected.includes(s))];
    });
  }

  reset() {
    this.filters = mapValues(this.filters, v => []);
  }

  evolve() {
    // TODO: 全体精二
  }
}
</script>

<style lang="less" scoped>
.selector {
  position: relative;
  // overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // background: url(../../public/bg_0_rhodes2.png) no-repeat center;
    background-size: cover;
    filter: blur(5px);
    z-index: -1;
    background-size: cover;
  }
}
.filter-part {
  display: flex;
  align-items: center;
  color: #fff;
  white-space: nowrap;
  margin: 4px 0;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.6);
  min-height: 80px;
  background-image: linear-gradient(19deg, #293031 0%, #33373f 100%);
  .title {
    padding: 12px 24px;
    // background-color: #213a52;
    // background-image: linear-gradient(207deg, #223a53, #142637);
    color: #fff;
    font-size: 16px;
    letter-spacing: 0.02em;
    text-decoration: none;
    text-transform: uppercase;
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      overflow: hidden;
      word-break: break-all;
      white-space: normal;
      line-height: 16px;
      text-align: center;

      &::after {
        content: '';
        position: absolute;
        display: inline-block;
        width: 36px;
        height: 36px;
        border: 3px solid #fff;
        transform: rotate(45deg);
      }
    }
  }
}
.tool {
  display: flex;
  align-items: center;
  padding: 6px 16px;
  box-sizing: border-box;
  height: 32px;
  margin: 4px;
  font-size: 14px;
  white-space: nowrap;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  user-select: none;
  background-image: none;
  border: 2px solid #d72626;
  color: #d72626;
  // background-color: #161a1e;
  transition: 0.4s;
  &:hover {
    background-color: #36404b62;
  }
}
</style>
