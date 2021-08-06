class List {
  constructor(data) {
    this.containerElement = document.querySelector('#lists')
    this.data = data
    this.activeItemElement = null

    this._init(this.data)
  }


  _init() {
    this.render(this.data) 

    window.addEventListener('lists:updated', ({ detail }) => {
      const { id } = detail

      this.containerElement.innerHTML = ""

      detail.list.forEach(item => {
        const tempalte = this._template(item)

        this.containerElement.innerHTML += tempalte
      })

      this._toggleItem(document.querySelector('.island__item'))
    })


    this.containerElement.addEventListener('click', this._handleClick.bind(this))

    window.addEventListener('posts:active', ({ detail }) => {
      const activeElement = document.querySelectorAll('.island__item')

      activeElement.forEach(item => {
        const { id } = detail
        if (id == item.dataset.id) {
          this._toggleItem(item)
        }
      })
    })
  }


  _template(data) {
    const template = `
      <div class="island__item close" data-id="${data.id}">
          <h4  >${data.title}</h4>
          <time>${data.createAt}</time>
      </div>
    `
    return template
  }


  _toggleItem(element) {
    if (this.activeItemElement) {
      this.activeItemElement.classList.remove('island__item_active')
    }

    if (!element) return

    element.classList.add('island__item_active')
    this.activeItemElement = element
  }


  _handleClick({ target }) {
    const itemElement = target.closest('.island__item')
    if (itemElement) {
      this._toggleItem(itemElement)

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
    this._toggleItem(document.querySelector('.island__item'))
  }
}

export { List }
