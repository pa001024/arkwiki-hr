<template>
  <transition-group tag="div" class="hr-result" name="hr-list">
    <component
      :is="tplName"
      :initEvolve="evolve"
      class="result-item"
      :char="char"
      v-for="char in results"
      :key="char.name"
    ></component>
  </transition-group>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop, Model } from 'vue-property-decorator';
import { HRInfo } from '../common/hr.i';
import CharPortrait from './CharPortrait.vue';
import CharAvatar from './CharAvatar.vue';
import CharLink from './CharLink.vue';
import CharColor from './CharColor.vue';

@Component({ components: { CharPortrait, CharAvatar, CharLink, CharColor } })
export default class HRResult extends Vue {
  @Prop() evolve: number;
  @Prop() results: HRInfo[];
  @Prop() mode: string;
  get tplName() {
    return {
      颜色: 'CharColor',
      文字: 'CharLink',
      头像: 'CharAvatar',
      肖像: 'CharPortrait',
    }[this.mode];
  }
}
</script>

<style lang="less">
.hr-result {
  display: flex;
  flex-wrap: wrap;
  margin: 4px -2px;
  position: relative;
  // background: #888888;
}
.result-item {
  margin: 4px 8px;
  transition: 0.8s;
}
.hr-list-enter,
.hr-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.hr-list-leave-active {
  margin: 0;
  width: 0;
  transform: translateY(-30px);
}
</style>
