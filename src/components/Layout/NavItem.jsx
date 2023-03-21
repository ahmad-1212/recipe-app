import { NavLink } from "react-router-dom";
import useRecipeContext from "../../hooks/useRecipeContext";

const NavItem = ({ navItem, user }) => {
  const { title, link, icon, auth, isModal, type } = navItem;
  const { setShowModal, activeModalItemHandler } = useRecipeContext();

  const handleModal = (item) => {
    activeModalItemHandler(item);
    setShowModal(true);
  };

  const styles = "self-stretch flex items-center cursor-pointer";

  // Checking if type is modal
  // Then it will return li item which will show modal
  // and modal item e.g bookmark
  if (type === "modal") {
    return (
      <li
        onClick={() => handleModal("bookmark")}
        className={`${styles} px-3 hover:bg-gray-500 gap-1`}
      >
        <span className="text-2xl text-secondary-500 fill-secondary-500">
          {icon}
        </span>
        <span className="uppercase text-base">{title}</span>
      </li>
    );
  }

  // Checking if there is no user
  // auth and is modal is true than instead of link
  // it will return a li item whick will show the login form
  if (auth && !user && isModal) {
    return (
      <li
        onClick={() => handleModal("form")}
        className={`${styles} px-3 hover:bg-gray-500 gap-1`}
      >
        <span className="text-2xl text-secondary-500 fill-secondary-500">
          {icon}
        </span>
        <span className="uppercase text-base">{title}</span>
      </li>
    );
  }

  // if there is no user and auth is true than it donot return a link

  if (auth && !user) {
    return;
  }

  return (
    <>
      {
        <li className={`${styles} px-3 hover:bg-gray-500`}>
          <NavLink to={link} className={`${styles} gap-1`}>
            <span className="text-2xl text-secondary-500 fill-secondary-500">
              {icon}
            </span>
            <span className="uppercase text-base">{title}</span>
          </NavLink>
        </li>
      }
    </>
  );
};

export default NavItem;
