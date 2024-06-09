/**
 * @desc 任务列表
 * @author pan
 * @date 2024/06/06
 */

const mockTodoList = [
  {
    content: 'this is an inbox layout',
    completed: false
  },
  {
    content: 'this is a sent mail layout',
    completed: false
  },
  {
    content: 'this is a drafts layout',
    completed: false
  },
  {
    content: 'this is a trash layout',
    completed: false
  },
  {
    content: 'this is a spam layout',
    completed: false
  },
  {
    content: 'this is a follow up layout',
    completed: false
  },
  {
    content: 'this is a follow up layout',
    completed: false
  },
  {
    content: 'this is a follow up layout',
    completed: false
  },
  {
    content: 'this is a follow up layout',
    completed: false
  },
  {
    content: 'this is a follow up layout',
    completed: false
  },
  {
    content: 'this is a follow up layout',
    completed: false
  },
  {
    content: 'this is a follow up layout',
    completed: false
  },
  {
    content: 'this is a follow up layout',
    completed: false
  },
  {
    content: 'this is a follow up layout',
    completed: false
  },
  {
    content: 'this is a follow up layout',
    completed: false
  }
]

let lastChecked

const main = document.querySelector('main')

mockTodoList.map((item, index) => {
  const div = document.createElement('div')
  div.classList.add('todo-item')

  const inputBoxElement = document.createElement('div')
  inputBoxElement.classList.add('input-box')
  div.append(inputBoxElement)

  const inputElement = document.createElement('input')
  inputElement.type = 'checkbox'
  inputElement.checked = item.completed
  inputElement.id = `${index}`
  inputElement.addEventListener('click', handleCheckboxClick)
  inputBoxElement.append(inputElement)

  const labelElement = document.createElement('label')
  labelElement.innerText = item.content
  labelElement.htmlFor = `${index}`

  div.append(inputBoxElement)
  div.append(labelElement)

  main.append(div)
})

const allLabelElement = document.querySelectorAll('label')
const allCheckBoxElement = document.querySelectorAll('input[type="checkbox"]')

function handleCheckboxClick(e) {
  let currentId = this.id
  let lastCheckedId = lastChecked ? lastChecked.id : null

  if (e.shiftKey && this.checked && lastChecked) {
    let start = Math.min(currentId, lastCheckedId)
    let end = Math.max(currentId, lastCheckedId)

    for (let i = start; i <= end; i++) {
      allCheckBoxElement[i].checked = true
      allLabelElement[i].style.textDecoration = 'line-through'
    }
  } else {
    handleCheck(e)
  }
  lastChecked = this
}

function handleCheck(e) {
  allLabelElement.forEach((item, index) => {
    if (item.htmlFor === e.target.id) {
      item.style.textDecoration = e.target.checked ? 'line-through' : 'none'
    }
  })
}

