<template>
  <div class="char-info">
    <div class="name">{{char.name}}</div>
    .
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { HRInfo } from '../common/hr.i';

@Component({ components: {} })
export default class CharInfo extends Vue {
  @Prop() char: HRInfo;
}
</script>
<style lang="less" scoped>
</style>
