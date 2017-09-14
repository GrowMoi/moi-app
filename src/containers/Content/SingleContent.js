import React, { Component } from 'react';
import { View, Alert, ScrollView, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Actions } from 'react-native-router-flux';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import Navbar from '../../commons/components/Navbar/Navbar';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import { BottomBar } from '../../commons/components/SceneComponents';
import { ContentBox } from '../../commons/components/ContentComponents';
import actions from '../../actions/neuronActions';
import Preloader from '../../commons/components/Preloader/Preloader';
import { Title, TextBody, Description, Header } from '../../commons/components/Typography';
import Carousel from '../../commons/components/Carousel/Carousel';
import MoiIcon from '../../commons/components/MoIcon/MoIcon';
import { Palette, Size } from '../../commons/styles';
import ActionsHeader from './ActionsContentMax';

const { width } = Dimensions.get('window');

const HeaderContent = styled(View)`
  margin-vertical: ${Size.spaceSmall};
  align-items: center;
`;

const TextContainer = styled(View)`
  margin-bottom: ${Size.spaceSmall};
`;

const TextLeftBorder = styled(View)`
  padding-left: ${Size.spaceSmall};
  margin-left: ${Size.spaceSmall};
  border-color: transparent;
  border-left-width: 1;
  border-left-color: ${Palette.white.alpha(0.3).css()};
`;

const Source = styled(View)`
  align-items: flex-start;
`;
const Divider = styled(View)`
  height: 1;
  background-color: ${(props) => {
    if (props.color) return props.color;
    return Palette.white.alpha(0.5).css();
  }};
  margin-vertical: 3;
  align-self: stretch;
`;

const VideoRecomended = styled(Image)`
  width: 120;
  height: 100;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const VideoContainer = styled(View)`
  flex: 1;
  margin-vertical: ${Size.spaceSmall};
`;
const PlayIcon = styled(FontAwesome)`
  color: ${Palette.white};
  position: absolute;
  background-color: transparent;
  opacity: 0.8;
`;

const styles = StyleSheet.create({
  scrollContainer: {
    // width: width - Size.spaceLarge,
    alignSelf: 'stretch',
  },
});

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
    console.log('Component Did Mount');
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
          <ContentBox>
            <ScrollView contentContainerStyle={styles.scrollContainer}>

              <HeaderContent>
                <Header bolder inverted>{contentSelected.content.title}</Header>
              </HeaderContent>

              <Carousel
                showsPagination
                loop
                autoplay
                size={{ height: 200, width: (width - Size.spaceLarge) }}
                images={contentSelected.content.media}
              />

              <ActionsHeader>
                <MoiIcon onPress={() => Alert.alert('Fav Clicked')} name='fav' size={20} />
                <Ionicons onPress={() => Alert.alert('Circle Clicked')} name='md-information-circle' size={20} color={Palette.white.css()} />
                <Ionicons name='ios-more' size={20} color={Palette.white.css()} />
              </ActionsHeader>

              <TextContainer>
                <TextBody inverted>{contentSelected.content.description}</TextBody>
                <Source>
                  <TextBody bolder color={Palette.dark}>Fuente</TextBody>
                  <Divider color={Palette.dark.alpha(0.2).css()} />
                  <Description inverted>{contentSelected.content.source}</Description>
                </Source>
              </TextContainer>

              <TextContainer>
                <Header inverted bolder>Links</Header>
                {contentSelected.content.links.map((link, i) => (
                  <TextLeftBorder key={i}>
                    <TextBody inverted>{link}</TextBody>
                  </TextLeftBorder>
                ))}
              </TextContainer>

              <TextContainer>
                <Header inverted bolder>Notas</Header>
                {contentSelected.content.user_notes ?
                  contentSelected.content.user_notes.map((note, i) => (
                    <TextLeftBorder key={i}>
                      <Description inverted>{note}</Description>
                    </TextLeftBorder>
                  )) : (
                    <Description>No tiene notas</Description>
                  )
                }
              </TextContainer>

              <TextContainer>
                <Header inverted bolder>Recomendados</Header>
                <VideoContainer>
                  {contentSelected.content.videos &&
                    contentSelected.content.videos.map((video, i) => (
                      <TouchableOpacity key={i}>
                        <VideoRecomended
                          source={{ uri: `https:${video.thumbnail}` }}
                          resizeMode="cover"
                        >
                          <PlayIcon name='play-circle' size={40} />
                        </VideoRecomended>
                      </TouchableOpacity>
                    ))
                  }
                </VideoContainer>
              </TextContainer>

            </ScrollView>
          </ContentBox>
        )}

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
