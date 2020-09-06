import axios, {AxiosResponse, AxiosRequestConfig} from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export const get = async <T>(
  url: string,
  params = {},
): Promise<AxiosResponse<T>> => {
  let options: AxiosRequestConfig = {
    params: params,
  };
  const token = await authorizationToken();
  if (token !== null) {
    options = Object.assign(options, {
      headers: {
        Authorization: `Bearer ${token}`,
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
  const token = await authorizationToken();
  if (token !== null) {
    options = Object.assign(options, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return axios.post<T>(url, params, options);
};

export const patch = async <T>(
  url: string,
  params = {},
): Promise<AxiosResponse<T>> => {
  let options: AxiosRequestConfig = {};
  const token = await authorizationToken();
  if (token !== null) {
    options = Object.assign(options, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return axios.patch<T>(url, params, options);
};

export const put = async <T>(
  url: string,
  params = {},
): Promise<AxiosResponse<T>> => {
  let options: AxiosRequestConfig = {};
  const token = await authorizationToken();
  if (token !== null) {
    options = Object.assign(options, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return axios.put<T>(url, params, options);
};

export const del = async <T>(
  url: string,
  params = {},
): Promise<AxiosResponse<T>> => {
  let options: AxiosRequestConfig = {
    data: params,
  };
  const token = await authorizationToken();
  if (token !== null) {
    options = Object.assign(options, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return axios.delete<T>(url, options);
};

const authorizationToken = async (): Promise<string | null> => {
  try {
    let token = await AsyncStorage.getItem('access_token');
    if (token !== null) {
      return Promise.resolve(token);
    }
  } catch (error) {
    return Promise.resolve(null);
  }
  return Promise.resolve(null);
};
