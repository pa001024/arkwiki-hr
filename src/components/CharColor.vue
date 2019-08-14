<template>
  <div class="char-color" :class="['r'+char.r]">
    <!-- <ArkIcon class="box" :name="char.job"></ArkIcon> -->
    <a target="_blank" :href="`/wiki/${char.name}`">
      <span class="name">{{char.name}}</span>
    </a>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { HRInfo } from '../common/hr.i';
import Rarity from './Rarity.vue';

@Component({ components: { Rarity } })
export default class CharColor extends Vue {
  @Prop() char: HRInfo;
}
</script>
<style lang="less" scoped>
.char-color {
  padding: 4px 14px;
  border: 2px solid #31363c;
  background-color: rgba(0, 0, 0, 0.4);
  .name {
    color: white;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
    text-decoration: none;
  }
  white-space: nowrap;
  line-height: 18px;
  margin-right: 0.1em;
  font-weight: bold;
  text-align: left;
  &.r6 .name {
    color: #ff9800;
  }
  &.r5 .name {
    color: #ffeb3b;
  }
  &.r4 .name {
    color: #ba68c8;
  }
  &.r3 .name {
    color: #03a9f4;
  }
  &.r2 .name {
    color: #cddc39;
  }
  &.r1 .name {
    color: #dde6ea;
  }
}
</style>
