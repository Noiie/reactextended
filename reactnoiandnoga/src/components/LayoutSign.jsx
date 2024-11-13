import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function LayoutSign() {
  return (
    <div className="site-wrapper">
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default LayoutSign;
