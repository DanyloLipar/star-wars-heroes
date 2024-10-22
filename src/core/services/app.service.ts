import { AxiosResponse } from "axios";
import { APIRoutes } from "../http";

import RequestService from "../http";
import IFilm from "../models/film";
import IHero from "../models/hero";
import IStarShip from "../models/starship";

export default class AppService {
  static async getHeroes(page: number): Promise<AxiosResponse<any>> {
    return RequestService.getMethod<IHero[]>(APIRoutes.HEROES, { page: page });
  }

  static async getHero(hero_id: number): Promise<AxiosResponse<any>> {
    return RequestService.getMethod<IHero>(`${APIRoutes.HEROES}/${hero_id}`);
  }

  static async getFilm(film_id: number): Promise<AxiosResponse<any>> {
    return RequestService.getMethod<IFilm>(`${APIRoutes.FILMS}/${film_id}`);
  }

  static async getStarship(starship_id: number): Promise<AxiosResponse<any>> {
    return RequestService.getMethod<IStarShip>(
      `${APIRoutes.STARSHIPS}/${starship_id}`
    );
  }

  static async getPlanet(planet_id: number): Promise<AxiosResponse<any>> {
    return RequestService.getMethod<any>(`${APIRoutes.PLANETS}/${planet_id}`);
  }
}
