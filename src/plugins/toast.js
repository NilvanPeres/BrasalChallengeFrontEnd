import Vue3Toastify from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


export default {
  install: (app) => {
    app.use(Vue3Toastify, {
      autoClose: 3000, // tempo em milissegundos
      position: 'top-right' // posição das notificações
    });
  }
}
