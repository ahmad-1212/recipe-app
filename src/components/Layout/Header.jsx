import Logo from "../../assets/favicon.png";
import Modal from "../UI/Modal";
import BookMarks from "../BookMarks";
import { useNavigate } from "react-router-dom";
import useRecipeContext from "../../hooks/useRecipeContext";
import AuthForm from "../Forms/AuthForms";
import useAuthContext from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
import Navbar from "./Navbar";
import { MdMenu } from "react-icons/md";

const Header = ({ screen, setShowSidebar }) => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const { showModal, setShowModal, activeModalItem, activeModalItemHandler } =
    useRecipeContext();
  const { form, bookmark } = activeModalItem;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  const handleLogin = () => {
    activeModalItemHandler("form");
    setShowModal(true);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <header className="flex  items-center bg-gray-300 h-[65px] sm:h-[93px] px-2 ">
        <img
          src={Logo}
          alt="Logo"
          onClick={handleClick}
          className="md:ml-5 mr-auto w-[50px] h-[50px] cursor-pointer"
        />

        {screen > 900 && (
          <Navbar user={user} onLogin={handleLogin} onLogout={handleLogout} />
        )}

        {screen <= 900 && (
          <MdMenu
            onClick={() => setShowSidebar(true)}
            className="text-4xl text-secondary-500 cursor-pointer mr-2"
          />
        )}
      </header>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        {bookmark && <BookMarks setShowSidebar={setShowSidebar} />}
        {form && <AuthForm />}
      </Modal>
    </>
  );
};

export default Header;
