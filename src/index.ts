import Vue, { PluginObject } from 'vue';
import App from './App.vue';
import { JobIcons } from './common/icon';

const ArkPlugin: PluginObject<{}> = {
  install(vue: typeof Vue) {
    // 4. 添加实例方法
    vue.prototype.$mapIcon = function(job: string) {
      return JobIcons[job];
    };
  },
};
declare module 'vue/types/vue' {
  export interface Vue {
    $mapIcon(name: string): string;
  }
}

Vue.use(ArkPlugin);

new Vue({
  el: '#app',
  render: h => h(App),
});
