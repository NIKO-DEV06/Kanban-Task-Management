import { useSelector, useDispatch } from "react-redux";
import { RootThemeState, State } from "../interface/interfaces";
import { toogleDeleteTaskModal } from "../store/UiSlice";
import { deleteTask } from "../store/BoardSlice";

const DeleteTask = () => {
  const dispatch = useDispatch();
  const sidebarState = useSelector((state: RootThemeState) => state.ui.sidebar);
  const activeTask = useSelector((state: State) => state.board.activeTask);
  const activeTaskId = activeTask?.id;
  return (
    <>
      <div className="fixed z-30 w-screen flex justify-center">
        <div
          className={`bg-white flex flex-col gap-[1.5rem] mx-[1.5rem] rounded-lg py-[2rem] px-[2rem] translate-y-[5.5rem] ${
            sidebarState
              ? "translate-x-[-1.4rem] md:translate-x-[-20rem]"
              : "translate-x-[-1.4rem] md:translate-x-[-3rem]"
          } md:w-[30rem]`}
        >
          <h1 className="text-[#EA5555] text-[1.2rem] font-semibold">
            Delete this task?
          </h1>
          <p className="text-[#828FA3]">
            Are you sure you want to delete the 'Build settings UI' task and its
            subtasks? This action cannot be reversed.
          </p>
          <div className="flex flex-col md:flex-row gap-[0.5rem]">
            <button
              onClick={() => {
                if (activeTaskId !== undefined) {
                  dispatch(deleteTask(activeTaskId));
                }
                dispatch(toogleDeleteTaskModal(false));
              }}
              className="text-white bg-[#EA5555] py-[0.5rem] rounded-full md:hover:opacity-70 duration-300 w-full"
            >
              Delete
            </button>
            <button
              onClick={() => dispatch(toogleDeleteTaskModal(false))}
              className="text-[#635FC7] bg-[#f0effa] py-[0.5rem] rounded-full md:hover:opacity-70 duration-300 w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 bg-black z-20 opacity-50"></div>
    </>
  );
};

export default DeleteTask;
