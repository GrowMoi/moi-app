import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ImageBackground, TouchableHighlight, Image, PixelRatio } from 'react-native';
import { captureRef as takeSnapshotAsync } from 'react-native-view-shot';
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

const CloseContainer = styled(TouchableHighlight)`
  position: absolute;
  top: 3;
  right: 5;
  width: 35;
  height: 35;
  zIndex: 1;
  background-color: transparent;
`;

const SectionContainer = styled(View)`
  flex: ${props => props.flex};
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

  certificateView = null;
  currentOrientation;

  state = {
    loading: false,
  }

  constructor(props) {
    super(props);
    this.removeResultFinalTest = this.removeResultFinalTest.bind(this);
  }

  componentWillMount() {
    this.currentOrientation = Orientation.getInitialOrientation();
    Orientation.lockToLandscape();
  }

  componentWillUnmount() {
    if (this.currentOrientation === 'PORTRAIT') {
      Orientation.lockToPortrait();
    }
  }

  showLoading(isVisible = true) {
    this.setState({ loading: isVisible });
  }

  async removeResultFinalTest() {
    const { device: { dimensions: { width, height } }, saveResultFinalTest, uploadImageAsync, saveCertificateAsync } = this.props;
    const pixelRatio = PixelRatio.get(); // The pixel ratio of the device

    const resultScreenShot = await takeSnapshotAsync(this.certificateView, {
      result: 'base64',
      height: height / pixelRatio,
      width: width / pixelRatio,
      quality: 1,
      format: 'png',
    });

    this.showLoading();

    const uploadedRes = await uploadImageAsync(this.normalizeBase64Image(resultScreenShot));
    await saveCertificateAsync(uploadedRes.secure_url);

    this.showLoading(false);
    saveResultFinalTest(null);
  }

  getPercentajeCorrectAnswers(data) {
    const correctResults = data.result.filter(response => response.correct);
    return (correctResults.length * 100) / 21;
  }

  normalizeBase64Image(base64Image) {
    return 'data:image/png;base64,' + base64Image.replace(/(?:\r\n|\r|\n)/g, '')
  }

  render() {
    const { animationType, modalProps, finalTestResult, device: { dimensions: { width, height } }, style, profile } = this.props;
    const { loading } = this.state;

    const showModal = !!finalTestResult;

    return (
      <MoiModal {...modalProps}
        animationType={animationType}
        visible={showModal}
        transparent={true}
        supportedOrientations={['landscape']} >

        {loading && <Preloader notFullScreen style={{ position: "absolute", width: width, height: height, zIndex: 10 }} />}

        <Overlay>
          <CloseContainer
            style={style}
            onPress={this.removeResultFinalTest} >
            <CloseIcon
              onPress={this.removeResultFinalTest}
              source={{ uri: 'boton_salir_h' }}
              style={style}
              resizeMode='stretch'
            />
          </CloseContainer>

          <Background  ref={view => { this.certificateView = view; }} style={style} width={width} height={height} source={{ uri: 'marco_exterior_h' }} resizeMode='stretch'>

            <BackgroundCertificate
              width={width}
              height={height}
              source={{ uri: 'fondo' }}
              resizeMode='stretch'
            >

              <SectionContainer flex={1}>
                <TitleImage source={{ uri: 'title' }} width={width} resizeMode='contain' />
              </SectionContainer>

              <SectionContainer flex={5} style={{ paddingLeft: "12%", paddingRight: "12%" }}>
                <View style={{ width: '100%', height: size.heigthBody, flexDirection: 'row' }}>
                  <View style={{ flex: 1 }}>
                    <TextBox>
                      <Header customSize={size.certificateFont}>{profile.username}</Header>
                    </TextBox>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5 }}>
                      <TextBox style={{ width: '100%', height: 'auto', flexDirection: 'row' }}>
                        <InnerTextBox>
                          <Header customSize={size.certificateFont}>{profile.age}</Header>
                          <Header customSize={size.certificateFont}>Edad</Header>
                        </InnerTextBox>
                        <InnerTextBox >
                          <Header customSize={size.certificateFont}>{profile.country}</Header>
                          <Header customSize={size.certificateFont}>Pais</Header>
                        </InnerTextBox>
                      </TextBox>
                    </View>
                    <TextBox>
                      <Header customSize={size.certificateFont}>{profile.school}</Header>
                      <Header customSize={size.certificateFont}>Escuela</Header>
                    </TextBox>
                  </View>

                  <View style={{ flex: 1 }}>
                    <Background
                      source={{ uri: 'fondo' }}
                      resizeMode='stretch' >
                      <Background
                        source={{ uri: 'marco' }}
                        resizeMode='stretch' >
                        <Image
                          style={{ width: "100%", height: "100%", marginTop: -4 }}
                          source={{ uri: profile.tree_image_app }}
                          resizeMode='stretch' />
                      </Background>
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
                    <Header color="#219fd1" customSize={size.certificateFont - 2}>tiempo de lectura promedio</Header>
                  </View>
                </View>
              </SectionContainer>

              <View style={{ marginBottom: -19, height: 20 }}>
                <Header style={{ color: 'white', fontWeight: '500', textAlign: 'center' }} small>Para mas informacion, visite growmoi.com</Header>
              </View>

            </BackgroundCertificate>

          </Background>

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
