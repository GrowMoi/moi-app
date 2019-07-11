import { SIDE_MENU_CLOSE, SIDE_MENU_OPEN } from './actionTypes'

export const sideMenuOpen = () => dispatch => {
  dispatch({
    type: SIDE_MENU_OPEN,
  });
}

export const sideMenuClose = () => dispatch => {
  dispatch({
    type: SIDE_MENU_CLOSE,
  });
}

export const setSideMenuWidth = () => dispatch => {

}
