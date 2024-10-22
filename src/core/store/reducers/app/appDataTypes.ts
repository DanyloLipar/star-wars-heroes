import IHero from "../../../models/hero";

export type AppDataTypes = {
  heroes: IHero[];
  page: number;
  totalPages: number;
  loading: boolean;
  error: any;
};
