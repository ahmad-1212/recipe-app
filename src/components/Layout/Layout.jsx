import { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [screen, setScreen] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", (e) => {
      setScreen(e.target.innerWidth);
    });
    return () =>
      window.removeEventListener("resize", (e) => {
        setScreen(e.target.innerWidth);
      });
  }, [screen]);

  useEffect(() => {
    setScreen(window.innerWidth);
  }, []);

  return (
    <>
      {screen <= 900 && (
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      )}
      <section className="max-w-[1280px] min-h-[60rem] bg-white mx-auto xl:rounded-xl my-0  xl:my-[3rem] drop-shadow-2xl flex flex-col overflow-hidden">
        <Header screen={screen} setShowSidebar={setShowSidebar} />
        <main>{children}</main>
        <footer className="mt-auto block text-center py-6  xl:py-2 bg-gray-600 text-xs">
          &copy; Copyright All right reserved
        </footer>
      </section>
    </>
  );
};

export default Layout;
