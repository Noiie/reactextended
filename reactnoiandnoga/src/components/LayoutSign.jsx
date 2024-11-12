import HeaderSign from "./HeaderSign";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function LayoutSign() {
  return (
    <div className="site-wrapper">
      <HeaderSign />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default LayoutSign;
