import { ADD_COUNTER, ADD_TO_CARR } from './mutation-types'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => { return item.iid === payload.iid })

      if (oldProduct) {
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
        resolve('加1')
      } else {
        payload.count = 1
        // state.cartList.push(payload)
        context.commit(ADD_TO_CARR, payload)
        resolve('tian1')
      }
    })

  }
}