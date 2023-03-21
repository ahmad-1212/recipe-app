import { HiOutlineHome } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import { BsBookmarks } from "react-icons/bs";

const SvgIcon = () => (
  <svg className="w-[25px] h-[25px]" id="icon-receipt_long" viewBox="0 0 24 24">
    <path d="M19.5 3.516l-1.5-1.5-1.5 1.5-1.5-1.5-1.5 1.5-1.5-1.5-1.5 1.5-1.5-1.5-1.5 1.5-1.5-1.5v13.969h-3v3q0 0.844 0.398 1.523t1.078 1.078 1.523 0.398h12q0.844 0 1.523-0.398t1.078-1.078 0.398-1.523v-16.969zM18.984 18.984q0 0.422-0.281 0.727t-0.703 0.305-0.703-0.305-0.281-0.727v-3h-9v-10.969h10.969v13.969zM9 6.984h6v2.016h-6v-2.016zM15.984 6.984h2.016v2.016h-2.016v-2.016zM9 9.984h6v2.016h-6v-2.016zM15.984 9.984h2.016v2.016h-2.016v-2.016z"></path>
  </svg>
);

export const BASE_URL = "https://forkify-api.herokuapp.com/api/v2/recipes/";

export const NAV_ITEMS = [
  {
    title: "home",
    link: "/",
    type: "link",
    icon: <HiOutlineHome />,
    auth: false,
    isModal: false,
  },
  {
    title: "my recipes",
    link: "my-recipes",
    type: "link",
    icon: <SvgIcon />,
    auth: true,
    isModal: false,
  },
  {
    title: "add recipe",
    link: "add-recipe",
    type: "link",
    icon: <FiEdit />,
    auth: true,
    isModal: true,
  },
  {
    title: "bookmarks",
    icon: <BsBookmarks />,
    type: "modal",
    auth: false,
  },
];

export const SVG_VARIANTS = {
  hidden: {
    rotate: 0,
    scale: 0,
  },
  visible: {
    rotateY: 360,
    scale: [1, 1.5, 1],
    transition: {
      duration: 0.8,
    },
  },
};

export const OPACITY_VARIANTS = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

export const CARD_VARIANTS = {
  hidden: {
    y: -30,
    opacity: 0,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const SIDEBAR_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      duration: 0.3,
      staggerChildren: 0.05,
    },
  },
};

export const SIDEBAR_ITEM_VARIANTS = {
  hidden: { x: 100, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};
