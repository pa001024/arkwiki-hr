import Vue from 'vue';
import App from './App.vue';

// 全局组件
import ArkIcon from './components/ArkIcon.vue';
Vue.component('ArkIcon', ArkIcon);
import WikiImage from './components/WikiImage.vue';
Vue.component('WikiImage', WikiImage);
import WikiText from './components/WikiText.vue';
Vue.component('WikiText', WikiText);

new Vue({
  el: '#hr-app',
  render: h => h(App),
});
