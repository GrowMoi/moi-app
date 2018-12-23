import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Modal, Text, ImageBackground, TouchableHighlight, Image, StyleSheet } from 'react-native';
// import { Video as ExpoVideo, ScreenOrientation } from 'expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import styled from 'styled-components/native';
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
  width: ${props => props.width};
  height: 40;
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
  finalTestResult: store.user.finalTestResult,
}),
{
  saveResultFinalTest: userActions.saveResultFinalTest,
})
class Certificate extends Component {

  state = {
    showModal: true
  }

  constructor(props) {
    super(props);
    this.removeResultFinalTest = this.removeResultFinalTest.bind(this);
  }

  removeResultFinalTest() {
    console.log("eliminar el final test");
    // const { saveResultFinalTest } = this.props;
    // saveResultFinalTest(null);
    this.setState({showModal: false});
  }

  render() {
    const { animationType, modalProps,  finalTestResult, device, style } = this.props;
    const { width, height, orientation } = device.dimensions;
		// console.log("​Certificate -> render -> finalTestResult", finalTestResult.time)

    // const showModal = !!finalTestResult;
    const showModal = this.state.showModal;

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

    return (
          <Modal {...modalProps}
            animationType={animationType}
            visible={showModal}
            transparent={true}
            supportedOrientations={['landscape']}
          >
            <Overlay>
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

                <View style={styles.row1}>
                  <TitleImage source={title} width={width} resizeMode='contain'/>
                </View>

                <View style={[styles.row2, {paddingLeft:"12%", paddingRight:"12%"}]}>
                  <View style={{flex: 1}}>
                    <TextBox>
                        <Text>Agoso</Text>
                      </TextBox>
                       <TextBox style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flex: 1}}>
                        <InnerTextBox>
                          <Text>12</Text>
                          <Text>Edad</Text>
                        </InnerTextBox>
                        <InnerTextBox >
                          <Text>asd</Text>
                          <Text>Pais</Text>
                        </InnerTextBox>
                      </TextBox>
                      <TextBox>
                        <Text>Nombre</Text>
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
                            source={ { uri: "http://res.cloudinary.com/meruba/image/upload/v1545451247/tree_r0vxhm.png"}}
                            resizeMode='stretch'
                          />
                        </Background>
                      </Background>
                  </View>
                </View>

                <View style={[styles.row3, {backgroundColor:"#fff"}]}>
                  <View style={{flex: 1, backgroundColor:"#fafafa"}}></View>
                  <View style={{flex: 4, backgroundColor:"#ffa", justifyContent: 'center'}}>
                    <Text style={{width:'100%', textAlign: 'center'}}>170 contenidos aprendidos</Text>
                    <Text style={{width:'100%', textAlign: 'center'}}>58% recimiento del arbol</Text>
                  </View>
                  <View style={{flex: 2}}>
                    <Text>100% ultimo test</Text>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Text >00:27</Text>
                      <Text>tiempo de lectura promedio</Text>
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
