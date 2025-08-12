export class ConsumirApi {
  #baseUrl;
  constructor(baseUrl) {
    this.#baseUrl = baseUrl;
  }

  async listar() {
    const respose = await fetch(this.#baseUrl);
    return await respose.json();
  }

  async criar(usuario) {
    const response = await fetch(this.#baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    });
    return await response.json();
  }

  async deletar(id) {
    await fetch(`${this.#baseUrl}/${id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    });
  }
}

export class RenderizarPag {
  #elementUi;
  constructor(elementoUi) {
    this.#elementUi = elementoUi;
  }

  renderizarLista(usuarios, Onexcluir) {
    this.#elementUi.innerHTML = "";
    usuarios.map((usuario) => {
      const li = document.createElement("li");

      const div = document.createElement("div");
      const nome = document.createElement("p");
      nome.textContent = usuario.name;
      const email = document.createElement("p");
      email.textContent = usuario.email;
      div.appendChild(nome);
      div.appendChild(email);

      const botao = document.createElement("button");
      botao.classList.add("botao-excluir");
      botao.textContent = "X";
      botao.onclick = () => Onexcluir(usuario._id);

      li.appendChild(div);
      li.appendChild(botao);

      this.#elementUi.appendChild(li);
    });
  }
}

export class UsuarioController {
  #api;
  #ui;
  #formulario;
  #usuarios;
  constructor(api, ui, formulario) {
    this.#api = api;
    this.#ui = ui;
    this.#formulario = formulario;

    this.#usuarios = [];

    this.#formulario.addEventListener("submit", async (e) => {
      e.preventDefault();
      this.cadastrartUsuario();
    });
    this.carregarLista();
  }

  async carregarLista() {
    this.#usuarios = await this.#api.listar();
    console.log(this.#usuarios);
    this.#ui.renderizarLista(this.#usuarios, (id) => this.deletarUsuario(id));
  }

  async cadastrartUsuario() {
    const nome = this.#formulario.elements.nome.value;
    const email = this.#formulario.elements.email.value;

    await this.#api.criar({ name: nome, email: email });
    this.#formulario.reset();
    await this.carregarLista();
  }

  async deletarUsuario(id) {
    await this.#api.deletar(id);

    this.#usuarios = this.#usuarios.filter((u) => u._id !== id);

    this.#ui.renderizarLista(this.#usuarios, (id) => this.deletarUsuario(id));
  }
}
