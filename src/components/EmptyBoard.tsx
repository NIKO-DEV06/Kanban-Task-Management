import add from "../assets/icon-add-task-mobile.svg";
import { useSelector, useDispatch } from "react-redux";
import { RootThemeState, State } from "../interface/interfaces";
import { toogleAddBoardModal, toogleEditBoardModal } from "../store/UiSlice";

type Props = {};

const EmptyBoard = ({}: Props) => {
  const dispatch = useDispatch();
  const boardState = useSelector((state: State) => state.board.boards);

  const sidebarState = useSelector((state: RootThemeState) => state.ui.sidebar);

  return (
    <div
      className={`flex flex-col justify-center items-center translate-y-[14rem] gap-[1.5rem] ${
        sidebarState
          ? "md:pl-[0rem] md:translate-x-[-2.5rem] lg:pl-[5rem] xl:pl-[10rem]"
          : "md:pl-[5rem] md:translate-x-[-2.5rem] lg:pl-[13rem] xl:pl-[20rem]"
      }`}
    >
      <h1 className="text-center text-[1.5rem] mx-[1rem] md:ml-[3rem] font-semibold text-[#828FA3]">
        {boardState.length === 0
          ? "There are no Boards. Create a Board to get started."
          : " This board is empty. Create a new column to get started."}
      </h1>
      <button
        onClick={() =>
          boardState.length === 0
            ? dispatch(toogleAddBoardModal(true))
            : dispatch(toogleEditBoardModal(true))
        }
        className="bg-[#635FC7] hover:bg-[#A8A4FF] duration-200 flex justify-center items-center gap-[0.5rem] w-[13rem] h-[4rem] rounded-full"
      >
        <div>
          <img src={add} alt="" />
        </div>
        <p className="text-white font-semibold text-[1.1rem]">
          {" "}
          {boardState.length === 0 ? "Add New Board" : " Add New Column"}
        </p>
      </button>
    </div>
  );
};

export default EmptyBoard;
