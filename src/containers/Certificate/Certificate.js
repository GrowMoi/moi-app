import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dimensions, View, Text, ImageBackground, TouchableOpacity, Image, PixelRatio } from 'react-native';
import ViewShot, { captureRef as takeSnapshotAsync } from 'react-native-view-shot';
import styled from 'styled-components/native';
import Orientation from 'react-native-orientation';
import ChartLearnedContent from './ChartLearnedContent';
import Preloader from '../../commons/components/Preloader/Preloader';
import MoiModal from '../Modal/MoiModal';
import { Header } from '../../commons/components/Typography';
import size from '../../commons/styles/size';

// Actions
import userActions from '../../actions/userActions';

const Overlay = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const CloseContainer = styled(TouchableOpacity)`
  position: absolute;
  top: 3;
  right: 5;
  width: 35;
  height: 35;
  zIndex: 1;
  background-color: transparent;
`;

const SectionContainer = styled(View)`
  flex: ${props => props.flex || 1};
  padding: 20px;
  justify-content: center;
  align-items: center;
`;

const CloseIcon = styled(ImageBackground)`
  width: 35;
  height: 35;
  zIndex: 1;
`;

const Background = styled(ImageBackground)`
  width: 100%;
  height: 100%;
  flex: 1;
`;

const BackgroundCertificate = styled(ImageBackground)`
  position: absolute;
  top: 29;
  left: 29;
  width: ${props => props.width - 58};
  height: ${props => props.height - 62};
  zIndex: 2;
  flex: 1;
`;

const TitleImage = styled(Image)`
  height: ${size.heigthTitle};
  width: ${props => props.width};
`;

const TextBox = styled(View)`
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding-left: 50;
  padding-right: 50;
  padding-top: 10;
  padding-bottom: 10;
  margin-top: 5;
  margin-left: 5;
  margin-right: 5;
`;

const InnerTextBox = styled(View)`
  justify-content: center;
  align-items: center;
  padding-left: 10;
  padding-right: 10;
`;

class Certificate extends Component {

  certificateView = React.createRef();
  currentOrientation;

  state = {
    loading: false,
    showModal: false,
  }

  componentWillMount() {
    this.currentOrientation = Orientation.getInitialOrientation();
    Orientation.lockToLandscape();
  }

  componentDidMount() {
    setTimeout(() => {
      this.showCertificate()
    }, 150)
  }

  componentWillUnmount() {
    if (this.currentOrientation === 'PORTRAIT') {
      Orientation.lockToPortrait();
    }
  }

  showCertificate = () => {
    this.setState(
      () => ({ showModal: true }),
      () => {
        this.captureCertificate()
      }
    )
  }

  showLoading(isVisible = true) {
    this.setState({ loading: isVisible });
  }

  captureCertificate = async () => {
    const { uploadImageAsync, saveCertificateAsync } = this.props;
    this.setState({ loading: true });
    try {
      const resultScreenShot = await this.certificateView.current.capture()
      const uploadedRes = await uploadImageAsync(this.normalizeBase64Image(resultScreenShot));
      await saveCertificateAsync(uploadedRes.secure_url);

    } catch (error) {
      console.log('Error', error)
    }
    this.setState({ loading: false });
  }

  getPercentajeCorrectAnswers(data) {
    const correctResults = data.result.filter(response => response.correct);
    return (correctResults.length * 100) / 21;
  }

  normalizeBase64Image(base64Image) {
    return 'data:image/png;base64,' + base64Image.replace(/(?:\r\n|\r|\n)/g, '')
  }

  closeCertificate = () => {
    const { saveResultFinalTest } = this.props;
    this.setState(
      () => ({ showModal: false }),
      () => {
        saveResultFinalTest(null)
      }
    )
  }

