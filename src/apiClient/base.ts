import axios, {AxiosResponse, AxiosRequestConfig} from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export const get = async <T>(
  url: string,
  params = {},
): Promise<AxiosResponse<T>> => {
  let options: AxiosRequestConfig = {
    params: params,
  };
  const cookie = await restoreCookie();
  if (cookie !== null) {
    options = Object.assign(options, {
      headers: {
        Cookie: cookie,
      },
    });
  }

  return axios.get<T>(url, options);
};

export const post = async <T>(
  url: string,
  params = {},
): Promise<AxiosResponse<T>> => {
  let options: AxiosRequestConfig = {};
  return axios.post<T>(url, params, options);
};

export const patch = async <T>(
  url: string,
  params = {},
): Promise<AxiosResponse<T>> => {
  let options: AxiosRequestConfig = {};
  return axios.patch<T>(url, params, options);
};

export const put = async <T>(
  url: string,
  params = {},
): Promise<AxiosResponse<T>> => {
  let options: AxiosRequestConfig = {};
  return axios.put<T>(url, params, options);
};

export const del = async <T>(
  url: string,
  params = {},
): Promise<AxiosResponse<T>> => {
  let options: AxiosRequestConfig = {
    data: params,
  };
  return axios.delete<T>(url, options);
};

const restoreCookie = async (): Promise<string | null> => {
  try {
    let value = await AsyncStorage.getItem('savedCookies');
    if (value !== null) {
      return Promise.resolve(jsonCookiesToCookieString(JSON.parse(value)));
    }
  } catch (error) {
    return Promise.resolve(null);
  }
  return Promise.resolve(null);
};

const jsonCookiesToCookieString = (json: {[key: string]: any}): string => {
  let cookiesString = '';
  for (let [key, value] of Object.entries(json)) {
    cookiesString += `${key}=${value.value}; `;
  }
  return cookiesString;
};
