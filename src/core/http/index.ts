import axios, { AxiosResponse } from "axios";

export const APIRoutes = {
  HEROES: "/people",
  FILMS: "/films",
  STARSHIPS: "/starships",
  PLANETS: "/planets",
};

const $api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default class RequestService {
  static async getMethod<T>(
    url: string,
    query?: any
  ): Promise<AxiosResponse<T>> {
    return $api.get(url, {
      params: query,
    });
  }
}
