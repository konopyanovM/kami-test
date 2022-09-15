export const searchFilter = (array, query) => {
  return array.filter((product) => {
    if (query === '') {
      return product
    }
    if (product?.title.toLowerCase().includes(query.toLowerCase())) {
      return product
    }
  })
}
