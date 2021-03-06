<template>
  <div class="char-portrait" :class="['r'+char.r]">
    <transition-group name="flip" tag="div" class="pic" :data-phase="phase">
      <img v-for="(p, h) in phases" :key="h" v-show="phase === h" :src="getPhase(h)" :alt="p" />
    </transition-group>
    <div class="char-header">
      <div class="pro">
        <ArkIcon :name="char.job"></ArkIcon>
      </div>
      <Rarity :star="char.r"></Rarity>
    </div>
    <div class="mask"></div>
    <div class="misc">
      <div class="logo" :class="{evol: char.pic.length > 1}">
        <WikiImage :name="`${char.logo}.png`" :size="30"></WikiImage>
      </div>
      <div class="evolve" v-if="char.pic.length > 1" @click="phaseLoop">
        <WikiImage :name="`elite_2_card.png`" :size="46" raw></WikiImage>
      </div>
      <span class="alt">{{char.alt}}</span>
      <a target="_blank" :href="`/wiki/${char.name}`">
        <span class="name">{{char.name}}</span>
      </a>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop, Model } from 'vue-property-decorator';
import { HRInfo } from '../common/hr.i';
import Rarity from './Rarity.vue';
import { wikiImageUrl } from '../common/api';

@Component({ components: { Rarity } })
export default class CharPortrait extends Vue {
  @Model('change') _phase: number;
  @Prop() char: HRInfo;
  @Prop() initEvolve: number;

  iphase = 0;
  beforeMount() {
    this.changeEvolve();
  }

  @Watch('initEvolve')
  changeEvolve() {
    if (this.char.pic.length > 1) {
      switch (this.initEvolve) {
        case 0:
          this.iphase = 0;
          break;
        case 1:
          const phase1 = this.char.pic.findIndex(v => /-2\.png/.test(v));
          if (phase1 != -1) this.iphase = phase1;
          else this.iphase = 0;
          break;
        case 2:
          const phase2 = this.char.pic.findIndex(v => /-3\.png/.test(v));
          if (phase2 != -1) this.iphase = phase2;
          break;
        case 3:
          const skin = this.char.pic.findIndex(v => /-.+?-\d\./.test(v));
          if (skin != -1) this.iphase = skin;
          break;
      }
    }
  }

  get phase() {
    if (typeof this._phase === 'undefined') return this.iphase;
    return this._phase;
  }
  set phase(val) {
    if (typeof this._phase === 'undefined') this.iphase = val;
    this.$emit('change', val);
  }

