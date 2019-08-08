<template>
  <transition-group tag="div" class="options-group" name="options-list">
    <label
      v-for="name in names"
      :key="name"
      role="checkbox"
      class="option"
      :class="{ selected: vals.includes(name) }"
    >
      <input type="checkbox" v-model="vals" :value="name" />
      <span>
        <slot :item="name">{{name}}</slot>
      </span>
    </label>
  </transition-group>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop, Model } from 'vue-property-decorator';

@Component({})
export default class Options extends Vue {
  @Model('change') _vals: string[];
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
.options-group {
  display: flex;
  flex-wrap: wrap;
}
.option {
  display: flex;
  align-items: center;
  padding: 6px 16px;
  height: 16px;
  margin: 4px;
  font-size: 14px;
  white-space: nowrap;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  user-select: none;
  background-image: none;
  border: 2px solid #fff;
  border-radius: 24px;
  color: #fff;
  // background-color: #161a1e;
  transition: 0.4s;
  &:hover {
    background-color: #36404b62;
  }
  input {
    opacity: 0;
    outline: 0;
    position: absolute;
    z-index: -1;
  }
  &.selected {
    border-color: #08cc96;
    color: #08cc96;
  }
}
.options-list-move {
  transition: 0.4s;
}
</style>

