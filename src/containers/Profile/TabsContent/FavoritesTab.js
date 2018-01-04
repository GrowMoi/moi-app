import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import Preloader from '../../../commons/components/Preloader/Preloader';
import { TextBody } from '../../../commons/components/Typography';

const TabContainer = styled(View)`
  flex: 1;
`;

const NotDataToDisplay = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const FavoritesTab = ({ loading, data }) => {
  return (
    <TabContainer>
      {loading && <Preloader />}
      {!loading && ((!!data && data.meta.total_items !== 0) ? (
        <TextBody>Ok</TextBody>
      ) : (
        <NotDataToDisplay>
          <MaterialIcons name='stars' size={35} color="#4f5325" />
          <TextBody>No tienes favoritos</TextBody>
        </NotDataToDisplay>
      ))}
    </TabContainer>
  );
};

FavoritesTab.propTypes = {
  loading: PropTypes.bool,
};

export default FavoritesTab;
