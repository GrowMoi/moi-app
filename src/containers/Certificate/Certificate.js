import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Modal, Text, ImageBackground, TouchableHighlight, Image, StyleSheet, PixelRatio } from 'react-native';
import { takeSnapshotAsync } from 'expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import styled from 'styled-components/native';
// import { captureScreen } from "react-native-view-shot";
// import { getHeightAspectRatio } from '../../utils';
// import { Palette } from '../../styles';
import marcoExterior from '../../../assets/images/certificate/marco_exterior_H.png';
import marco from '../../../assets/images/certificate/marco.png';
import fondo from '../../../assets/images/certificate/fondo.png';
import macetaMenu from '../../../assets/images/macetaMenu/maceta_menu.png';
import closeIcon from '../../../assets/images/certificate/boton_salir_H.png';
import title from '../../../assets/images/certificate/title.png';

// Actions
import userActions from '../../actions/userActions';
import ChartLearnedContent from './ChartLearnedContent';

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
  height: 50;
`;

const ContainerInfoUser = styled(View)`
  margin-top: 20;
  margin-left: 15%;
  margin-right: 15%;
  width: 70%;
  background-color: transparent;
`;

const ContainerInfoTree = styled(View)`
  margin-top: 20;
  margin-bottom: 5;
  width: 100%;
  height: 60;
  background-color: #fff;
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

@connect(store => ({
  device: store.device,
  profile: store.user.profile,
  finalTestResult: store.user.finalTestResult,
}),
{
  saveResultFinalTest: userActions.saveResultFinalTest,
  uploadCertificateAsync: userActions.uploadCertificateAsync,
  saveCertificateAsync: userActions.saveCertificateAsync,
})
class Certificate extends Component {

  certificateView = null;

  constructor(props) {
    super(props);
    this.removeResultFinalTest = this.removeResultFinalTest.bind(this);
  }

  async removeResultFinalTest() {
    console.log("eliminar el final test");
    const { device: { dimensions: { width, height } }, saveResultFinalTest, uploadCertificateAsync, saveCertificateAsync } = this.props;

    const pixelRatio = PixelRatio.get(); // The pixel ratio of the device

    const resultScreenShot = await takeSnapshotAsync(this.certificateView, {
      result: 'base64',
      height: height / pixelRatio,
      width: width / pixelRatio,
      quality: 1,
      format: 'png',
    });

    const uploadedRes = await uploadCertificateAsync('data:image/png;base64,' + resultScreenShot.replace(/(?:\r\n|\r|\n)/g, ''));

		console.log("​Certificate -> removeResultFinalTest -> uploadedRes", uploadedRes.secure_url)

    const certificateResponse = await saveCertificateAsync(uploadedRes.secure_url);

    saveResultFinalTest(null);
    this.setState({showModal: false});
  }

  getPercentajeCorrectAnswers(data) {
    const correctResults = data.result.filter(response => response.correct);
    const percentajeCorrects = (correctResults.length * 100) / 21;
    return percentajeCorrects;
  }

