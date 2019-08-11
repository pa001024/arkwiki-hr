<template>
  <button class="arkbtn" @click="onclick">{{text}}</button>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({ components: {} })
export default class ArkIcon extends Vue {
  @Prop() text: string;
  onclick(e: MouseEvent) {
    this.$emit('click', e);
  }
}
</script>

<style lang="less" scoped>
.arkbtn {
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
</style>
