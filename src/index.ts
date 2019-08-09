import Vue, { PluginObject } from 'vue';
import App from './App.vue';
import { JobIcons } from './common/icon';

const ArkPlugin: PluginObject<{}> = {
  install(vue: typeof Vue) {
    vue.prototype.$mapIcon = function(job: string) {
      return JobIcons[job];
    };
  },
};

Vue.use(ArkPlugin);

new Vue({
  el: '#hr-app',
  render: h => h(App),
});
