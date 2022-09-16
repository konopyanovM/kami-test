export const updateProduct = ({
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
  if (priceStatus === true) {
    priceBy = 'base'
  }

  const cityPrices = cities

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
