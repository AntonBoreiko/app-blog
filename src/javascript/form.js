import { Modal } from 'bootstrap';

class Form {

  constructor() {
    this.modalElement = document.querySelector('#modalForm')
    this.buttonOpenModalCreateElement = document.querySelector('#buttonOpenModalCreate')
    this.inputTitleElement = document.querySelector('#inputTitle')
    this.textareaContentElement = document.querySelector('#textareaContent')

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
    const content = this.textareaContentElement.value
    const post = this._buildPost(title, content)

    this._send(post)

  }


  _buildPost(title, content) {
    const post = {
      id: Date.now(),
      createdAt: new Date(),
      title,
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
