import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, Image, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Preloader from '../../commons/components/Preloader/Preloader';
import { TextBody } from '../../commons/components/Typography';
import { Palette } from '../../commons/styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import ViewTransformer from 'react-native-view-transformer-next';
import { isTablet } from 'react-native-device-detection';
// Actions
import userActions from '../../actions/userActions';
import MoiModal from '../Modal/MoiModal';

const imageWidth = 190;
const imageHeight = 130;
const aspect = imageWidth / imageHeight;

const ContentImage = styled(Image)`
  width: ${props => props.width};
  height: ${props => Math.round(props.width / aspect)};
  background-color: ${Palette.dark};
  border-color: ${Palette.dark};
  border-radius: 5;
  border-width: 3;
`;

const Overlay = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${Palette.black.alpha(0.7).css()};
`;

const CloseIcon = styled(Ionicons)`
  position: absolute;
  top: 20;
  right: 20;
  zIndex: 1;
  background-color: transparent;
`;

const Zoom = styled(ViewTransformer)`
  overflow: visible;
  position: relative;
  height: 50%;
  width: 100%;
`;

@connect(store => ({}),
  {
    getLatestCertificatesAsync: userActions.getLatestCertificatesAsync,
  })
class ListCertificates extends Component {
  state = {
    latestCertificates: [],
    currentCertificate: '',
    fullScreenImage: false,
    loading: false
  }

  async componentDidMount() {
    this.showLoading();
    const data = await this.props.getLatestCertificatesAsync();
    this.setState({ latestCertificates: data.certificates });
    this.showLoading(false);
  }

  showLoading(isVisible = true) {
    this.setState({ loading: isVisible });
  }

  _keyExtractor = (item, index) => index.toString();

  _renderItem = ({ item, index }) => {
    const size = { width: imageWidth + 10, height: imageHeight + 10 };
    return (
      <View style={{ ...size, padding: 10 }}>
        <TouchableOpacity onPress={() => this.openCertificate(item)}>
          <ContentImage
            width={imageWidth}
            key={index}
            resizeMode='cover'
            source={{ uri: item }} />
        </TouchableOpacity>
      </View>
    );
  }

  openCertificate = image => {
    this.setState({ fullScreenImage: true, currentCertificate: image });
  }

  dismissModal = () => {
    this.setState({ fullScreenImage: false, currentCertificate: '' });
  }

  render() {
    const { loading, latestCertificates, currentCertificate, fullScreenImage } = this.state;

    return (
      <View>
        {loading && <Preloader />}
        {!loading && <FlatList
          data={latestCertificates.map(certificate => certificate.media_url)}
          ListEmptyComponent={
            <TextBody center>No tienes certificados ganados aún</TextBody>
          }
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          numColumns={isTablet ? 2 : 1}
        />}
        {fullScreenImage && <MoiModal
          visible={fullScreenImage}
          animationType='fade'
          transparent
          supportedOrientations={['portrait', 'landscape']}
        >
          <Overlay>
            <CloseIcon
              name='md-close'
              color='white'
              size={35}
              onPress={this.dismissModal}
            />
            <Zoom maxScale={4}>
              <Image
                source={{ uri: currentCertificate }}
                resizeMode='contain'
                style={{ width: '100%', height: '100%' }}
              />
            </Zoom>
          </Overlay>
        </MoiModal>}
      </View>
    );
  }
}

export default ListCertificates;
