import React from 'react';
import { View, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Palette, Size } from '../../commons/styles';

const OptionsHeader = styled(View)`
  padding-vertical: ${Size.spaceSmall};
  margin-bottom: ${Size.spaceSmall};
  align-items: center;
  flex-direction: row;
  justify-content: flex-end;
  border-bottom-width: 1;
  border-bottom-color: ${Palette.white.alpha(0.4).css()};
  align-self: stretch;
`;

const ActionsHeader = (props) => {
  const elements = React.Children.toArray(props.children);
  const styles = StyleSheet.create({
    icon: {
      marginLeft: 15,
    },
  });

  return (
    <OptionsHeader>
      {elements.map((icon, i) => {
        const Icon = icon.type;
        return <Icon style={styles.icon} key={i} {...icon.props} />;
      })}
    </OptionsHeader>
  );
};

export default ActionsHeader;
