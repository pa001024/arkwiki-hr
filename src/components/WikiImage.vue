<template>
  <ArkIcon style="color:red;cursor:pointer" @click="reload" name="parts" v-if="failed"></ArkIcon>
  <img
    v-else
    @error="loadFailed"
    :src="x1"
    :width="size"
    :srcset="isRaw ? '' : `${x2} 2x, ${x4} 4x`"
  />
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { wikiImageUrl, parseWikitext, preloadWikiImage } from '../common/api';

@Component({ components: {} })
export default class WikiImage extends Vue {
  @Prop({ required: true }) name: string;
  @Prop() size: number;
  @Prop() max: number;
  @Prop({ type: Boolean }) raw: boolean;

  get isRaw() {
    return typeof this.size === 'undefined' || this.size > this.max || this.raw;
  }
  get x1() {
    return wikiImageUrl(this.name, this.isRaw ? '' : this.size);
  }
  // get x1_5() {
  //   return wikiImageUrl(this.name, ~~(this.size * 1.5));
  // }
  get x2() {
    return wikiImageUrl(this.name, this.size * 2 > this.max ? null : this.size * 2);
  }
  get x4() {
    return wikiImageUrl(this.name, this.size * 4 > this.max ? null : this.size * 4);
  }

  failed = false;

  async reload() {
    console.log(`reload resource ${this.name}|${this.size}px`);
    await preloadWikiImage(this.name, this.size);
    setTimeout(() => {
      this.failed = false;
    }, 500);
  }

  async loadFailed(err: Error) {
    if (!this.raw) {
      this.failed = true;
      await preloadWikiImage(this.name, this.size);
    }
  }
}
</script>
