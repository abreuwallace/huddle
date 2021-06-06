function getTodayDate() {
    let date = new Date()
    let today = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()
    console.log(today)
  }


class Pendencia {
    constructor(id, nome, local, prazo, criador, descricao = '') {
      this.id = id;
      this.nome = nome;
      this.dataCriacao = getTodayDate()
      this.status = 0 // definindo 0 como o estado Aberto
      this.criador = criador // o usuario deverá passar o seu próprio método getNome() como atributo
      this.local = local
      this.prazo = prazo
      this.descricao = descricao
    }

    //Setters
    setId(id) {this.id = id}

    setNome(nome) {this.nome = nome}

    setDataCriacao(dataCriacao) {this.dataCriacao = dataCriacao}

    setStatus(status) {this.status = status}

    setCriador(criador) {this.criador = criador}

    setLocal(local) {this.local = local}
  
    setPrazo(prazo) {this.prazo = prazo}
   
    // será necessário adicionar um Listener no elemento 'status' do formulário que observe a mudança
    // de 0 para 2, ou seja, de 'Aberto' para 'Concluído' e passe getTodayDate() para o setter abaixo.
    setDataResolucao(dataResolucao) {this.dataResolucao = dataResolucao} 

    setDescricao(descricao) {this.descricao = descricao}

    //Getters
    getId() {return this.id}

    getNome() {return this.nome}

    getDataCriacao() {return this.dataCriacao}

    getStatus() {return this.status}

    getCriador() {return this.criador}

    getLocal() {return this.local}
  
    getPrazo() {return this.prazo}
   
    getDataResolucao() {return this.dataResolucao}

    getDescricao() {return this.descricao}

  }
  