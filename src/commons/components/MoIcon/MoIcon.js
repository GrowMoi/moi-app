import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Image } from 'react-native';
import MoImages from './IconImages';

const aspectRatio = (17 / 20);

const IconImage = styled(Image)`
  width: ${props => props.size};
  height: ${props => (props.type === 'landscape' ? aspectRatio * props.size : props.size)};
`;

export default class MoIcon extends Component {
  get sourceIcon() {
    const { name, active } = this.props;
    const moiCons = Object.keys(MoImages);

    const nameActive = `${name}_active`;
    const hasActiveState = moiCons.includes(nameActive);
    const nameExist = moiCons.includes(name);

    if (!nameExist) {
      return {
        icon: MoImages.question.icon,
        type: MoImages.question.type,
      };
    }

    return {
      icon: active && hasActiveState ? MoImages[nameActive].icon : MoImages[name].icon,
      type: active && hasActiveState ? MoImages[nameActive].type : MoImages[name].type,
    };
  }

  render() {
    const { name, size, active, source, fadeDuration, ...rest } = this.props;

    return (
      <IconImage
        source={this.sourceIcon.icon}
        size={size}
        type={this.sourceIcon.type}
        fadeDuration={fadeDuration}
        {...rest}
      />
    );
  }
}

MoIcon.defaultProps = {
  size: 60,
  name: 'task',
  fadeDuration: 0,
};

MoIcon.propTypes = {
  name: PropTypes.string,
  size: PropTypes.number,
  active: PropTypes.bool,
  fadeDuration: PropTypes.number,
  source: PropTypes.any,
};
