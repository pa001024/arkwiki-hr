<template>
  <div class="char-link">
    <ruby>
      <ArkIcon class="box" :name="char.job"></ArkIcon>
      <a target="_blank" :href="`/wiki/${char.name}`">
        <span class="name">{{char.name}}</span>
      </a>
      <rt style="text-align:left;">
        <Rarity :star="char.r"></Rarity>
      </rt>
    </ruby>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { HRInfo } from '../common/hr.i';
import Rarity from './Rarity.vue';

@Component({ components: { Rarity } })
export default class CharLink extends Vue {
  @Prop() char: HRInfo;
}
</script>
<style lang="less" scoped>
.char-link {
  color: white;
  .name {
    color: white;
    text-shadow: 0 0 5px black;
    text-decoration: none;
  }
  white-space: nowrap;
  line-height: 18px;
  margin-right: 0.1em;
  font-weight: bold;
  text-align: left;
}
</style>
