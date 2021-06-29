
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
  }


  _template(data) {
    const template = `
      <div class="card mb-3" style="max-width: 100%;">
        <div class="row g-0" style="background-color: #fff; height:90%;">
        <div class="col-md-4">
          <img src="${data.image}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-6">
          <div class="card-body">
            <h3 class="card-title">${data.title}</h3>
            <p class="card-text"><small class="text-muted">${data.createdAt}</small></p>
            <div class="">
              <p class="card-text tegs">#${data.categories}</p>
              <p class="card-text tegs">Уровень сложности: ${data.level}</p>
            </div>
          </div>
        </div>
          <div class="m-3 text">
            <h4>Ингридиенты:</h4>
            <p class="card-text">${data.parts}</p>
            <h4>Приготовление</h4>
            <p class="card-text">${data.content}</p>
          </div>
        </div>
      </div>
    `
    return template
  }


  _getPost(id) {
    fetch(`/api/posts/${id}`)
      .then(response => response.json())
      .then(data => this.render(data))
  }


  render(data) {
    const tempalte = this._template(data)
    this.containerElement.innerHTML = tempalte
  }
}

export { Lists }
