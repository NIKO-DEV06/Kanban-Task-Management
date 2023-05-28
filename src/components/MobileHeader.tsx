import { useState } from "react";
import logoLight from "../assets/logo-mobile.svg";
import dropDown from "../assets/icon-chevron-down.svg";
import add from "../assets/icon-add-task-mobile.svg";
import options from "../assets/icon-vertical-ellipsis.svg";
import MobileMenu from "./MobileMenu";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleMobileMenu,
  toogleAddTaskModal,
  toogleDeleteBoardModal,
  toogleEditBoardModal,
} from "../store/UiSlice";
import { RootThemeState, State } from "../interface/interfaces";

type Props = {};

const MobileHeader = ({}: Props) => {
  const [editDeleteModal, setEditDeleteModal] = useState(false);
  const toggleEditDelete = () => {
    setEditDeleteModal(!editDeleteModal);
  };
  const dispatch = useDispatch();

  const boardState = useSelector((state: State) => state.board.boards);
  const activeBoardIndex = useSelector(
    (state: State) => state.board.activeBoardIndex
  );
  const sidebarState = useSelector(
    (state: RootThemeState) => state.ui.mobileMenu
  );
  return (
    <header className="fixed z-20 flex justify-between items-center w-full h-[6rem] p-[1.5rem] md:hidden bg-white border-b border-[#E4EBFA]">
      <div className="flex gap-[1rem] items-center">
        <img src={logoLight} alt="logo" className="h-[1.6rem]" />
        <h1
          onClick={() => dispatch(toggleMobileMenu(true))}
          className="text-[1.5rem] font-semibold"
        >
          {boardState[activeBoardIndex]?.name}
        </h1>
        <img
          onClick={() => dispatch(toggleMobileMenu(true))}
          src={dropDown}
          alt="dropdown"
          className="h-[0.5rem]"
        />
      </div>
      <div className="flex gap-[1rem]">
        <button
          onClick={() => dispatch(toogleAddTaskModal(true))}
          className="bg-[#635FC7] w-[3rem] h-[2rem] grid place-items-center rounded-[1rem]"
        >
          <img src={add} alt="add svg" />
        </button>
        <div>
          <img
            src={options}
            alt="ellipsis"
            className="translate-y-[0.3rem]"
            onClick={toggleEditDelete}
          />
          {editDeleteModal && (
            <div className="absolute bg-white right-[1rem] w-[12rem] top-[5.5rem] pl-[1rem] py-[1rem] flex flex-col gap-[1rem] rounded-lg shadow-input-shadow">
              <p
                onClick={() => {
                  setEditDeleteModal(false);
                  dispatch(toogleEditBoardModal(true));
                }}
                className="text-[#828FA3] cursor-pointer"
              >
                Edit Board
              </p>
              <p
                onClick={() => {
                  setEditDeleteModal(false);
                  dispatch(toogleDeleteBoardModal(true));
                }}
                className="text-[#EA5555] cursor-pointer"
              >
                Delete Board
              </p>
            </div>
          )}
        </div>
      </div>
      {sidebarState && <MobileMenu />}
    </header>
  );
};

export default MobileHeader;
