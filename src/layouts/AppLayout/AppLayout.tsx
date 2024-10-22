import { Outlet } from "react-router-dom";

import Header from "../../components/Header";
import IntroModal from "../../components/IntroModal";

const AppLayout = () => {
  const modalSwitcher = sessionStorage.getItem("modal");

  return (
    <>
      <Header />
      <Outlet />
      {!modalSwitcher && <IntroModal />}
    </>
  );
};

export default AppLayout;
