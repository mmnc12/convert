// Cotação de moeda do dia
const USD = 5.61
const EUR = 6.24
const GBP = 7.37

// Obtendo os elementos do formulário
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const currency = document.getElementById("currency");
const footer = document.querySelector("main footer");
const description = document.getElementById("description");
const result = document.getElementById("result");

// Manipulando o input amount para receber somente números.
amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g;
  amount.value = amount.value.replace(hasCharactersRegex, "");
})


// Capturando o evento de submit
form.onsubmit = (event) => {
  event.preventDefault();

  switch(currency.value) {
    case "USD":
      convertCurrency(amount.value, USD, "US$");
      break;
    case "EUR":
      convertCurrency(amount.value, EUR, "€");
      break;
    case "GBP":
      convertCurrency(amount.value, GBP, "£");
      break;
  }

}

// Função para converter as moedas
function convertCurrency(amount, price, symbol) {
  try {
    // Exibindo a cotação da moeda selecionada.
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`;

    // Calcula o total
    let total = amount * price; 

    // Verificar se o resultado não é um número.
    if (isNaN(total)) {
      return alert("Por favor, digite o valor corretamente para converter")
    }

    // Formata o valor total
    total = formatCurrencyBRL(total).replace("R$", "")

    // Exibe o resultado total.
    result.textContent = `${total} Reais`

    // Aplica a classe que exibe o footer para mostrar o resultado.
    footer.classList.add("show-result");
  } catch (error) {
    // Remove a classe do footer removendo ele da tela.
    footer.classList.remove("show-result")

    console.log(error);
    alert("Não foi possível converter. Tente novamente mais tarde.")
  }
}

// Formata a moeda em real brasileiro.
function formatCurrencyBRL(value) {
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
}