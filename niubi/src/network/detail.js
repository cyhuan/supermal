import { request } from './request'

export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

export function getRecommend() {
  return request({
    url: '/recommend'
  })
}

export class Goods {
  constructor(itemInfom, columns, services) {
    this.title = itemInfom.title
    this.desc = itemInfom.desc
    this.newPrice = itemInfom.price
    this.oldPrice = itemInfom.oldPrice
    this.discount = itemInfom.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfom.lowNowPrice
  }
}

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
  }
}

export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
