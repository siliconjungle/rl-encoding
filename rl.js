import range from './range.js'

const create = (seq) => ({
  seqs: [seq],
  maxSeq: seq,
})

const add = (rl, seq) => {
  const { seqs, maxSeq } = rl

  if (seq <= maxSeq) {
    return false
  }

  rl.maxSeq = Math.max(maxSeq, seq)

  if (seqs.length === 0) {
    seqs.push(seq)
    return true
  }

  const lastSeqs = seqs[seqs.length - 1]

  if (!Array.isArray(lastSeqs)) {
    if (lastSeqs === seq + 1) {
      seqs[seqs.length - 1] = [lastSeqs, range.toCount(lastSeqs, seq)]
      return true
    }
    return false
  }

  if (range.isOneMore(lastSeqs, seq)) {
    seqs[seqs.length - 1] = range.extendMax(seqs[seqs.length - 1], seq)
    return true
  }

  seqs.push(seq)
  return true
}

const binarySearch = (seqs, seq, min, max) => {
  if (min > max) {
    return -1
  } else {
    const mid = (min + max) * 0.5
    if (Array.isArray(seqs[mid])) {
      if (range.isIn(seqs[mid], seq)) {
        return mid
      } else if (range.isGreater(seqs[mid], seq)) {
        return binarySearch(seqs, seq, mid + 1, max)
      }
    } else {
      if (seqs[mid] === seq) {
        return mid
      } else if (seq > seqs[mid]) {
        return binarySearch(seqs, seq, mid + 1, max)
      }
    }
    return binarySearch(seqs, seq, min, mid - 1)
  }
}

const getIndex = ({ seqs, maxSeq }, seq) =>
  seqs.length === 0 || seq > maxSeq
    ? -1
    : binarySearch(seqs, seq, 0, seqs.length - 1)

const remove = (rl, seq) => {
  const index = getIndex(rl, seq)
  if (index === -1) {
    return false
  }

  const currentSeqs = rl.seqs[index]
  if (Array.isArray(currentSeqs)) {
    const [min, count] = currentSeqs
    if (min === seq) {
      rl.seqs[index] = count === 1 ? min + 1 : [min + 1, count - 1]
    } else if (range.toMax(min, count) === seq) {
      if (count === 1) {
        rl.seqs[index] = min
      } else {
        currentSeqs[1] -= 1
      }
    }
  } else {
    rl.seqs.splice(index, 1)
  }
  return true
}

const has = (rl, seq) => {
  const { seqs, maxSeq } = rl
  if (seqs.length === 0 || seq > maxSeq) {
    return false
  }

  const minSeq = Array.isArray(seqs[0]) ? seqs[0][0] : seqs[0]
  return seq < minSeq || getIndex(rl, seq) !== -1
}

const hasTombstone = (rl, seq) => seq < rl.maxSeq && !has(rl, seq)

export default {
  create,
  getIndex,
  add,
  remove,
  has,
  hasTombstone,
  binarySearch,
}
