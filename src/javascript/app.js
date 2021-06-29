import { Form } from './form'
import { List } from './list'
import { Lists } from './lists'


new Form()


fetch('/api/posts')
  .then(response => response.json())
  .then(data => {
    new List(data)

    new Lists(data.list[0])
  })






