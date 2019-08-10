<template>
  <span class="rarity">
    <i class="chari chari-star" v-for="i in list" :key="i"></i>
  </span>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({ components: {} })
export default class Rarity extends Vue {
  @Prop() star: number;
  get list() {
    return Array(this.star).map((v, i) => i);
  }
}
</script>
<style lang="less" scoped>
.rarity {
  display: inline-block;
  letter-spacing: -0.25em;
}
.rarity i {
  transform: rotate(12deg);
  display: inline-block;
  color: inherit;
  text-shadow: 0 0 5px black;
}
</style>
