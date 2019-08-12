<template>
  <transition-group tag="div" name="zoom" class="grouped-hr-result">
    <div class="hr-result-group" v-for="(match, tags) in groups.matched" :key="'matched'+tags">
      <div class="group-title exact">
        <div class="group-header" data-text="精确匹配">精确匹配</div>
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
      <div class="group-title">
        <div class="group-header">部分匹配</div>
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
  </transition-group>
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
.hr-result-group {
  // transition: 0.5s;
}
.roll-enter,
.roll-leave-to {
  height: 0px;
  opacity: 0;
  transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
}
.roll-leave-active {
  height: 0px;
  opacity: 0;
  transform: perspective(400px) rotate3d(1, 0, 0, -90deg);
}

.zoom-enter-active {
  animation: zoomInLeft 0.5s;
}
.zoom-leave-active {
  animation: zoomInLeft 0.5s reverse;
}

@keyframes zoomInLeft {
  from {
    opacity: 0;
    height: 0;
    transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  60% {
    opacity: 1;
    transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
}
@keyframes zoomOutRight {
  40% {
    opacity: 1;
    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0);
    transform: scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0);
  }

  to {
    opacity: 0;
    -webkit-transform: scale(0.1) translate3d(2000px, 0, 0);
    transform: scale(0.1) translate3d(2000px, 0, 0);
    -webkit-transform-origin: right center;
    transform-origin: right center;
  }
}

.group-title {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  background-image: repeating-linear-gradient(135deg, transparent, transparent 20px, rgba(255, 255, 255, 0.3) 20px, rgba(255, 255, 255, 0.3) 40px);
  border-top: 2px solid #000;
  border-bottom: 2px solid #000;
  .group-header {
    color: #fff;
    font-size: 17px;
    // font-family: systHeavy;
    font-weight: 600;
    padding: 8px 12px;
    user-select: none;
  }
  &.exact {
    background-color: rgba(8, 17, 46, 0.8);
    border-color: #2567e2;
    .group-header {
      color: #2567e2;

      text-shadow: 1px 1px 0 #fff, -1px 1px 0 #fff, 1px -1px 0 #fff, -1px -1px 0 #fff;
      // position: relative;
      // z-index: 0;
      // &::before {
      //   content: attr(data-text);
      //   position: absolute;
      //   -webkit-text-stroke: 2px #fff;
      //   z-index: -1;
      // }
    }
    .group-tag {
      @main-color: #2567e2;
      border-color: @main-color;
      color: @main-color;
      &::before {
        background: @main-color;
      }
    }
  }
}
.group-tag {
  @text-color: #fff;
  @main-color: #000;
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
