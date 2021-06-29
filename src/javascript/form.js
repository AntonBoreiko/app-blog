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


    this.init()
  }


  init() {
    this.instanseModal = new Modal(this.modalElement)

    this.formElement.addEventListener('submit', this._handleSubmit.bind(this))
  }


  _handleSubmit(event) {
    event.preventDefault()

    const title = this.inputTitleElement.value

    const parts = this.inputPartsElement.value

    const categories = this.selectСategoriesElement.value

    const level = this.selectLevelElement.value

    const image = this.inputUrlElement.value

    const content = this.textareaContentElement.value


    const post = this._buildPost(title, content, parts, categories, level, image)

    this._send(post)

  }


  _buildPost(title, content, parts, categories, level, image) {
    const post = {
      id: Date.now(),
      createdAt: new Date().toLocaleDateString(),
      title,
      parts,
      categories,
      level,
      image,
      content
    }

    return post
  }


  _send(data) {
    fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
      .then(response => response.json())
      .then(data => {
        const event = new CustomEvent('lists:updated', {
          detail: data
        })
        window.dispatchEvent(event)

        this.formElement.reset()
        this.instanseModal.hide()
      })
      .catch(error => console.log(error))
  }
}

export { Form }
