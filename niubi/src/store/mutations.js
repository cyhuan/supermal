import { ADD_COUNTER, ADD_TO_CARR } from './mutation-types'

export default {
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CARR](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}