  render() {
    const { animationType, modalProps,  finalTestResult, device, style, profile } = this.props;
    // const { animationType, modalProps, device, style, profile } = this.props;
    const { width, height, orientation } = device.dimensions;

    // let finalTestResult = {"result":[{"correct":true,"content_id":295,"question":"asdaf"},{"correct":true,"content_id":128,"question":"asad"},{"correct":true,"content_id":275,"question":"asdf"},{"correct":true,"content_id":216,"question":"asd"},{"correct":true,"content_id":245,"question":"sadf"},{"correct":true,"content_id":325,"question":"asdf"},{"correct":true,"content_id":370,"question":"sdf Esta tb falta"},{"correct":true,"content_id":91,"question":"a"},{"correct":true,"content_id":135,"question":"asdfasd"},{"correct":true,"content_id":342,"question":"asdf"},{"correct":true,"content_id":364,"question":"asdf"},{"correct":true,"content_id":130,"question":"qwerqwe"},{"correct":true,"content_id":226,"question":"asdf"},{"correct":true,"content_id":337,"question":"ad"},{"correct":true,"content_id":77,"question":"como funciona nivel 3?"},{"correct":true,"content_id":175,"question":"sda"},{"correct":true,"content_id":293,"question":"asdf"},{"correct":true,"content_id":125,"question":"asdfasd"},{"correct":true,"content_id":335,"question":"adfadf"},{"correct":true,"content_id":228,"question":"asdf"},{"correct":false,"content_id":305,"question":"asdf"}],"time":"00 :40","contents_learnt_by_branch":[{"id":3,"title":"Aprender","parent_id":1,"total_contents_learnt":36},{"id":10,"title":"Artes","parent_id":1,"total_contents_learnt":46},{"id":8,"title":"Lenguaje","parent_id":1,"total_contents_learnt":34},{"id":9,"title":"Naturaleza","parent_id":1,"total_contents_learnt":42}],"current_learnt_contents":170,"total_approved_contents":310};

    const showModal = !!finalTestResult;

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: 'column'
      },
      row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
      },
      row1: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
      },
      row2: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
      },
      row3: {
        flex: 1.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5
      },
      box: {
        flex: 1
      }
    });

    // if(!finalTestResult) {
    //   return null;
    // }

    return (
          <Modal {...modalProps}
            animationType={animationType}
            visible={showModal}
            transparent={true}
            supportedOrientations={['landscape']}
          >
            <Overlay ref={view =>  { this.certificateView = view; }}>
              <CloseContainer
                style={style}
                onPress={this.removeResultFinalTest} >
                <CloseIcon
                  onPress={this.removeResultFinalTest}
                  source={closeIcon}
                  style={style}
                  resizeMode='stretch'
                />
              </CloseContainer>

              <Background style={style} width={width} height={height} source={marcoExterior} resizeMode='stretch'>
                <BackgroundCertificate width={width} height={height} source={fondo} resizeMode='stretch' style={styles.container}>

                <View style={[styles.row1, {justifyContent: 'center'}]}>
                  <TitleImage source={title} width={width} resizeMode='contain'/>
                </View>

                <View style={[styles.row2, {paddingLeft:"12%", paddingRight:"12%"}]}>
                  <View style={{flex: 1}}>
                    <TextBox>
                        <Text>{profile.username}</Text>
                      </TextBox>
                       <TextBox style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flex: 1}}>
                        <InnerTextBox>
                          <Text>{profile.age}</Text>
                          <Text>Edad</Text>
                        </InnerTextBox>
                        <InnerTextBox >
                          <Text>{profile.country}</Text>
                          <Text>Pais</Text>
                        </InnerTextBox>
                      </TextBox>
                      <TextBox>
                        <Text>{profile.school}</Text>
                        <Text>Escuela</Text>
                       </TextBox>
                  </View>
                  <View style={[styles.box]}>
                    <Background
                        source={fondo}
                        resizeMode='stretch'
                        >
                         <Background
                          source={marco}
                          resizeMode='stretch'
                        >
                          <Image
                            style={{width: "100%", height: "100%", marginTop: -4}}
                            source={ { uri: profile.tree_image}}
                            resizeMode='stretch'
                          />
                        </Background>
                      </Background>
                  </View>
                </View>

                <View style={[styles.row3, {backgroundColor:"#fff"}]}>
                  <View style={{flex: 1.5}}>
                      <ChartLearnedContent learnContensByBrach={finalTestResult.contents_learnt_by_branch} learnContens={finalTestResult.current_learnt_contents}/>
                  </View>
                  <View style={{flex: 4, justifyContent: 'center'}}>
                    <Text style={{width:'100%', textAlign: 'center', color: '#219fd1', fontSize:24, fontWeight: '400'}}>{finalTestResult.current_learnt_contents} contenidos aprendidos</Text>
                    <Text style={{width:'100%', textAlign: 'center', color: '#219fd1', fontWeight: '100'}}>{((finalTestResult.current_learnt_contents * 100) / finalTestResult.total_approved_contents).toFixed(1)}% crecimiento del arbol</Text>
                  </View>
                  <View style={{flex: 2, justifyContent: 'center'}}>
                    <Text style={{color: '#219fd1'}}>{this.getPercentajeCorrectAnswers(finalTestResult).toFixed(1)}% último test</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{color: '#219fd1'}}>{finalTestResult.time}</Text>
                      <Text style={{color: '#219fd1'}}>tiempo de lectura promedio</Text>
                    </View>
                  </View>
                </View>
                </BackgroundCertificate>
              </Background>
            </Overlay>
          </Modal>
        );
  }

}

Certificate.defaultProps = {
  animationType: 'fade',
  visible: false,
}

export default Certificate;
