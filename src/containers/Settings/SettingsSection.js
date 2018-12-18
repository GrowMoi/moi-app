import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { Header } from '../../commons/components/Typography';
import { Line } from '../../commons/components/SceneComponents';
import { Size } from '../../commons/styles';

const SectionContent = styled(View)`
  margin-bottom: ${Size.spaceMedium};
  flex: 1;
`;

const StyledLine = styled(Line)`
  margin-bottom: ${Size.spaceMedium};
  margin-top: ${Size.spaceSmall};
`;

const StyledSettingsSection = styled(View)`
  margin-top: ${Size.spaceMedium};
  flex: 1;
`;

const SettingsSection = ({ children, title }) => (
  <StyledSettingsSection>
    <Header heavy>{title}</Header>
    <StyledLine size={2} />
    <SectionContent>
      {children}
    </SectionContent>
  </StyledSettingsSection>
);

SettingsSection.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
};

export default SettingsSection;
