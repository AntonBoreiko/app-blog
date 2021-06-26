class Lists {
  constructor(data) {
    this.data = data
    this.containerElement = document.querySelector('#content')
  }

  _template(data) {
    const template = `
      <article class="">
        // <img src="${data.img}" class="">
        <h2>${data.title}</h2>
        <time>${data.createdAt}</time>
      </article>
    `
    return template
  }

}




export { Lists }
