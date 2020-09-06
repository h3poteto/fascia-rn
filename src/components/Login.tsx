import React from 'react';
// import {Platform} from 'react-native';
import {WebView, WebViewNavigation} from 'react-native-webview';
import {
  DrawerScreenProps,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage';

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
  newNavState: WebViewNavigation,
) => {
  const {url} = newNavState;
  if (!url) return;
  if (url.includes('/webviews/callback')) {
    // https://stackoverflow.com/questions/44038180/react-native-parse-url-to-get-query-variable
    const regex = /[?&]([^=#]+)=([^&#]*)/g;
    let params: any = {};
    let match: any;
    while ((match = regex.exec(url))) {
      params[match[1]] = match[2];
    }
    if (params['access_token']) {
      const token: string = params['access_token'];
      await AsyncStorage.setItem('access_token', token);
    }
    navigation.navigate('Home', {
      screen: 'Projects',
    });
    return;
  }
};

export default Login;
