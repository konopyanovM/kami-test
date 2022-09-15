import { setItem } from './localStorageAPI'

export const loadLocaleStorage = (key, value) => {
  if (!localStorage.getItem(key)) {
    setItem(key, value)
  }
}
