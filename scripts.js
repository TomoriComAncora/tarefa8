const listaDeUsuarios = document.getElementById("listaDeUsuarios");
const formulario = document.querySelector("form");

import { ConsumirApi, RenderizarPag, UsuarioController } from "./js/classes.js";

const api = new ConsumirApi(
  "https://crudcrud.com/api/0ab00ebe9de74932b2384e80a17e22fd/cadastro"
);

const ui = new RenderizarPag(listaDeUsuarios);

new UsuarioController(api, ui, formulario);