<template>
  <div class="options-group">
    <label
      role="checkbox"
      class="option"
      :class="{ selected: vals.includes(name) }"
      v-for="name in names"
      :key="name"
    >
      <input type="checkbox" v-model="vals" :value="name" />
      <span>
        <slot>{{name}}</slot>
      </span>
    </label>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop, Model } from 'vue-property-decorator';

@Component({})
export default class Options extends Vue {
  @Model() vals: string[];
  @Prop() names: string[];
}
</script>
<style lang="less" scoped>
.options-group {
  display: flex;
}
.option {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 16px;
  margin: 12px 0;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
  color: #fff;
  // background-color: #161a1e;
  transition: 0.4s background-color;
  &:hover {
    background-color: #36404b;
  }
  input {
    opacity: 0;
    outline: 0;
    position: absolute;
    z-index: -1;
  }
  &.selected {
    background-color: #a7a5a5;
  }
}
</style>

