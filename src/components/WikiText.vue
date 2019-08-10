<template>
  <span>{{renderedText}}</span>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { parseWikitext } from '../common/api';

@Component({ components: {} })
export default class WikiText extends Vue {
  @Prop() src: string;
  renderedText = '';

  mounted() {
    this.loadText()
  }

  async loadText() {
    this.renderedText = await parseWikitext(this.src);
  }
}
</script>
