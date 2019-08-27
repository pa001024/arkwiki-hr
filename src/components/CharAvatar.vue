<template>
  <div class="char-avatar-container">
    <div class="char-avatar">
      <transition-group name="flip" tag="div" class="pic" :data-phase="phase" @click="changeEvolve">
        <img v-for="(p, h) in phases" :key="h" v-show="phase === h" :src="getPhase(h)" :alt="p" />
      </transition-group>
      <div class="char-header">
        <span class="pro">
          <ArkIcon :name="char.job"></ArkIcon>
        </span>
        <Rarity :star="char.r"></Rarity>
      </div>
      <div class="misc">
        <a target="_blank" :href="`/wiki/${char.name}`">
          <span class="name">{{char.name}}</span>
        </a>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop, Model } from 'vue-property-decorator';
import { HRInfo } from '../common/hr.i';
import Rarity from './Rarity.vue';
import { wikiImageUrl } from '../common/api';

@Component({ components: { Rarity } })
export default class CharAvatar extends Vue {
  @Model('change') _phase: number;
  @Prop() char: HRInfo;
  @Prop() initEvolve: number;

  iphase = 0;
  mounted() {
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
    return this.char.pic.map(v => v.replace('.png', '_a.png'));
  }
  phaseLoop() {
    if (this.phase + 1 < this.char.pic.length) this.phase++;
    else this.phase = 0;
  }
}
</script>
<style lang="less" scoped>
.char-avatar-container {
  display: inline-block;
}
.char-avatar {
  position: relative;
  width: 90px;
  height: 90px;
  user-select: none;
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border: 10px solid #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.6) inset;
    box-sizing: border-box;
  }
  .char-header {
    margin: 2px 0 0 2px;
    position: absolute;
    display: flex;
    .pro {
      color: #fff;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      background: linear-gradient(45deg, #1f1e1e, #232323);
      z-index: 1;
    }
    .rarity {
      font-size: 24px;
      transform: scale(0.5);
      transform-origin: 0% 0%;
      white-space: nowrap;
      color: #f5e023;
      z-index: 1;
    }
  }
  .pic {
    position: absolute;
    width: 90px;
    height: 90px;
    overflow: hidden;
    display: flex;
    align-items: center;
    z-index: 1;
    img {
      position: absolute;
      width: 100%;
      pointer-events: none;
    }
  }
  .misc {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 68px;
    z-index: 2;
    .name {
      position: absolute;
      bottom: 4px;
      right: 4px;
      display: block;
      color: white;
      font-size: 17px;
      font-family: systHeavy;
      font-weight: 600;
      text-align: right;
      text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
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
