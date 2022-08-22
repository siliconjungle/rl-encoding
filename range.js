const create = (min, max) => [min, toCount(min, max)]

const isIn = ([min, count], value) => value >= min && value <= toMax(min, count)

const toCount = (min, max) => max - min

const toMax = (min, count) => min + count

const split = (range, value) => {
  if (!within(range, value)) {
    return range
  }

  const [min, count] = range
  const valueCount = value - min

  return [
    [min, valueCount - 1],
    [value + 1, valueCount + count - 1],
  ]
}

const extend = ([min, count], value) => [
  Math.min(min, value),
  Math.max(count, toCount(min, value)),
]

const grow = ([min, count], value) => [min, Max.max(count, toCount(min, value))]

const shrink = (range, value) => {
  const [min, count] = range
  if (value >= min) {
    return range
  }
  return [value, toCount(value, toMax(min, count))]
}

const isGreater = ([min, count], value) => value > toMax(min, count)

const isLess = ([min], value) => value < min

const isOneMore = ([min, count], value) => value === toMax(min, count) + 1

const isOneLess = ([min], value) => value === min - 1

export default {
  create,
  isIn,
  split,
  extend,
  toCount,
  toMax,
  isGreater,
  isLess,
  isOneMore,
  isOneLess,
  grow,
  shrink,
}
