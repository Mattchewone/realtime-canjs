import canSet from 'can-set'

/*
 * This is the most basic default algebra for feathers-friendly models.
 * Any new algebras should start with this and extend as necessary.
 */

const sortFn = (sortPropValue, item1, item2) => {
  const keys = Object.keys(sortPropValue)
  let result = 0

  keys.some(key => {
    if (item1[key] < item2[key]) result = -1
    else if (item1[key] > item2[key]) result = 1
    return !!result
  })

  return result
}

const makeAlgebra = (fields) => new canSet.Algebra(
  canSet.comparators.id('_id'),
  canSet.props.sort('$sort', sortFn),
  canSet.props.offsetLimit('$skip', '$limit'),
  Object.assign({
    $or: function () {
      return true
    }
  }, fields)
)

export default makeAlgebra
