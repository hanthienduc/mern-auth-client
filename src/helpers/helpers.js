import cookie from 'js-cookie'

// set in cookie
export const setCookie = (key, value) => {
  if (typeof window !== 'undefined') {
    cookie.set(key, value, {
      expires: 1
    })
  }
}
// remove from cookie
export const removeCookie = (key) => {
  if (typeof window !== 'undefined') {
    cookie.remove(key, {
      expires: 1
    })
  }
}
// get from cookie such as stored token
// will be useful when we need to make request to server with token
export const getCookie = (key) => {
  if (typeof window !== 'undefined') {
    return cookie.get(key)
  }
}

// set in localStorage
export const setLocalStorage = (key, value) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value))
  }
}
// remove from localStorage
export const removeLocalStorage = (key) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key)
  }
}

// authenticate user by passing data to cookie and localStorage during signIn
export const authenticate = (data, next) => {
  console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE')
  setCookie('token', data.token)
  setLocalStorage('user', data.user)
  next()
}
// access user info from localStorage
export const isAuth = () => {
  if (typeof window !== 'undefined') {
    const cookieChecked = getCookie('token')
    if (cookieChecked) {
      if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'))
      } else {
        return false
      }
    }
  }
}

export const signout = (next) => {
  removeCookie('token')
  removeLocalStorage('user')
  next()
}

export const updateUser = (data, next) => {
  console.log('UPDATE USER IN LOCALSTORAGE HELPERS', data)
  if (typeof window !== 'undefined') {
    let auth = JSON.parse(localStorage.getItem('user'))
    auth = data
    localStorage.setItem('user', JSON.stringify(auth))
  }
  next()
}