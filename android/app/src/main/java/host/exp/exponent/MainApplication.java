package host.exp.exponent;

import com.facebook.react.ReactPackage;

import org.unimodules.core.interfaces.Package;

import java.util.Arrays;
import java.util.List;

import expo.loaders.provider.interfaces.AppLoaderPackagesProviderInterface;
import host.exp.exponent.generated.BasePackageList;
//import okhttp3.OkHttpClient;

// Needed for `react-native link`
// import com.facebook.react.ReactApplication;
import com.reactnativecommunity.netinfo.NetInfoPackage;
//import fr.greweb.reactnativeviewshot.RNViewShotPackage;
//import com.horcrux.svg.SvgPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.airbnb.android.react.lottie.LottiePackage;
import org.reactnative.maskedview.RNCMaskedViewPackage;

public class MainApplication extends ExpoApplication implements AppLoaderPackagesProviderInterface<ReactPackage> {

  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }

  // Needed for `react-native link`
  public List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
        // Add your own packages here!
        // TODO: add native modules!

        // Needed for `react-native link`
        // new MainReactPackage(),
            new NetInfoPackage(),
//            new RNViewShotPackage(),
//            new SvgPackage(),
            new RNSoundPackage(),
            new OrientationPackage(),
            new LottiePackage(),
            new RNCMaskedViewPackage()
    );
  }

  public List<Package> getExpoPackages() {
    return new BasePackageList().getPackageList();
  }

  @Override
  public String gcmSenderId() {
    return getString(R.string.gcm_defaultSenderId);
  }

//  public static OkHttpClient.Builder okHttpClientBuilder(OkHttpClient.Builder builder) {
//    // Customize/override OkHttp client here
//    return builder;
//  }
}
