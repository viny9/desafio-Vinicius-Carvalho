class Cardapio {
    comidas = [{
        codigo: 'cafe',
        descricao: 'Café',
        valor: 3.00
    },
    {
        codigo: 'chantily',
        descricao: 'Chantily (extra do Café)',
        extra: 'cafe',
        valor: 1.50
    },
    {
        codigo: 'suco',
        descricao: 'Suco Natural',
        valor: 6.20
    },
    {
        codigo: 'sanduiche',
        descricao: 'Sanduíche',
        valor: 6.50
    },
    {
        codigo: 'queijo',
        descricao: 'Queijo (extra do Sanduíche)',
        extra: 'sanduiche',
        valor: 2.00
    },
    {
        codigo: 'salgado',
        descricao: 'Salgado',
        valor: 7.25
    },
    {
        codigo: 'combo1',
        descricao: '1 Suco e 1 Sanduíche',
        valor: 9.50
    },
    {
        codigo: 'combo2',
        descricao: '1 Café e 1 Sanduíche',
        valor: 7.50
    }]

    pegarComidaPorCodigo(codigo) {
        const comida = this.comidas.find(comida => comida.codigo === codigo)

        if (!comida) { throw new Error('Item inválido!') }

        return comida
    }
}

class CaixaDaLanchonete {
    valorTotal = 0
    cardapio = new Cardapio()

    calcularValorDaCompra(metodoDePagamento, itens) {
        try {
            if (itens.length === 0) { throw new Error('Não há itens no carrinho de compra!') }
            this.checarItemExtraSemPrincipal(itens)
            this.pegarValorTotal(itens)
            this.aplicarDescontoETaxas(metodoDePagamento)

            this.valorTotal = this.valorTotal.toFixed(2).toString().replace('.', ',')

            return `R$ ${this.valorTotal}`;
        } catch (error) {
            return error.message
        }
    }

    checarItemExtraSemPrincipal(itens) {
        const codigos = itens.map(item => item.split(",")[0])

        codigos.forEach(codigo => {
            const comida = this.cardapio.pegarComidaPorCodigo(codigo)

            if (comida.extra != undefined && !codigos.includes(comida.extra)) {
                throw new Error('Item extra não pode ser pedido sem o principal')
            }
        })
    }

    pegarValorTotal(itens) {
        let total = 0

        itens.forEach(item => {
            const quantidade = Number(item.split(',')[1]) || 0
            const codigo = item.split(",")[0]

            if (quantidade === 0) { throw new Error('Quantidade inválida!') }

            const comida = this.cardapio.pegarComidaPorCodigo(codigo)
            total += (comida.valor * quantidade)
        });

        this.valorTotal = total
    }

    aplicarDescontoETaxas(metodoDePagamento) {
        switch (metodoDePagamento) {
            case 'dinheiro':
                const disconto = this.valorTotal * 0.05
                this.valorTotal = this.valorTotal - disconto
                break;

            case 'credito':
                this.valorTotal = this.valorTotal * 1.03
                break;

            case 'debito':
                this.valorTotal = this.valorTotal
                break;

            default:
                throw new Error('Forma de pagamento inválida!')
        }
    }
}

export { CaixaDaLanchonete };