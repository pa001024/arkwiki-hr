
<template>
  <div class="selector">
    <div class="header">
      <div class="filter-part genders">
        <div class="title">性别</div>
        <Options :names="names.genders" v-model="filters.genders"></Options>
      </div>
      <div class="filter-part professions">
        <div class="title">职业</div>
        <Options :names="names.professions" v-model="filters.professions" v-slot="{ name }">
          <i :class="['chari-'+name.icon]"></i>
          {{name.name}}
        </Options>
      </div>
      <div class="filter-part tags">
        <div class="title">标签</div>
        <Options :names="names.tags" v-model="filters.tags"></Options>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator';
import Options from './Options.vue';

@Component({ components: { Options } })
export default class Selector extends Vue {
  filters = {
    genders: [],
    professions: [],
    tags: [],
    rairties: [],
  };
  names = {
    genders: ['男', '女'],
    /** 职业 */
    professions: [
      { name: '辅助', icon: 'support' },
      { name: '近卫', icon: 'warrior' },
      { name: '狙击', icon: 'sniper' },
      { name: '术师', icon: 'caster' },
      { name: '特种', icon: 'special' },
      { name: '先锋', icon: 'pioneer' },
      { name: '医疗', icon: 'medic' },
      { name: '重装', icon: 'tank' },
    ],
    tags: ['输出', '防护', '生存', '治疗', '费用回复', '群攻', '减速', '支援', '快速复活', '削弱', '位移', '召唤', '控场', '爆发'],
    rairties: ['新手', '资深干员', '高级资深干员'],
  };

  reset() {}
  swtichOption(key: string, val: string) {}
}
</script>

<style lang="less" scoped>
.selector {
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(../../public/bg_0_rhodes2.png) no-repeat center;
    background-size: cover;
    filter: blur(5px);
    z-index: -1;
    background-size: cover;
  }
}
.filter-part {
  display: flex;
  color: #fff;
  .title {
    display: flex;
    padding: 24px 40px 24px 24px;
    flex-direction: column;
    // background-color: #213a52;
    // background-image: linear-gradient(207deg, #223a53, #142637);
    color: #fff;
    font-size: 18px;
    line-height: 26px;
    letter-spacing: 0.02em;
    text-decoration: none;
    text-transform: uppercase;
  }
}
</style>
