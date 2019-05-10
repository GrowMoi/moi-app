import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import thumbImage from '../../../assets/images/buttons/slider_button.png';
import { Header } from '../../commons/components/Typography';

const ContainerSwitch = styled(View)`
    flex: 1;
    width: 62;
`;

const LineSwitch = styled(View)`
    position: absolute;
    height: 16;
    width: 60;
    left:1;
    border-width: 2;
    border-radius: 3;
    border-color: #354516;
`;

const TextContainer = styled(View)`
    position: absolute;
    margin-top:-1px;
    height: 22;
    width: 30;
    align-items: center;
    align-self: stretch;
`;

const IconContainer = styled(View)`
    position: absolute;
    top: -3;
    flex:1;
    padding-left: 2px;
    padding-right: 2px;
`;

const IconSwitch = styled(Image)`
    height: 22;
`;


const Switch = ({ toggleValue, onPress }) => {
    const styleIcon = toggleValue ? { right: -3 } : { left: -5 };
    const styleText = toggleValue ? { left: 0 } : { right: 0 };
    const styleLine = toggleValue ? { backgroundColor: '#4a5922' } : { backgroundColor: 'transparent' };
    const stichText = toggleValue ? 'ON' : 'OFF';


    return (

        <ContainerSwitch>
            <LineSwitch style={styleLine}>
                <TextContainer style={styleText}>
                    <Header customSize={11} inverted={!!toggleValue} >{stichText}</Header>
                </TextContainer>
            </LineSwitch>

            <IconContainer style={styleIcon}>
                <TouchableOpacity onPress={() => onPress()} activeOpacity={0.9}>
                    <IconSwitch source={thumbImage} />
                </TouchableOpacity>
            </IconContainer>
        </ContainerSwitch>
    );
}

Switch.propTypes = {
    toggleValue: PropTypes.bool,
    onPress: PropTypes.func,
};

export default Switch;
