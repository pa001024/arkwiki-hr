<template>
  <div class="grouped-hr-result">
    <div class="hr-result-group" v-for="(match, tags) in groups.matched" :key="'matched'+tags">
      <div class="group-title exact">
        精确匹配:
        <div class="group-tag" v-for="tag in split(tags)" :key="tag">{{tag}}</div>
      </div>
      <transition-group tag="div" class="hr-result" name="hr-list">
        <CharPortrait
          :initEvolve="evolve"
          class="result-item"
          :char="char"
          v-for="char in match"
          :key="char.name"
        ></CharPortrait>
      </transition-group>
    </div>
    <div class="hr-result-group" v-for="(match, tags) in groups.wildcard" :key="'wildcard'+tags">
      <div class="group-title exact">
        模糊匹配:
        <div class="group-tag" v-for="tag in split(tags)" :key="tag">{{tag}}</div>
      </div>
      <transition-group tag="div" class="hr-result" name="hr-list">
        <CharPortrait
          :initEvolve="evolve"
          class="result-item"
          :char="char"
          v-for="char in match"
          :key="char.name"
        ></CharPortrait>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop, Model } from 'vue-property-decorator';
import { HRInfo } from '../common/hr.i';
import CharPortrait from './CharPortrait.vue';
import { ReducedHRInfo } from '../common/char';

@Component({ components: { CharPortrait } })
export default class GroupedHRResult extends Vue {
  @Prop() evolve: number;
  @Prop() groups: ReducedHRInfo;

  get hasExact() {
    return !!Object.keys(this.groups.matched);
  }
  split(src: string) {
    return src.split('+');
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

.group-title {
  display: flex;
  flex-wrap: wrap;
}
.group-tag {
  @text-color: #fff;
  @main-color: #2567e2;
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
</style>
