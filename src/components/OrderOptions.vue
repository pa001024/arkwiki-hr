<template>
  <transition-group tag="div" class="options-group" name="options-list">
    <label
      v-for="name in names"
      :key="name"
      class="option"
      :class="{ selected: valsMap[name] }"
      @click="setName(name)"
    >
      <span>
        <slot :item="name">
          <ArkIcon
            v-if="valsMap[name]"
            name="sort"
            class="reversable"
            :class="{reversed : valsMap[name].asc}"
          ></ArkIcon>
          {{name}}
        </slot>
        <span v-if="valsMap[name]" @click.stop="removeName(name)">×</span>
      </span>
    </label>
  </transition-group>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop, Model } from 'vue-property-decorator';
import { map, keyBy } from 'lodash-es';

export interface OrderOption {
  name: string;
  // Ascending
  asc: boolean;
}

@Component({})
export default class OrderOptions extends Vue {
  @Model('change') _vals: OrderOption[];
  get vals() {
    return this._vals;
  }
  set vals(val) {
    this.$emit('change', val);
  }
  get valsMap() {
    return keyBy(this.vals, 'name');
  }
  set valsMap(val) {
    this.$emit('change', map(val));
  }

  @Prop() names: string[];

  setName(name: string) {
    if (this.valsMap[name]) {
      this.vals = this.vals.map(v => {
        if (v.name === name) v.asc = !v.asc;
        return v;
      });
    } else {
      this.vals = this.vals.concat({ name, asc: false });
    }
  }
  removeName(name: string) {
    if (this.valsMap[name]) {
      this.vals = this.vals.filter(v => v.name != name);
    }
  }
}
</script>
<style lang="less" scoped>
.reversable {
  display: inline-block;
  transition: 0.4s;
  &.reversed {
    transform: perspective(400px) rotate3d(1, 0, 0, 180deg);
  }
}
@main-color: #2567e2;
@text-color: #fff;
// @text-color: #302f2f;
// @main-color: #08cc96;

.options-group {
  display: flex;
  flex-wrap: wrap;
  margin: 4px 0;
}
.option {
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
  border: 2px solid @text-color;
  color: @text-color;
  // background-color: #161a1e;
  transition: 0.4s;
  &:hover {
    background-color: #36404b38;
  }
  input {
    opacity: 0;
    outline: 0;
    position: absolute;
    z-index: -1;
  }
  &.selected {
    border-color: @main-color;
    color: @main-color;
    background-color: #e2e2e2;
    &::before {
      content: '';
      display: inline-block;
      width: 4px;
      height: 5px;
      background: @main-color;
      margin: 0 6px 12px -10px;
    }
  }
}
.options-list-move {
  transition: 0.4s;
}
</style>

