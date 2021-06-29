class List {
  constructor(data) {
    this.containerElement = document.querySelector('#lists')
    this.data = data

    this._init(this.data)
  }


  _init() {
    this.render(this.data)

    window.addEventListener('lists:updated', ({ detail }) => {
      this.render(detail)
    })

    this.containerElement.addEventListener('click', this._handleClick.bind(this))

    this.containerElement.addEventListener('click', this._handleChecked.bind(this))
  }


  _template(data) {
    const template = `
      <div class="island__item close" data-id="${data.id}">
        <h4>${data.title}</h4>
        <time>${data.createdAt}</time>
      </div>
    `
    return template
  }

  // ПОДУМАТЬ КАК МОЖНО СДЕЛАТЬ ВЫДЕЛЕНИЕ ПО ДРУГОМУ
  _handleChecked({ target }) {
    const itemElement = target.closest('.island__item')

    const itemId = itemElement.dataset.id

    window.addEventListener('posts:checked', ({ detail }) => {
      const { id } = detail
      if ({ id }.id === itemId) {
        itemElement.classList.remove('close')
        itemElement.classList.add('checked')
      } else {
        itemElement.classList.remove('checked')
        itemElement.classList.add('close')
      }
    })
  }
  //

  _handleClick({ target }) {
    const itemElement = target.closest('.island__item')
    if (itemElement) {
      const { id } = itemElement.dataset
      const event = new CustomEvent('posts:checked', {
        detail: { id }
      })
      window.dispatchEvent(event)
    }
  }


  render(data) {
    this.containerElement.innerHTML = ""
    data.list.forEach(item => {
      const tempalte = this._template(item)

      this.containerElement.innerHTML += tempalte

    })
  }
}

export { List }
