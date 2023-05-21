import EmptyBoard from "./EmptyBoard";
import KanbanBoard from "./KanbanBoard";
import eye from "../assets/icon-show-sidebar.svg";
import { toggleSideBar } from "../store/UiSlice";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../interface/interfaces";

type Props = {};

const Board = ({}: Props) => {
  const boardState = useSelector((state: State) => state.board.boards);
  const activeBoardIndex = useSelector(
    (state: State) => state.board.activeBoardIndex
  );
  const dispatch = useDispatch();
  return (
    <div className="pt-[8rem] h-screen overflow-x-scroll">
      <button
        onClick={() => dispatch(toggleSideBar(true))}
        className="hidden fixed md:flex items-center justify-center bottom-[3rem] bg-[#635FC7] hover:bg-[#A8A4FF] duration-200 w-[3.5rem] h-[3.5rem] rounded-r-full"
      >
        <img src={eye} className="" alt="hidesvg" />
      </button>

      {boardState[activeBoardIndex].columns.length === 0 ? (
        <EmptyBoard />
      ) : (
        <KanbanBoard />
      )}
    </div>
  );
};

export default Board;
