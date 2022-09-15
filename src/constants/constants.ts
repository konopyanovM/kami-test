import { CurrencyEnum } from './enums/CurrencyEnum'

export const DEFAULT_CURRENCY = CurrencyEnum.KZ
export const PRODUCT_ITEMS_PER_PAGE = 5

export const PRODUCT_LIST = 'productList'
export const CITY_LIST = ['almaty', 'astana', 'karagandy', 'oskemen']
export const DEFAULT_CITY = 'almaty'

export const CITIES = [
  { name: 'BasePrice', id: 'base', price: 0 },
  { name: 'Almaty', id: 'almaty', price: 0 },
  { name: 'Astana', id: 'astana', price: 0 },
  { name: 'Karagandy', id: 'karagandy', price: 0 },
  { name: 'Oskemen', id: 'oskemen', price: 0 },
]
