import rl from './rl.js'

class RlSet {
  constructor() {
    this.versions = {}
  }

  add(uid) {
    const [seq, agentId] = uid

    if (this.versions[agentId] === undefined) {
      this.versions[agentId] = rl.create(seq)
      return true
    }

    rl.add(this.versions[agentId], seq)
  }

  getMaxSeq(agentId) {
    return this.versions?.[agentId].maxSeq || -1
  }

  remove(uid) {
    const [seq, agentId] = uid
    const agentVersions = this.versions[agentId]
    return agentVersions === undefined || rl.remove(agentVersions, seq)
  }

  has(uid) {
    const [seq, agentId] = uid
    const agentVersions = this.versions[agentId]
    return agentVersions !== undefined && rl.has(agentVersions, seq)
  }

  hasTombstone(uid) {
    const [seq, agentId] = uid
    const agentVersions = this.versions[agentId]
    return agentVersions !== undefined && rl.hasTombstone(agentVersions, seq)
  }
}

export default RlSet
