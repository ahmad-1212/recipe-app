import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <section className="max-w-[1280px] min-h-[60rem] bg-white mx-auto xl:rounded-xl my-0  xl:my-[3rem] drop-shadow-2xl flex flex-col overflow-hidden">
        <Header />
        <main>{children}</main>
        <footer className="mt-auto block text-center py-6  xl:py-2 bg-gray-600 text-xs">
          &copy; Copyright All right reserved
        </footer>
      </section>
    </>
  );
};

export default Layout;
