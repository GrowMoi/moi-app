import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import ActionSheetOption from './ActionSheetOption';
import Palette from '../../styles/palette';
import MoiModal from '../../../containers/Modal/MoiModal';

class ModalOptions extends Component {

  closeModal = e => {
    const { onCloseRequest } = this.props;
    if (onCloseRequest) onCloseRequest(e);
  }

  render() {
    const {
      animationType,
      transparent,
      isOpen,
      onDismiss = () => null,
      options,
      cancelLabel,
    } = this.props

    const bgOpacity = { backgroundColor: Palette.dark.alpha(0.5).css() }

    return (
      <MoiModal
        visible={isOpen}
        animationType={animationType}
        transparent={transparent}
        onDismiss={onDismiss}>

        <TouchableOpacity
          style={[styles.root, bgOpacity]}
          onPress={this.closeModal}
          activeOpacity={1}
        >
          <View style={styles.optionsContainer}>
            {options &&
              (options || []).map((option, i) => {
                return (
                  <ActionSheetOption
                    key={`option-${option.id || i}`}
                    onPress={option.fn}
                    label={option.label || `Option ${i}`}
                    cancel={option.cancel}
                  />
                )
              })
            }
            {cancelLabel && <ActionSheetOption
              onPress={this.closeModal}
              label={cancelLabel}
              cancel
            />}
          </View>
        </TouchableOpacity>

      </MoiModal>
    )
  }
}

ModalOptions.defaultProps = {
  isOpen: false,
  animationType: 'fade',
  transparent: true,
  opacity: 0.2
}

ModalOptions.propTypes = {
  isOpen: PropTypes.bool,
  animationType: PropTypes.oneOf(['fade', 'slide', 'none']),
  transparent: PropTypes.bool,
  opacity: PropTypes.number,
  onCloseRequest: PropTypes.func,
  children: PropTypes.any,
  onClickOption: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }))
}

const styles = StyleSheet.flatten({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
  },

  optionsContainer: {
    alignSelf: 'stretch',
    marginBottom: 10,
  },

  options: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: Palette.white,
    padding: 10,
    borderRadius: 5,
  },

  buttonCancel: {

  },
  text: {
    color: 'red'
  }
})

export default ModalOptions
