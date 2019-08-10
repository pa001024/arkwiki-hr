<template>
  <i class="chari" :class="['chari-'+icon]"></i>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { JobIcons } from '../common/icon';

@Component({ components: {} })
export default class CharIcon extends Vue {
  @Prop() name: string;
  get icon() {
    return JobIcons[this.name];
  }
}
</script>
