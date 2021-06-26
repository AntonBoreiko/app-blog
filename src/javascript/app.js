import { Form } from './form'
import { List } from './list'
// import './lesson-fech'





new Form()


fetch('/api/posts')
  .then(response => response.json())
  .then(data => new List(data))





  