  getPhase(num: number) {
    return wikiImageUrl(this.phases[num]);
  }
  get phases() {
    return this.char.pic.map(v => v.replace('.png', '_p.png'));
  }
  phaseLoop() {
    if (this.phase + 1 < this.char.pic.length) this.phase++;
    else this.phase = 0;
  }
}
</script>
<style lang="less" scoped>
// 棋盘背景
.charbg-mask(@color1: #301d0a, @color2: #795b3a) {
  // 背景
  &::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    background-color: @color2;
    background-image: linear-gradient(45deg, @color1 25%, transparent 25%, transparent 75%, @color1 75%, @color1),
      linear-gradient(-45deg, @color1 25%, transparent 25%, transparent 75%, @color1 75%, @color1);
    background-size: 60px 60px;
    // filter: blur(3px); 在移动端会造成很严重的性能问题
    opacity: 0.4;
    mask-image: linear-gradient(160deg, transparent 34%, #000 35%, #000 80%, transparent 90%);
  }
}
.char-portrait {
  display: inline-block;
  position: relative;
  width: 90px;
  height: 206px;
  user-select: none;
  .pic {
    position: absolute;
    width: 90px;
    height: 180px;
    display: flex;
    align-items: center;
    img {
      position: absolute;
      width: 100%;
      pointer-events: none;
    }
  }
  &.r1,
  &.r2,
  &.r3 {
    .charbg-mask(#cecece, #87888a);
  }
  &.r4 {
    .charbg-mask(#97a8af, #aac1f1);
  }
  &.r5 {
    .charbg-mask(#a09277, #d4c47c);
  }
  &.r6 {
    .charbg-mask();
  }

  .char-header {
    margin: 2px 0 0 2px;
    position: relative;
    height: 20px;
    &::after {
      content: '';
      position: absolute;
      height: 33px;
      width: 100%;
      margin: -2px;
      background-image: linear-gradient(160deg, #181818, #2c2c2c 24%, transparent 26%);
      z-index: 0;
    }
    .pro {
      color: #fff;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      background: linear-gradient(45deg, #1f1e1e, #232323);
      position: absolute;
      z-index: 1;
    }
    .rarity {
      display: inline-block;
      font-size: 24px;
      transform: scale(0.5);
      transform-origin: 0% 0%;
      white-space: nowrap;
      position: absolute;
      left: 20px;
      color: #f5e023;
    }
  }
  .mask {
    transform: scale(1.05);
    position: absolute;
    bottom: 0px;
    height: 134px;
    width: 100%;
    // background-image: linear-gradient(25deg, transparent, transparent 14%, #232323 15%, #232323 30%, #565623 40%, #fef7de 41%, #e7d07a 47%, transparent 60%);
    &::after {
      content: '';
      position: absolute;
      bottom: 0px;
      margin: 0.2em;
    }
  }
  &.r1 .mask {
    background-image: linear-gradient(25deg, transparent, transparent 14%, #232323 15%, #232323 30%, #585858 40%, #ffffff 41%, #ffffffc5 47%, transparent 60%);
  }
  &.r2 .mask {
    background-image: linear-gradient(25deg, transparent, transparent 14%, #232323 15%, #232323 30%, #405623 40%, #dce537 41%, #c4e763c5 47%, transparent 60%);
  }
  &.r3 .mask {
    background-image: linear-gradient(25deg, transparent, transparent 14%, #232323 15%, #232323 30%, #233d56 40%, #489dec 41%, #489decc5 47%, transparent 60%);
  }
  &.r4 .mask {
    background-image: linear-gradient(25deg, transparent, transparent 14%, #232323 15%, #232323 30%, #756d7e 40%, #e0ddeb 41%, #eed4eec5 47%, transparent 60%);
  }
  &.r5 .mask {
    background-image: linear-gradient(25deg, transparent, transparent 14%, #232323 15%, #232323 30%, #565623 40%, #fef7de 41%, #e7d07a 47%, transparent 60%);
  }
  &.r6 .mask {
    background-image: linear-gradient(25deg, transparent, transparent 14%, #232323 15%, #232323 30%, #2e2e2e 30.1%, #64433a 38%, #814b3b 40%, #ffd16db4 41%, transparent 60%);
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;

      background-image: radial-gradient(#fff 30%, transparent 0), radial-gradient(#fff 30%, transparent 0), linear-gradient(130deg, #d66400, #f0e659);
      background-blend-mode: lighten;
      mask-image: linear-gradient(25deg, transparent 37%, #000 41%, transparent 52%);
      background-position: 0 0, 2.5px 2.5px, 0 0;
      background-size: 5px 5px, 5px 5px, auto auto;
    }
  }
  .misc {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 68px;
    background: linear-gradient(25deg, #565656, #565656 21%, #232323 22%, #232323 30%, transparent 60%);
    .name {
      position: absolute;
      bottom: 4px;
      right: 4px;
      display: block;
      color: white;
      font-size: 17px;
      font-family: systHeavy;
      font-weight: 600;
      text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
    }
    .alt {
      position: absolute;
      bottom: 22px;
      right: 4px;
      color: white;
      // 强制解除浏览器字体大小限制
      font-size: 22px;
      transform: scale(0.5); // 实际字体大小=11px
      transform-origin: 100% 100%;
      font-family: systHeavy;
      white-space: nowrap;
      text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
    }
    .logo {
      position: absolute;
      left: 22px;
      top: 22px;
      transform: perspective(400px) rotate3d(0, 1, 0, 0deg);
      opacity: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 0;
      width: 0;
      img {
        max-height: 36px;
      }
    }
    // 精英化变更立绘
    .evolve {
      position: absolute;
      cursor: pointer;
      transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
      opacity: 0;
      transition: 0.5s;
      img {
        pointer-events: none;
      }
    }
  }
  &:hover {
    .misc {
      .logo.evol {
        transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
        opacity: 0;
      }
      .evolve {
        transform: perspective(400px) rotate3d(0, 1, 0, 0deg);
        opacity: 1;
      }
    }
  }
}

.flip-enter-active {
  animation: flipOutY 0.5s reverse;
}
.flip-leave-active {
  animation: flipOutY 0.5s;
}
@keyframes flipOutY {
  from {
    transform: perspective(400px);
    opacity: 1;
  }

  30% {
    transform: perspective(400px) rotate3d(0, 1, 0, -15deg);
    opacity: 1;
  }

  to {
    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
    opacity: 0;
  }
}
</style>
