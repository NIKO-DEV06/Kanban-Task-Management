import board from "../assets/icon-board.svg";
import pboard from "../assets/purple-board.svg";
import padd from "../assets/purple-add.svg";
import moon from "../assets/icon-dark-theme.svg";
import sun from "../assets/icon-light-theme.svg";

import { useSelector, useDispatch } from "react-redux";
import { openSideBar, toggleTheme } from "../store/ThemeSlice";
import { RootThemeState } from "../interface/interfaces";

type Props = {};

const MobileMenu = ({}: Props) => {
  const dispatch = useDispatch();
  const themeState = useSelector((state: RootThemeState) => state.theme.theme);

  return (
    <>
      <div className="fixed bg-white z-40 mt-[27rem] pb-[1.5rem] rounded-lg pr-[1.5rem] translate-x-[15%]">
        <p className="uppercase mt-[1rem] text-[#828FA3] tracking-[0.2em] text-[0.85rem] font-[500] ml-[3rem] mb-[1rem] ">
          All boards (3)
        </p>
        <div className="flex flex-col gap-[0.5rem]">
          <div className="flex gap-[1rem] items-center bg-[#635FC7] pl-[3rem] py-[0.8rem] rounded-r-full w-[17rem] cursor-pointer">
            <img
              src={board}
              alt="boardSvg"
              className=" w-[1.2rem] h-[1.2rem] filter brightness-0 invert"
            />
            <p className="text-white font-semibold">Platform Launch</p>
          </div>
          {/* divi */}
          <div className="flex gap-[1rem] items-center bg-white pl-[3rem] py-[0.8rem] rounded-r-full w-[17rem] duration-200 ">
            <img
              src={board}
              alt="boardSvg"
              className=" w-[1.2rem] h-[1.2rem]"
            />
            <p className="text-[#828FA3] duration-200 font-semibold">
              Marketing Plan
            </p>
          </div>
        </div>
        <div className="flex ml-[3rem] gap-[1rem] mt-[1.5rem] hover:opacity-70 duration-200 cursor-pointer">
          <img src={pboard} className="w-[1.2rem] h-[1.2rem]" alt="board svg" />
          <div className="flex items-center gap-[0.3rem]">
            <img src={padd} className="w-[0.7rem] h-[0.7rem]" alt="" />
            <p className="font-semibold text-[#635FC7]">Create New Board</p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-[1rem] bg-[#ebeef4] mx-[3rem] py-[0.5rem] rounded-md mt-[2rem] cursor-pointer">
          <img src={moon} alt="sun" />
          <button
            onClick={() => dispatch(toggleTheme())}
            className=" relative w-[3.3rem] h-[1.5rem] bg-[#635FC7] rounded-full"
          >
            <div
              className={`absolute h-[1rem] w-[1rem] bg-white rounded-full top-[4px]
      right-[4px] transition-all duration-200 ${
        themeState ? "transform translate-x-[-180%]" : ""
      }`}
            ></div>
          </button>
          <img src={sun} alt="moon" />
        </div>
      </div>
      <div
        onClick={() => dispatch(openSideBar())}
        className="fixed bg-black opacity-50 inset-0"
      ></div>
    </>
  );
};

export default MobileMenu;
