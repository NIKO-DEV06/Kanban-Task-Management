import { useSelector, useDispatch } from "react-redux";
import { RootThemeState, State } from "../interface/interfaces";
import { toogleDeleteBoardModal } from "../store/UiSlice";
import { deleteBoard } from "../store/BoardSlice";

const DeleteBoard = () => {
  const dispatch = useDispatch();
  const boardState = useSelector((state: State) => state.board.boards);
  const activeBoardIndex = useSelector(
    (state: State) => state.board.activeBoardIndex
  );
  const sidebarState = useSelector((state: RootThemeState) => state.ui.sidebar);

  return (
    <>
      <div className="fixed z-30 w-screen flex justify-center pointer-events-none">
        <div
          className={`pointer-events-auto bg-white flex flex-col gap-[1.5rem] mx-[1.5rem] rounded-lg py-[2rem] px-[2rem] translate-y-[5.5rem] ${
            sidebarState
              ? "translate-x-[-1.4rem] md:translate-x-[-20rem]"
              : "translate-x-[-1.4rem] md:translate-x-[-3rem]"
          } md:w-[30rem]`}
        >
          <h1 className="text-[#EA5555] text-[1.2rem] font-semibold">
            Delete this board?
          </h1>
          <p className="text-[#828FA3]">
            {`Are you sure you want to delete the '${boardState[activeBoardIndex].name}' board? This
            action will remove all columns and tasks and cannot be reversed.`}
          </p>
          <div className="flex flex-col md:flex-row gap-[0.5rem]">
            <button
              onClick={() => {
                dispatch(deleteBoard(activeBoardIndex));
                dispatch(toogleDeleteBoardModal(false));
              }}
              className="text-white bg-[#EA5555] py-[0.5rem] rounded-full md:hover:opacity-70 duration-300 w-full"
            >
              Delete
            </button>
            <button
              onClick={() => dispatch(toogleDeleteBoardModal(false))}
              className="text-[#635FC7] bg-[#f0effa] py-[0.5rem] rounded-full md:hover:opacity-70 duration-300 w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div
        onClick={() => dispatch(toogleDeleteBoardModal(false))}
        className="fixed inset-0 bg-black z-20 opacity-50"
      ></div>
    </>
  );
};

export default DeleteBoard;
