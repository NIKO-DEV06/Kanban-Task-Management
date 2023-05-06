import EmptyBoard from "./EmptyBoard";
import eye from "../assets/icon-show-sidebar.svg";
import { openSideBar } from "../store/ThemeSlice";
import { useDispatch } from "react-redux";

// import KanbanBoard from "./KanbanBoard";

type Props = {};

const Board = ({}: Props) => {
  const dispatch = useDispatch();
  return (
    <div className="pt-[8rem] h-screen overflow-x-scroll">
      <button
        onClick={() => dispatch(openSideBar())}
        className="fixed flex items-center justify-center bottom-[3rem] bg-[#635FC7] w-[3.5rem] h-[3.5rem] rounded-r-full"
      >
        <img src={eye} className="" alt="hidesvg" />
      </button>
      {/* <KanbanBoard /> */}
      <EmptyBoard />
    </div>
  );
};

export default Board;
