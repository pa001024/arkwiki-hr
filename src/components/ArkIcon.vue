<template>
  <i class="arkicon" @click="onclick" :class="['arkicon-'+icon]"></i>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { JobIcons } from '../common/icon';

@Component({ components: {} })
export default class ArkIcon extends Vue {
  @Prop() name: string;
  get icon() {
    return JobIcons[this.name] || this.name;
  }
  onclick(e: MouseEvent) {
    this.$emit('click', e);
  }
}
</script>
