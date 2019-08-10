<template>
  <img @error="loadFailed" :src="x1" :width="size" :srcset="`${x1_5} 1.5x, ${x2} 2x, ${x4} 4x`" />
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { wikiImageUrl, parseWikitext, preloadWikiImage } from '../common/api';

@Component({ components: {} })
export default class WikiImage extends Vue {
  @Prop() name: string;
  @Prop() size: number;
  get x1() {
    return wikiImageUrl(this.name, this.size);
  }
  get x1_5() {
    return wikiImageUrl(this.name, ~~(this.size * 1.5));
  }
  get x2() {
    return wikiImageUrl(this.name, this.size * 2);
  }
  get x4() {
    return wikiImageUrl(this.name, this.size * 4);
  }

  loadFailed(err: Error) {
    preloadWikiImage(this.name, this.size);
  }
}
</script>
<style lang="less" scoped>
</style>
