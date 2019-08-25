
<template>
  <div class="selector">
    <div class="filter-list">
      <div class="filter-part genders" :class="{'hidden-part': hidden.genders}">
        <div class="title" @click="hide('genders')">
          <span>性别</span>
        </div>
        <Options v-show="!hidden.genders" :names="selectedNames.genders" v-model="filters.genders"></Options>
      </div>
      <div class="filter-part locations" :class="{'hidden-part': hidden.locations}">
        <div class="title" @click="hide('locations')">
          <span>位置</span>
        </div>
        <Options
          v-show="!hidden.locations"
          :names="selectedNames.locations"
          v-model="filters.locations"
        ></Options>
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
      <div class="filter-part styles" :class="{'hidden-part': hidden.styles}">
        <div class="title" @click="hide('styles')">
          <span>样式</span>
        </div>
        <RadioOptions
          v-show="!hidden.styles"
          :names="styleNames"
          v-model="displayStyle"
          @change="$emit('stylechange', displayStyle)"
        ></RadioOptions>
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
          <ArkButton @click="$emit('horize')">
            <svg viewBox="0 0 32 32" style="width:20px;height:20px;fill:#fff">
              <path
                d="M17.594 2.513c1.375 1.382 2.506 2.525 2.513 2.539s0.427-0.359 0.933-0.83c1.070-0.996 0.91-0.962 1.92-0.397 3.704 2.076 6.214 5.711 6.918 10.018 0.067 0.412 0.123 0.771 0.123 0.797s0.45 0.047 1 0.047c0.697 0 1-0.021 1-0.070 0-0.039-0.044-0.369-0.097-0.734-1.178-8.033-7.915-13.881-15.996-13.883l-0.812-0 2.5 2.513zM11.594 1.767c-0.103 0.042-0.272 0.124-0.375 0.182-0.346 0.194-9.172 9.080-9.344 9.409-0.238 0.454-0.228 1.294 0.020 1.741 0.352 0.635 16.618 16.795 17.074 16.963 0.514 0.189 1.127 0.155 1.572-0.087 0.603-0.328 9.351-9.172 9.515-9.618 0.169-0.461 0.169-0.94 0-1.402-0.163-0.448-16.343-16.723-16.957-17.057-0.366-0.199-1.17-0.269-1.505-0.131zM24.047 23.941c-2.312 2.323-4.234 4.24-4.271 4.26s-3.659-3.554-8.048-7.942l-7.979-7.979 8.532-8.53 15.969 15.968-4.203 4.223zM0.159 17.641c0.869 7.485 6.224 13.082 13.591 14.202 0.641 0.097 3.187 0.209 3.125 0.137-0.017-0.020-1.155-1.163-2.529-2.54l-2.497-2.504-0.315 0.302c-1.603 1.534-1.486 1.468-2.063 1.168-4.056-2.114-6.746-5.953-7.412-10.577l-0.074-0.516h-1.865l0.038 0.328z"
              />
            </svg>
          </ArkButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Model, Watch, Prop } from 'vue-property-decorator';
import { mapValues } from 'lodash-es';
import { HRFilter } from '../common/hr.i';
import Options from './Options.vue';
import RadioOptions from './RadioOptions.vue';
import OrderOptions, { OrderOption } from './OrderOptions.vue';

@Component({ components: { Options, OrderOptions, RadioOptions } })
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
    methods: ['公开招募', '干员寻访', '其他方式'],
  };

  hidden: { [key: string]: boolean } = {
    genders: true, // 性别
    locations: true, // 位置
    professions: true, // 职业
    tags: true, // 标签
    rairties: true, // 稀有度
    methods: true, // 方式
    orders: true, // 排序
    styles: true, // 样式
    tools: false, // 选项
  };

  hide(key: string) {
    if (key in this.hidden) {
      this.hidden[key] = !this.hidden[key];
    } else {
      this.hidden[key] = true;
    }
  }

  orderFilters: OrderOption[] = [];
  orderNames = ['稀有度', '名称', '职业'];

  @Prop() mode: string;
  displayStyle = this.mode || '文字';
  styleNames = ['颜色', '文字', '头像', '肖像'];

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
    this.filters = mapValues(this.filters, (v, n) => (n === 'methods' ? v : []));
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
  transition: 0.5s width;
  will-change: width;
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
