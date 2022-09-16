export const createProduct = ({
  id,
  src = id,
  images = {},
  description = '',
  title,
  status,
  cities,
  priceStatus,
}: any) => {
  let priceBy = ''
  let basePrice = cities[0].price
  if (priceStatus === true) {
    priceBy = 'base'
  }

  const cityPrices = {}
  cities.forEach((city) => {
    cityPrices[city.id] = city.price ? city.price : basePrice
  })

  return {
    id: +id,
    src,
    images,
    description,
    title,
    status,
    price: cityPrices,
    priceBy,
  }
}
