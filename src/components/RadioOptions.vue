<template>
  <transition-group tag="div" class="options-group" name="options-list">
    <label
      v-for="name in names"
      :key="name"
      role="checkbox"
      class="option"
      :class="{ selected: vals.includes(name) }"
    >
      <input type="radio" v-model="vals" :value="name" />
      <span>
        <slot :item="name">{{name}}</slot>
      </span>
    </label>
  </transition-group>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop, Model } from 'vue-property-decorator';

@Component({})
export default class RadioOptions extends Vue {
  @Model('change') _vals: string;
  get vals() {
    return this._vals;
  }
  set vals(val) {
    this.$emit('change', val);
  }
  @Prop() names: string[];
}
</script>
<style lang="less" scoped>
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

