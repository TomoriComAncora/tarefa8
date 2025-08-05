const botaoCadastro = document.getElementById("cadastrar");
const listaDeUsuarios = document.getElementById("listaDeUsuarios");

const limpaCampos = () => {
  const nome = (document.getElementById("nome").value = "");
  const email = (document.getElementById("email").value = "");
};

const renderizar = () => {
  fetch("https://crudcrud.com/api/2edf8aa3f84c4cb8bf707d4fb39271c9/cadastro")
    .then((response) => response.json())
    .then((data) => {
      listaDeUsuarios.innerHTML = "";
      data.forEach((usuarios) => {
        const li = document.createElement("li");

        const div = document.createElement("div");
        const nome = document.createElement("p");
        nome.textContent = usuarios.name;
        const email = document.createElement("p");
        email.textContent = usuarios.email;
        div.appendChild(nome);
        div.appendChild(email);

        const botao = document.createElement("button");
        botao.classList.add("botao-excluir");
        botao.textContent = "X";
        botao.onclick = () => excluirUsuario(usuarios._id);

        li.appendChild(div);
        li.appendChild(botao);

        listaDeUsuarios.appendChild(li);
      });
    });
};

renderizar();

botaoCadastro.addEventListener("click", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const nome = document.getElementById("nome").value;

  fetch("https://crudcrud.com/api/2edf8aa3f84c4cb8bf707d4fb39271c9/cadastro", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nome,
      email: email,
    }),
  })
    .then((response) => response.json())
    .then((usuarios) => {
      const li = document.createElement("li");

      const div = document.createElement("div");
      const nome = document.createElement("p");
      nome.textContent = usuarios.name;
      const email = document.createElement("p");
      email.textContent = usuarios.email;
      div.appendChild(nome);
      div.appendChild(email);

      const botao = document.createElement("button");
      botao.classList.add("botao-excluir");
      botao.textContent = "X";
      botao.onclick = () => excluirUsuario(usuarios._id);

      li.appendChild(div);
      li.appendChild(botao);

      listaDeUsuarios.appendChild(li);
    });

  limpaCampos();
});

const excluirUsuario = (id) => {
  console.log(id);
  fetch(
    `https://crudcrud.com/api/2edf8aa3f84c4cb8bf707d4fb39271c9/cadastro/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    }
  )
    .then((response) => {
      alert("Exclusão realizada com sucesso!");
      renderizar();
    })
    .catch((err) => {
      alert("Erro ao realizar cadastro!");
      console.log("Erro: ", err, " :fim");
    });
};
