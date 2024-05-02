import { createApp } from 'vue';
import App from './App.vue';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import router from './router';
import { createPinia } from 'pinia';

const pinia = createPinia();

// Uncomment the following lines if you want to use piniaPersist
// import piniaPersist from 'pinia-plugin-persist'
// pinia.use(piniaPersist)

const app = createApp(App);
app.use(pinia);
app.use(router); // Add the router plugin
app.mount('#app');
