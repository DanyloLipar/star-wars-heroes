export interface IRoute {
  path: string;
  element: React.ReactElement;
}

export enum UIRoutes {
  HOME = "home",
  HEROES = "heroes",
}
