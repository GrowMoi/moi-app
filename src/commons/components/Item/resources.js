import itemContainer from '../../../../assets/images/items/item_container.png'

const items = {
  1: {
    source: require('../../../../assets/images/items/inventario1.png'),
    inactive: require('../../../../assets/images/items/inventario1_inactive.png'),
  },
  2: {
    source: require('../../../../assets/images/items/inventario2.png'),
    inactive: require('../../../../assets/images/items/inventario2_inactive.png'),
  },
  3: {
    source: require('../../../../assets/images/items/inventario3.png'),
    inactive: require('../../../../assets/images/items/inventario3_inactive.png'),
  },
  4: {
    source: require('../../../../assets/images/items/inventario4.png'),
    inactive: require('../../../../assets/images/items/inventario4_inactive.png'),
  },
  5: {
    source: require('../../../../assets/images/items/inventario5.png'),
    inactive: require('../../../../assets/images/items/inventario5_inactive.png'),
  },
  6: {
    source: require('../../../../assets/images/items/inventario6.png'),
    inactive: require('../../../../assets/images/items/inventario6_inactive.png'),
  },
  7: {
    source: require('../../../../assets/images/items/inventario7.png'),
    inactive: require('../../../../assets/images/items/inventario7_inactive.png'),
  },
  8: {
    source: require('../../../../assets/images/items/inventario8.png'),
    inactive: require('../../../../assets/images/items/inventario8_inactive.png'),
  },
  9: {
    source: require('../../../../assets/images/items/inventario9.png'),
    inactive: require('../../../../assets/images/items/inventario9_inactive.png'),
  },
  10: {
    source: require('../../../../assets/images/items/inventario6.png'),
    inactive: require('../../../../assets/images/items/inventario6_inactive.png'),
  },
}

export default {
  getItem: (type = 1) => {
    if(items[type]) {
      return items[type]
    }

    return {};
  },

  getBox: () => {
    return itemContainer;
  }
}
