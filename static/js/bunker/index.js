import { App } from '/static/js/bunker/App.js';
import { Api } from '/static/js/bunker/Api.js';

const api = new Api();
const app = new App(api);

app.init();
