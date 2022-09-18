import Home from "../components/home/index.jsx"
import ToDo from "../components/todo/index.jsx"
import Message from "../components/message/index.jsx"
import Person from "../components/person/index.jsx"

const route = [
  {
    path: '/home',
    component: Home,
    meta: {
      title: 'home'
    }
  },
  {
    path: '/todo',
    component: ToDo,
    meta: {
      title: 'todo'
    }
  },
  {
    path: '/message',
    component: Message,
    meta: {
      title: 'message'
    }
  },
  {
    path: '/person',
    component: Person,
    meta: {
      title: 'person'
    }
  },
  {
    path: '/',
    component: Home
  }
]

export default route