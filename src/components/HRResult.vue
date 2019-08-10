<template>
  <transition-group tag="div" class="hr-result" name="hr-list">
    <!-- <div class="char" v-for="char in results" :key="char.name">
      <div class="stars">{{"★".repeat(char.r)}}</div>
      <div class="name">{{char.name}}</div>
      <div class="pro">
        <i :class="['chari-'+$mapIcon(char.job)]"></i>
        {{char.job}}
      </div>
    </div>-->
    <CharPortrait :initEvolve="evolve" class="result-item" :char="char" v-for="char in results" :key="char.name"></CharPortrait>
  </transition-group>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop, Model } from 'vue-property-decorator';
import { HRInfo } from '../common/hr.i';
import CharPortrait from './CharPortrait.vue';

@Component({ components: { CharPortrait } })
export default class HRResult extends Vue {
  @Prop() evolve: number;
  @Prop() results: HRInfo[];
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
.char {
  display: flex;
  width: 60px;
  height: 80px;
  padding: 12px 8px;
  margin: 4px 2px;
  flex-direction: column;
  justify-content: space-between;
  font-family: Campton, Arial, sans-serif;
  color: #fff;
  letter-spacing: 0.02em;
  text-decoration: none;
  text-transform: uppercase;
  // background-color: #08cc96;
  background-color: #213a52;
  background-image: linear-gradient(207deg, #223a53, #142637);
  font-size: 14px;
  transition: 0.4s;
  .stars {
    font-size: 0.9em;
  }
  .pro {
    font-size: 0.8em;
  }
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
  // animation: flipInX 0.3s reverse;
}

@keyframes flipInX {
  from {
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    animation-timing-function: ease-in;
    opacity: 0;
  }

  40% {
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    animation-timing-function: ease-in;
  }

  60% {
    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    opacity: 1;
  }

  80% {
    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
  }

  to {
    transform: perspective(400px);
  }
}
</style>
