import { SIDE_MENU_CLOSE, SIDE_MENU_OPEN  } from '../actions/actionTypes'

const INITIAL_STATE = {
  menuIsOpen: false,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIDE_MENU_CLOSE:
      return { ...state, menuIsOpen: false };
    case SIDE_MENU_OPEN:
      return { ...state, menuIsOpen: true };
    default:
      return state;
  }
}
