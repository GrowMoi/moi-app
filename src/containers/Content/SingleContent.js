import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Actions } from 'react-native-router-flux';
import { Ionicons } from '@expo/vector-icons';

import Navbar from '../../commons/components/Navbar/Navbar';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import { BottomBar, BackButton, BackButtonContainer } from '../../commons/components/SceneComponents';
import { ContentBox } from '../../commons/components/ContentComponents';
import actions from '../../actions/neuronActions';
import Preloader from '../../commons/components/Preloader/Preloader';
import { Title, TextBody } from '../../commons/components/Typography';
import Carousel from '../../commons/components/Carousel/Carousel';
import MoiIcon from '../../commons/components/MoIcon/MoIcon';
import { Palette, Size } from '../../commons/styles';
import ActionsHeader from './ActionsContentMax';

const HeaderContent = styled(View)`
  margin-vertical: ${Size.spaceSmall};
`;

const ContentContainer = styled(View)`
  padding-horizontal: ${Size.spaceSmall};
  padding-vertical: ${Size.spaceSmall};
`;

@connect(store => ({
  contentSelected: store.neuron.contentSelected,
}), {
  loadContentByIdAsync: actions.loadContentByIdAsync,
})
export default class SingleContentScene extends Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    this.loadContentAsync();
  }

  loadContentAsync = async () => {
    const { loadContentByIdAsync, content_id } = this.props;
    await loadContentByIdAsync(content_id);

    this.setState({ loading: false });
  }

  render() {
    const { contentSelected } = this.props;
    const { loading } = this.state;

    return (
      <MoiBackground>
        {loading && <Preloader />}
        {!loading && (
          <ContentBox staticBox>

            <HeaderContent>
              <Title bolder color={Palette.white}>{contentSelected.content.title}</Title>
            </HeaderContent>

            <Carousel
              showsPagination={false}
              showsButtons
              size={{ width: 300, height: 200 }}
              images={contentSelected.content.media}
            />

            <ActionsHeader>
              <MoiIcon onPress={() => Alert.alert('Fav Clicked')} name='fav' size={20} />
              <Ionicons onPress={() => Alert.alert('Circle Clicked')} name='md-information-circle' size={20} color={Palette.white.css()} />
              <Ionicons name='ios-more' size={20} color={Palette.white.css()} />
            </ActionsHeader>

            <ContentContainer>
              <TextBody inverted>{contentSelected.content.description}</TextBody>
            </ContentContainer>

          </ContentBox>
        )}
        <BackButtonContainer>
          <BackButton onPress={() => Actions.content()}/>
        </BackButtonContainer>
        <Navbar/>
        <BottomBar />
      </MoiBackground>
    );
  }
}

SingleContentScene.propTypes = {
  title: PropTypes.string,
  contentSelected: PropTypes.object,
};
