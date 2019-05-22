const items = {
  1: {
    source: 'inventario1',
    inactive: 'inventario1_inactive',
    disabled: 'inventario1_disabled',
  },
  2: {
    source: 'inventario2',
    inactive: 'inventario2_inactive',
    disabled: 'inventario2_disabled',
  },
  3: {
    source: 'inventario3',
    inactive: 'inventario3_inactive',
    disabled: 'inventario3_disabled',
  },
  4: {
    source: 'inventario4',
    inactive: 'inventario4_inactive',
    disabled: 'inventario4_disabled',
  },
  5: {
    source: 'inventario9',
    inactive: 'inventario9_inactive',
    disabled: 'inventario9_disabled',
  },
  6: {
    source: 'inventario8',
    inactive: 'inventario8_inactive',
    disabled: 'inventario8_disabled',
  },
  7: {
    source: 'inventario7',
    inactive: 'inventario7_inactive',
    disabled: 'inventario7_disabled',
  },
  8: {
    source: 'inventario5',
    inactive: 'inventario5_inactive',
    disabled: 'inventario5_disabled',
  },
  9: {
    source: 'inventario6',
    inactive: 'inventario6_inactive',
    disabled: 'inventario6_disabled',
  },
  10: {
    source: 'inventario10',
    inactive: 'inventario10_inactive',
    disabled: 'inventario10_disabled',
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
    return itemDisabled ? 'item_container_disabled' : 'item_container';
  }
}
