class Pizza {
    constructor(nome, preco) {
        this.nome = nome
        this.preco = preco
    }
 
    descricao() {
        return `Pizza ${this.nome} por R$ ${this.preco.toFixed(2)}`
    }
}
 
class PizzaDoce extends Pizza {
    descricao() {
        return `${this.nome} (Doce) - Uma sobremesa deliciosa`
    }
}
 
class PizzaTradicional extends Pizza {
    descricao() {
        return `${this.nome} (Tradicional) - Massa crocante e muito queijo`
    }
}
 
class PizzaVegana extends Pizza {
    descricao() {
        return `${this.nome} (Vegana) - Sabor e leveza sem ingredientes de origem animal`
    }
}
 
// funções de armazenamento
function carregarPizzas() {
    return JSON.parse(localStorage.getItem('pizzas')) || []
}
 
function salvarPizzas(pizzas) {
    localStorage.setItem('pizzas', JSON.stringify(pizzas))
}
 
function renderizar() {
    const lista = document.getElementById("lista")
    const pizzas = carregarPizzas()
 
    lista.innerHTML = ''
 
    pizzas.forEach( (p, index) => {
 
        const card = document.createElement('div')
        card.className = 'card'
        card.innerHTML =    `
            <h3>${p.nome}</h3>
            <p>${p.descricao}</p>
            <p> <strong>R$ ${p.preco.toFixed(2)}</strong> </p>
            <button onclick="excluirPizza(${index})">Excluir</button>
        `
 
        lista.appendChild(card)
    } )
}
 
function excluirPizza(index) {
    const pizzas = carregarPizzas()
 
    pizzas.splice(index, 1)
    salvarPizzas(pizzas)
    renderizar() 
}
 
// Limpar o localStorage
document.getElementById('limpartudo').addEventListener('click', () => {
 
    if (confirm('Tem certeza? Todas as pizzas serão apagadas')) {
        localStorage.removeItem('pizzas')
        renderizar()
    }
 
})
 
// inserindo os dados do formulário na classe
document.getElementById('pizza-form').addEventListener('submit', (e) => {
    e.preventDefault()
 
    const nome = document.getElementById('nome').value 
    const tipo = document.getElementById('tipo').value
    const preco = parseFloat(document.getElementById('preco').value)
 
    let pizza
 
    switch (tipo) {
        case 'tradicional':
            pizza = new PizzaTradicional(nome, preco)
            break;
 
        case 'doce':
            pizza = new PizzaDoce(nome, preco)
            break;
        
        case 'vegana':
            pizza = new PizzaVegana(nome, preco)
            break;
 
        default:
            pizza = new Pizza(nome, preco)
    }
 
    const pizzas = carregarPizzas()
 
    pizzas.push({
        nome: pizza.nome,
        preco: pizza.preco,
        descricao: pizza.descricao()
    })
 
    salvarPizzas(pizzas)
    renderizar()
 
    e.target.reset()
})
 
renderizar()