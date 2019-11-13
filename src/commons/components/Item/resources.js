const items = {
  1: {
    source: 'inventario1',
    inactive: 'inventario1_inactive',
    disabled: 'inventario1_disabled',
  },
  2: {
    source: 'inventario8',
    inactive: 'inventario8_inactive',
    disabled: 'inventario8_disabled',
  },
  3: {
    source: 'inventario7',
    inactive: 'inventario7_inactive',
    disabled: 'inventario7_disabled',
  },
  4: {
    source: 'inventario10',
    inactive: 'inventario10_inactive',
    disabled: 'inventario10_disabled',
  },
  5: {
    source: 'inventario9',
    inactive: 'inventario9_inactive',
    disabled: 'inventario9_disabled',
  },
  6: {
    source: 'inventario9',
    inactive: 'inventario9_inactive',
    disabled: 'inventario9_disabled',
  },
  7: {
    source: 'inventario7',
    inactive: 'inventario7_inactive',
    disabled: 'inventario7_disabled',
  },
  8: {
    source: 'inventario1',
    inactive: 'inventario1_inactive',
    disabled: 'inventario1_disabled',
  },
}

export default {
  getItem: (type = 1) => {
    if(items[type]) {
      return items[type]
    }

    return {};
  },

  getBox: (itemDisabled = false) => {
    return itemDisabled ? 'item_container' : 'item_container';
  }
}
