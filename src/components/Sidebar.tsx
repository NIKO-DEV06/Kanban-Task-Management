import board from "../assets/icon-board.svg";
import pboard from "../assets/purple-board.svg";
import padd from "../assets/purple-add.svg";
import moon from "../assets/icon-dark-theme.svg";
import sun from "../assets/icon-light-theme.svg";
import eye from "../assets/icon-hide-sidebar.svg";
import { useSelector, useDispatch } from "react-redux";
import { closeSidebar, toggleTheme } from "../store/ThemeSlice";
import { RootThemeState } from "../interface/interfaces";
import { State } from "../interface/interfaces";

import Board from "./Board";
import { setActiveBoard } from "../store/BoardSlice";

type Props = {};

const Sidebar = ({}: Props) => {
  const dispatch = useDispatch();
  const themeState = useSelector((state: RootThemeState) => state.theme.theme);
  const sidebarState = useSelector(
    (state: RootThemeState) => state.theme.sidebar
  );
  const boardState = useSelector((state: State) => state.board.boards);
  const activeBoardIndex = useSelector(
    (state: State) => state.board.activeBoardIndex
  );

  return (
    <>
      <div className="flex">
        <div
          className={`hidden bg-white md:flex flex-col fixed w-[19rem] inset-y-0 overflow-y-auto border-r border-[#E4EBFA] z-10 ${
            sidebarState
              ? "transform translate-x-0 transition-all duration-500"
              : "transform translate-x-[-100%] transition-all duration-500"
          }`}
        >
          <p className="uppercase mt-[7.5rem] text-[#828FA3] tracking-[0.2em] text-[0.85rem] font-[500] ml-[3rem] mb-[1rem] ">
            {`All boards (${boardState.length})`}
          </p>
          <div className="flex flex-col gap-[0.5rem]">
            {boardState.map((bName, index) => (
              <div
                key={bName.id}
                onClick={() => dispatch(setActiveBoard(index))}
                className={
                  activeBoardIndex === index
                    ? "flex gap-[1rem] items-center bg-[#635FC7] pl-[3rem] py-[0.8rem] rounded-r-full w-[17rem] cursor-pointer"
                    : "group flex gap-[1rem] items-center bg-white hover:bg-[#A8A4FF] pl-[3rem] py-[0.8rem] rounded-r-full w-[17rem] duration-200 cursor-pointer"
                }
              >
                <img
                  src={board}
                  alt="boardSvg"
                  className={
                    activeBoardIndex === index
                      ? " w-[1.2rem] h-[1.2rem] filter brightness-0 invert"
                      : " w-[1.2rem] h-[1.2rem] group-hover:filter group-hover:brightness-0 group-hover:invert duration-200"
                  }
                />
                <p
                  className={
                    activeBoardIndex === index
                      ? "text-white font-semibold"
                      : "text-[#828FA3] group-hover:text-white duration-200 font-semibold"
                  }
                >
                  {bName.name}
                </p>
              </div>
            ))}
          </div>
          <div className="flex ml-[3rem] gap-[1rem] mt-[1.5rem] hover:opacity-70 duration-200 cursor-pointer">
            <img
              src={pboard}
              className="w-[1.2rem] h-[1.2rem]"
              alt="board svg"
            />
            <div className="flex items-center gap-[0.3rem]">
              <img src={padd} className="w-[0.7rem] h-[0.7rem]" alt="" />
              <p className="font-semibold text-[#635FC7]">Create New Board</p>
            </div>
          </div>
          <div className="flex justify-center items-center gap-[1rem] bg-[#ebeef4] mx-[3rem] py-[0.5rem] rounded-md mt-[18rem] cursor-pointer">
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
          <button
            onClick={() => dispatch(closeSidebar())}
            className="flex ml-[3rem] items-center gap-[1rem] mt-[1rem] hover:opacity-60 duration-200"
          >
            <img src={eye} className="h-[1.1rem] w-[1.3rem]" alt="hidesvg" />
            <p className="text-[#828FA3] font-[500]">Hide Sidebar</p>
          </button>
        </div>
        <Board />
      </div>
    </>
  );
};

export default Sidebar;
