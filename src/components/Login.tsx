import React from 'react';
import {WebView} from 'react-native-webview';
import {
  DrawerScreenProps,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import CookieManager from '@react-native-community/cookies'
import AsyncStorage from '@react-native-community/async-storage'

import {DrawerParam} from '@/navigations/drawer';

type Props = DrawerScreenProps<DrawerParam, 'Login'>;

const Login: React.FC<Props> = ({navigation}) => {
  return (
    <WebView
      source={{uri: 'https://fascia.io/webviews/oauth/sign_in'}}
      onNavigationStateChange={(newNavState) =>
        handleWebViewNavigationStateChange(navigation, newNavState)
      }
    />
  );
};

const handleWebViewNavigationStateChange = async (
  navigation: DrawerNavigationProp<DrawerParam, 'Login'>,
  newNavState: any,
) => {
  const {url} = newNavState;
  if (!url) return;
  if (url.includes('fascia.io/webviews/callback')) {
    // For iOS
    // Because WKWebView don't share cookie with other http requests.
    // https://stackoverflow.com/questions/62057393/how-to-keep-last-web-session-active-in-react-native-webview
    const cookies = await CookieManager.getAll(true)
    await AsyncStorage.setItem('savedCookie', JSON.stringify(cookies))

    console.log(cookies)
    navigation.navigate('Home', {
      screen: 'Projects'
    });
    return;
  }
};

export default Login;
