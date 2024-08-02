class Rabbit extends Object {
  constructor(name) {
    super();
    this.name = name
  }
}

let rabbit = new Rabbit('angela')

let eventMixin = {
  on(eventName, handler) {
    if (!this._eventHandlers) this._eventHandlers = {}
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = []
    }
    this._eventHandlers[eventName].push(handler)
  },

  trigger(eventName, ...args) {
    if (!this._eventHandlers?.[eventName]) return

    this._eventHandlers[eventName].forEach(handle => handle.apply(this, args))
  },

  off(eventName, handler) {
    let handlers = this._eventHandlers?.[eventName]
    if (!handlers) return
    for (let i = 0; i < handlers.length; i++) {
      if (handlers[i] === handler) {
        handlers.splice(i--, 1)
      }
    }
  }
}

class Menu {
  constructor(value) {
    this.value = value
  }

  choose(value) {
    this.trigger('select', value)
  }
}

Object.assign(Menu.prototype, eventMixin)

let menu = new Menu('_menu')

menu.on('select', value => console.log('v menu ', value))

class FormatError extends SyntaxError {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

function delay_(ms) {
  // 你的代码
  return new Promise(resolve => setTimeout(resolve, ms))
}

if (!Promise.allSettled) {
  const rejectHandler = reason => ({status: 'rejected', reason})
  const resolveHandler = value => ({status: 'fulfilled', value})

  Promise.allSettled = function (promises) {
    const convertedPromise = promises.map(promise => Promise.resolve(promise).then(resolveHandler, rejectHandler))
    return Promise.all(convertedPromise)
  }
}

function promisify(func, manyArgs = true) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function callback(err, ...res) {
        if (err) {
          reject(err)
        } else {
          resolve(manyArgs ? res : res[0])
        }
      }

      args.push(callback)
      func.apply(this, args)
    })
  }
}

class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.message}`);
    this.name = 'HttpError'
    this.response = response
  }
}

async function loadJson(url) {
  const response = await fetch(url)
  if (response.status === 200) {
    let json = await response.json()
    return json
  }
  throw new HttpError(response.status)
}

async function demoGithubUser() {
  let name = prompt('Enter a name', 'hviwen')

  try {
    const user = await loadJson(`https://api.github.com/users/${name}`)
    if (user) {
      console.log('full name :', user.name)
      return user
    }
  } catch (err) {
    if (err instanceof HttpError && err.response.status === 404) {
      console.log('no such user')
      return demoGithubUser()
    } else {
      throw err
    }
  }
}

function* pseudoRandom(num) {
  let _num = num
  while (true) {
    _num = _num * 16807 % 2147483647
    yield _num
  }
}

let range = {
  from: 1,
  to: 5,
  * [Symbol.iterator]() {
    for (let i = this.from; i <= this.to; i++) {
      yield i
    }
  }
}

let syncRange = {
  from: 5,
  to: 10,
  async* [Symbol.asyncIterator]() {
    for (let i = this.from; i <= this.to; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      yield i
    }
  }
}

let numbers = []
numbers = new Proxy(numbers, {
  set(target, p, newValue, receiver) {
    if (typeof newValue === 'number') {
      target[p] = newValue
      return true
    } else {
      return false
    }
  }
})
numbers[0] = 1
console.log(numbers)

let hasAbc = {}
hasAbc = new Proxy(hasAbc, {
  ownKeys(target) {
    return ['a', 'b', 'c']
  },
  getOwnPropertyDescriptor(target, p) {
    return {
      enumerable: true,
      configurable: true
    }
  }
})
console.log(Object.keys(hasAbc))

let delProtection = {
  name: 'Pan',
  age: 31,
  _address: 'beijing'
}
delProtection = new Proxy(delProtection, {
  defineProperty(target, property, attributes) {
    if (property in target) {
      if (property.startsWith("_")) {
        return false
      }
      delete target[property]
      return true
    } else {
      return false
    }
  }
})

let user = {
  _name: 'Guest',
  get name() {
    return this._name
  }
}
let userProxy = new Proxy(user, {
  get(target, p, receiver) {
    // return target[p]
    console.log('reflect args >>', ...arguments)
    return Reflect.get(target, p, receiver)
  }
})
let admin = {
  __proto__: userProxy,
  _name: 'Admin'
}

let map = new Map()
let mapProxy = new Proxy(map, {
  get(target, p, receiver) {
    let value = Reflect.get(target, p, receiver)
    return typeof value === 'function' ? value.bind(target) : value
  }
})

class User {
  #name = 'Guest'

  getName() {
    return this.#name
  }
}

let _user = new User()
_user = new Proxy(_user, {
  get(target, p, receiver) {
    let value = Reflect.get(target, p, receiver)
    return typeof value === 'function' ? value.bind(target) : value
  }
})

let handlers = Symbol('handlers')

function makeObservable(target) {
  target[handlers] = []

  target['observe'] = function (handler) {
    this[handlers].push(handler)
  }

  return new Proxy(target, {
    set(target, p, newValue, receiver) {
      let success = Reflect.set(target, p, newValue, receiver)
      if (success) {
        target[handlers].forEach(handler => handler(property, value))
      }
      return success
    }
  })
}

function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args)
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}
