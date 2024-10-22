import { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { IRoute, UIRoutes } from "../router";

import AppLayout from "../../layouts/AppLayout/AppLayout";
import HeroesList from "../../components/HeroesList/HeroesList";
import HeroDetails from "../../components/HeroDetails";

export const publicRoutes: IRoute[] = [
  {
    path: UIRoutes.HEROES,
    element: <HeroesList />,
  },
  { path: `${UIRoutes.HEROES}/:hero_id`, element: <HeroDetails /> },
];

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path="/*" element={<AppLayout />}>
        {publicRoutes.map((route, index) => (
          <Route key={`${route.path}${index}`} {...route} />
        ))}
        <Route
          path="*"
          element={<Navigate to={`/${UIRoutes.HEROES}`} replace />}
        />
      </Route>
    </Routes>
  );
};

export default AppRouter;
