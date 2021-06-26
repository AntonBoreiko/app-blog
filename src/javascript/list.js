class List {
  constructor(data) {
    this.contsinerElement = document.querySelector('#lists')
    this.data = data

    this._init(this.data)
  }
  _init() {
    this.render(this.data)
    window.addEventListener('lists:updated', ({ detail }) => {
      this.render(detail)
    })
  }
  _template(data) {
    const template = `
      <div class="island__item">
        <h4>${data.title}</h4>
        <time>${data.createdAt}</time>
      </div>
    `
    return template
  }


  render(data) {
    this.contsinerElement.innerHTML = ""
    data.list.forEach(item => {
      const tempalte = this._template(item)

      this.contsinerElement.innerHTML += tempalte

    })
  }
}

export { List }
