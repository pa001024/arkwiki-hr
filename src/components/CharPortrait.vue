<template>
  <div class="char-portrait-container">
    <div class="char-portrait" style="background-image: url(../../public/Amiya-1.png)">
      <div class="header">
        <span class="pro">
          <i :class="['chari-'+$mapIcon(char.job)]"></i>
        </span>
        <Rarity :star="char.star"></Rarity>
      </div>
      <div class="mask" :class="['r'+char.star]"></div>
      <div class="portrait">
        <img src="../../public/logo_rhodes.png" width="24" />
        <br />
        <span class="name">{{char.name}}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator';
import { HRInfo } from '../common/hr.i';
import Rarity from './Rarity.vue';

@Component({ components: { Rarity } })
export default class CharPortrait extends Vue {
  @Prop() char: HRInfo;
}
</script>
<style lang="less" scoped>
.char-portrait-container {
  display: inline-block;
}
.char-portrait {
  width: 90px;
  height: 184px;
  background-color: white;
  background-size: 100% auto;
  background-repeat: no-repeat;
  position: relative;
  .header {
    margin: 2px 0 0 2px;
    display: flex;
    &::before {
      content: '';
      position: absolute;
      height: 33px;
      width: 100%;
      margin: -2px;
      background-image: linear-gradient(160deg, #181818, #2c2c2c 24%, transparent 26%);
    }
    .pro {
      color: #fff;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      background: linear-gradient(45deg, #1f1e1e, #232323);
      z-index: 1;
    }
    .rarity {
      font-size: 12px;
      color: #f5e023;
    }
  }
  .mask {
    transform: scale(1.05);
    position: absolute;
    bottom: 0px;
    height: 96px;
    width: 100%;
    background-image: linear-gradient(25deg, transparent, transparent 14%, #232323 15%, #232323 30%, #565623 40%, #fef7de 41%, #e7d07a 47%, transparent 60%);
    &::after {
      content: '';
      position: absolute;
      bottom: 0px;
      margin: 0.2em;
    }
    &.r1 {
      background-image: linear-gradient(25deg, transparent, transparent 14%, #232323 15%, #232323 30%, #585858 40%, #ffffff 41%, #ffffffc5 47%, transparent 60%);
    }
    &.r2 {
      background-image: linear-gradient(25deg, transparent, transparent 14%, #232323 15%, #232323 30%, #405623 40%, #c4e763 41%, #c4e763c5 47%, transparent 60%);
    }
    &.r3 {
      background-image: linear-gradient(25deg, transparent, transparent 14%, #232323 15%, #232323 30%, #233d56 40%, #489dec 41%, #489decc5 47%, transparent 60%);
    }
    &.r4 {
      background-image: linear-gradient(25deg, transparent, transparent 14%, #232323 15%, #232323 30%, #3f183d 40%, #eed4ee 41%, #eed4eec5 47%, transparent 60%);
    }
    &.r5 {
      background-image: linear-gradient(25deg, transparent, transparent 14%, #232323 15%, #232323 30%, #565623 40%, #fef7de 41%, #e7d07a 47%, transparent 60%);
    }
    &.r6 {
      background-image: linear-gradient(25deg, transparent, transparent 14%, #232323 15%, #232323 30%, #565623 40%, #ffd16db4 41%, transparent 60%);
      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;

        background-image: radial-gradient(#fff 30%, transparent 0), radial-gradient(#fff 30%, transparent 0), linear-gradient(130deg, #f87b32, #f0e659);
        background-blend-mode: lighten;
        mask-image: linear-gradient(25deg, transparent, transparent 37%, #000 41%, transparent 52%);
        background-position: 0 0, 2.5px 2.5px, 0 0;
        background-size: 5px 5px, 5px 5px, auto auto;
      }
    }
  }
  .portrait {
    position: absolute;
    bottom: 0;
    padding: 3px;
    background: linear-gradient(25deg, #565656, #565656 21%, #232323 22%, #232323 30%, transparent 60%);
    .name {
      color: white;
      font-size: 18px;
      font-family: systHeavy;
      font-weight: bold;
    }
  }
}
</style>
