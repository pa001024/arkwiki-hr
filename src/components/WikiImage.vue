<template>
  <ArkIcon style="color:red;cursor:pointer" @click="reload" name="parts" v-if="failed"></ArkIcon>
  <img
    v-else
    @error="loadFailed"
    :src="x1"
    :width="size"
    :srcset="isRaw ? '' : `${x1_5} 1.5x, ${x2} 2x, ${x4} 4x`"
  />
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { wikiImageUrl, parseWikitext, preloadWikiImage } from '../common/api';

@Component({ components: {} })
export default class WikiImage extends Vue {
  @Prop({ required: true }) name: string;
  @Prop() size: number;
  @Prop() raw: boolean;

  get isRaw() {
    return typeof this.size === 'undefined' || this.raw;
  }
  get x1() {
    return wikiImageUrl(this.name, this.isRaw ? '' : this.size);
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

  failed = false;

  async reload() {
    console.log(`reload resource ${this.name}|${this.size}px`);
    await preloadWikiImage(this.name, this.size);
    await preloadWikiImage(this.name, this.size * 2); // for x4
    setTimeout(() => {
      this.failed = false;
    }, 500);
  }

  async loadFailed(err: Error) {
    if (!this.raw) {
      await preloadWikiImage(this.name, this.size);
      await preloadWikiImage(this.name, this.size * 2); // for x4
      this.failed = true;
    }
  }
}
</script>