  render() {
    const { animationType = 'fade', modalProps, profile, finalTestResult = {}, saveResultFinalTest } = this.props;
    const { loading, showModal } = this.state;

    const pixelRatio = PixelRatio.get(); // The pixel ratio of the device
    const width = Dimensions.get('screen').width;
    const height = Dimensions.get('screen').height;


    return (
      <MoiModal {...modalProps}
        animationType={animationType}
        visible={showModal}
        transparent={true}
        supportedOrientations={['landscape']} >

        {loading && <Preloader notFullScreen style={{ position: "absolute", width: width, height: height, zIndex: 10 }} />}

        <Overlay>
          <CloseContainer onPress={this.closeCertificate}>
            <CloseIcon
              source={{ uri: 'boton_salir_h' }}
              resizeMode='stretch'
            />
          </CloseContainer>

          <ViewShot
            style={{ width, height }}
            options={{
              result: 'base64',
              height: height / pixelRatio,
              width: width / pixelRatio,
              quality: 1,
              format: 'png',
            }}
            ref={this.certificateView}>
            <Background collapsable={false} ref={this.certificateView} width={width} height={height} source={{ uri: 'marco_profile_tab_contents' }} resizeMode='stretch'>

              <BackgroundCertificate
                width={width}
                height={height}
                source={{ uri: 'background_tree_landscape' }}
                resizeMode='stretch'
              >

                <SectionContainer flex={1}>
                  <TitleImage source={{ uri: 'title' }} width={width} resizeMode='contain' />
                </SectionContainer>

                <SectionContainer flex={5} style={{ paddingLeft: "12%", paddingRight: "12%" }}>
                  <View style={{ width: '100%', height: size.heigthBody, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                      <TextBox>
                        <Header heavy color={'#000'} customSize={size.certificateFont}>{profile.username}</Header>
                      </TextBox>
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5 }}>
                        <TextBox style={{ width: '100%', height: 'auto', flexDirection: 'row' }}>
                          <InnerTextBox>
                            <Header bolder color={'#000'} customSize={size.certificateFont}>{profile.age}</Header>
                            <Header bolder color={'#000'} customSize={size.certificateFont}>Edad</Header>
                          </InnerTextBox>
                          <InnerTextBox >
                            <Header bolder color={'#000'} customSize={size.certificateFont}>{profile.country}</Header>
                            <Header bolder color={'#000'} customSize={size.certificateFont}>Pais</Header>
                          </InnerTextBox>
                        </TextBox>
                      </View>
                      <TextBox>
                        <Header bolder color={'#000'} customSize={size.certificateFont}>{profile.school}</Header>
                        <Header bolder color={'#000'} customSize={size.certificateFont}>Escuela</Header>
                      </TextBox>
                    </View>

                    <View style={{ flex: 1 }}>
                      <Background
                        style={{ borderRadius: 20 }}
                        source={{ uri: 'background_profile' }}
                        resizeMode='stretch' >
                          <Image
                            style={{ width: "100%", height: "100%", marginTop: -4 }}
                            source={{ uri: profile.tree_image_app }}
                            resizeMode='stretch' />
                      </Background>
                    </View>
                  </View>
                </SectionContainer>

                <SectionContainer flex={1} style={{ flexDirection: 'row', backgroundColor: "#fff" }}>
                  <View style={{ flex: 1.5 }}>
                    <ChartLearnedContent learnContensByBrach={finalTestResult.contents_learnt_by_branch} learnContens={finalTestResult.current_learnt_contents} />
                  </View>

                  <View style={{ flex: 4, justifyContent: 'center' }}>
                    <Header style={{ width: '100%', textAlign: 'center' }} color="#219fd1" customSize={size.certificateFont + 8} bolder>{finalTestResult.current_learnt_contents} contenidos aprendidos</Header>
                    <Header style={{ width: '100%', textAlign: 'center' }} color="#219fd1" customSize={size.certificateFont}>{((finalTestResult.current_learnt_contents * 100) / finalTestResult.total_approved_contents).toFixed(1)}% crecimiento del arbol</Header>
                  </View>

                  <View style={{ flex: 2.3, justifyContent: 'center' }}>
                    <Header color="#219fd1" customSize={size.certificateFont}>{this.getPercentajeCorrectAnswers(finalTestResult).toFixed(1)}% último test</Header>
                    <View style={{ flexDirection: 'row' }}>
                      <Header color="#219fd1" customSize={size.certificateFont - 2} bolder>{finalTestResult.time} </Header>
                      <Header color="#219fd1" customSize={size.certificateFont - 2}>lectura promedio</Header>
                    </View>
                  </View>
                </SectionContainer>

                <View style={{ marginBottom: -19, height: 20 }}>
                  <Header style={{ color: 'white', fontWeight: '500', textAlign: 'center' }} small>Para mas informacion, visite growmoi.com</Header>
                </View>

              </BackgroundCertificate>

            </Background>
          </ViewShot>

        </Overlay>

      </MoiModal>
    );
  }

}

Certificate.defaultProps = {
  animationType: 'fade',
  visible: false,
}

const mapStateToProps = (state) => ({
  device: state.device,
  profile: state.user.profile,
  finalTestResult: state.user.finalTestResult,
})

const mapDispatchToProps = {
  saveResultFinalTest: userActions.saveResultFinalTest,
  uploadImageAsync: userActions.uploadImageAsync,
  saveCertificateAsync: userActions.saveCertificateAsync,
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Certificate);
