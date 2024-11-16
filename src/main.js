import {router, generateNav} from './router/router.js'
import { initializeScroll} from './utils/scroll.js';

const main = document.getElementById('main');

$(window).on("load", function () {
  initializeScroll(main);
  router()
  generateNav()
});