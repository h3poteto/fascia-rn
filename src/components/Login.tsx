import React from 'react';
// import {View, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import {
  DrawerScreenProps,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
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

const handleWebViewNavigationStateChange = (
  navigation: DrawerNavigationProp<DrawerParam, 'Login'>,
  newNavState: any,
) => {
  const {url} = newNavState;
  if (!url) return;
  if (url.includes('fascia.io/webviews/callback')) {
    navigation.navigate('Projects');
    return;
  }
};

export default Login;
