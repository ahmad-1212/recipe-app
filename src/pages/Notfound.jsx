import { useNavigate } from "react-router-dom";

const Notfound = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="flex flex-col justify-center gap-5">
      <h1 className="text-3xl mt-[18rem]  text-secondary-500 text-center">
        The Page you are looking for in not Found!
      </h1>
      <button
        type="text"
        onClick={handleNavigation}
        className="px-8 py-4 uppercase text-center mx-auto rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 text-white w-max"
      >
        Back to Home
      </button>
    </div>
  );
};

export default Notfound;
