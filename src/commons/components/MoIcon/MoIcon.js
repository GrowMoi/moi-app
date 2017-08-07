import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Image, TouchableOpacity, View } from 'react-native';
import MoImages from './IconImages';
import Badge from '../Badge/Badge';

const aspectRatio = (17 / 20);
const aspectRatioBadge = 2.2;

const IconContainer = styled(View)`
  position: relative;
`;

const IconImage = styled(Image)`
  width: ${props => props.size};
  height: ${props => (props.type === 'landscape' ? aspectRatio * props.size : props.size)};
`;

const BadgeContainer = styled(View)`
  position: absolute;
  top: 0;
  right: -7;
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
    const {
      name,
      size,
      active,
      source,
      fadeDuration,
      resizeMode,
      onPress,
      badgeValue,
      ...rest
    } = this.props;

    const iconImage = (
      <IconContainer>
        <IconImage
          source={this.sourceIcon.icon}
          size={size}
          resizeMode={resizeMode}
          type={this.sourceIcon.type}
          fadeDuration={fadeDuration}
          {...rest}
        />
        {badgeValue > 0 && (
          <BadgeContainer>
            <Badge value={badgeValue} size={size / aspectRatioBadge} />
          </BadgeContainer>
        )}
      </IconContainer>
    );

    if (onPress) {
      return (
        <TouchableOpacity onPress={onPress}>
          {iconImage}
        </TouchableOpacity>
      );
    }

    return iconImage;
  }
}

MoIcon.defaultProps = {
  size: 60,
  name: 'task',
  fadeDuration: 0,
  resizeMode: 'contain',
  badgeValue: 0,
};

MoIcon.propTypes = {
  name: PropTypes.string,
  size: PropTypes.number,
  active: PropTypes.bool,
  fadeDuration: PropTypes.number,
  source: PropTypes.any,
  resizeMode: PropTypes.string,
  onPress: PropTypes.func,
  badgeValue: PropTypes.number,
};
