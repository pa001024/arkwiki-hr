declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'vue/types/vue' {
  export interface Vue {
    $mapIcon(name: string): string;
  }
}
