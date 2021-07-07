import { Modal } from 'bootstrap';


class Form {
  constructor() {
    this.modalElement = document.querySelector('#modalForm')

    this.buttonOpenModalCreateElement = document.querySelector('#buttonOpenModalCreate')

    this.inputTitleElement = document.querySelector('#inputTitle')
    this.inputPartsElement = document.querySelector('#inputParts')
    this.selectСategoriesElement = document.querySelector('#selectСategories')
    this.selectLevelElement = document.querySelector('#selectLevel')
    this.textareaContentElement = document.querySelector('#textareaContent')
    this.inputUrlElement = document.querySelector('#inputUrl')

    this.formElement = document.querySelector('#form')

    this.inputIdElement = document.querySelector('#inputId')

    this.inputCreateAtElement = document.querySelector('#inputCreatedAt')

    this.init()
  }


  init() {
    this.instanseModal = new Modal(this.modalElement)

    this.formElement.addEventListener('submit', this._handleSubmit.bind(this))

    this.buttonOpenModalCreateElement.addEventListener('click', this._handleClickButtonOpenModal.bind(this))

    window.addEventListener('lists:edit', this._handleListsEdit.bind(this))
  }


  _handleSubmit(event) {
    event.preventDefault()

    const post = this._buildPost()
    this._send(post)
  }


  _handleClickButtonOpenModal() {
    this.formElement.setAttribute('method', 'POST')
  }


  _handleListsEdit({ detail }) {
    this.formElement.setAttribute('method', 'PUT')
    this._enterForm(detail.lists)

    this.instanseModal.show()
  }


  _buildPost() {
    const post = {}
    const formData = new FormData(this.formElement)

    for (let [key, value] of formData) {
      post[key] = value
    }

    if (!post.id) post.id = Date.now()
    if (!post.createAt) post.createAt = new Date().toLocaleDateString()

    return post
  }


  _enterForm(data) {
    this.inputIdElement.value = data.id

    this.inputCreateAtElement.value = data.createAt

    this.inputTitleElement.value = data.title

    this.inputPartsElement.value = data.parts

    this.selectСategoriesElement.value = data.categories

    this.selectLevelElement.value = data.level

    this.inputUrlElement.value = data.image

    this.textareaContentElement.value = data.content
  }


  _resetForm() {
    this.formElement.reset()

    this.inputIdElement.value = ''
    this.inputCreateAtElement.value = ''
  }


  async _send(data) {
    const method = this.formElement.getAttribute('method')
    let url = '/api/posts'
    url = method == 'PUT' ? url + '/' + data.id : url

    const response = await fetch(url, {
      method,
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
    const dataResponse = await response.json()

    const event = new CustomEvent('lists:updated', {
      detail: dataResponse,

    })
    window.dispatchEvent(event)

    this._resetForm()
    this.instanseModal.hide()


    const lastEvent = new CustomEvent('lists:rewrite', {
      detail: data
    })

    window.dispatchEvent(lastEvent)
  }

}

export { Form }
