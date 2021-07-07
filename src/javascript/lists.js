import marked from 'marked';

class Lists {
  constructor(data) {
    this.data = data
    this.containerElement = document.querySelector('#content')

    this._init()
  }


  _init() {
    this.render(this.data)
    window.addEventListener('posts:checked', ({ detail }) => {
      const { id } = detail
      this._getPost(id)

    })
    this.containerElement.addEventListener('click', this._handleClick.bind(this))


    window.addEventListener('lists:rewrite', ({ detail }) => {
      this.render(detail)
      const event = new CustomEvent('posts:active', { detail })
      window.dispatchEvent(event)
    })
  }


  _template(data) {
    const titleHtml = marked(data.title)
    const partsHtml = marked(data.parts)
    const contentHtml = marked(data.content)
    const template = `
      <div class="card mb-3" style="max-width: 100%;">
        <div class="row g-0" height:90%;">
        <div class="col-md-4">
          <img src="${data.image}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-6">
          <div class="card-body">
            <h3 class="card-title">${titleHtml}</h3>
            <p class="card-text"><small class="text-muted">${data.createAt}</small></p>
            <div class="">
              <p class="card-text tegs">#${data.categories}</p>
              <p class="card-text tegs">Уровень сложности: ${data.level}</p>
            </div>
          </div>
        </div>
          <div class="m-3 text">
            <h4>Ингридиенты:</h4>
            <p class="card-text">${partsHtml}</p>
            <h4>Приготовление</h4>
            <p class="card-text">${contentHtml}</p>
          </div>
        </div>
      <div class="mt-auto d-flex p-3">
        <button data-id="${data.id}" type="button" class="btn btn-warning deteleBtn ms-auto me-3 p-3"
        data-action="edit">Редактировать</button>
        <button data-id="${data.id}" type="button" class="btn btn-danger deteleBtn" data-action="remove">Удалить</button>
      </div>

      </div>
    `
    return template
  }


  _handleClick({ target }) {
    if (target.tagName == 'BUTTON') {
      const { action, id } = target.dataset
      this['_' + action + 'Post'](id)
    }
  }


  async _removePost(id) {
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })

    const data = await response.json()

    this.render(data.list[0])
    const event = new CustomEvent('lists:updated', {
      detail: data
    })
    window.dispatchEvent(event)
  }


  _editPost() {
    const event = new CustomEvent('lists:edit', {
      detail: {
        lists: this.data
      }
    })

    window.dispatchEvent(event)
  }


  async _getPost(id) {
    const response = await fetch(`/api/posts/${id}`)

    const dataResponse = await response.json()
    fetch(`/api/posts/${id}`)

    this.data = dataResponse
    this.render(dataResponse)

  }


  render(data) {
    this.containerElement.innerHTML = ''

    if (!data) return

    const tempalte = this._template(data)
    this.containerElement.innerHTML = tempalte
  }
}

export { Lists }
