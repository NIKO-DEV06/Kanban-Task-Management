import { useSelector, useDispatch } from "react-redux";
import { RootThemeState, State } from "../interface/interfaces";
import { generateRandomColor } from "../helpers/helpers";
import { viewTask, setActiveColumn } from "../store/BoardSlice";
import { openViewTaskModal } from "../store/ThemeSlice";
import ViewTask from "./ViewTask";
// import AddTask from "./AddTask";

type Props = {};

const KanbanBoard = ({}: Props) => {
  const dispatch = useDispatch();
  const sidebarState = useSelector(
    (state: RootThemeState) => state.theme.sidebar
  );
  const boardState = useSelector((state: State) => state.board.boards);
  const activeBoardIndex = useSelector(
    (state: State) => state.board.activeBoardIndex
  );
  const viewTaskIsVisble = useSelector(
    (state: RootThemeState) => state.theme.viewTask
  );

  console.log(boardState);

  return (
    <>
      <div
        className={` ${
          sidebarState
            ? "pl-[1.5rem] md:pl-[20.5rem] pb-[1rem]"
            : "pl-[1.5rem] md:pl-[3rem] pb-[1rem]"
        } overflow-visible flex`}
      >
        <div className="flex pr-[2rem]">
          {/* COL */}
          {boardState[activeBoardIndex].columns.map((column) => {
            const colId = column.id;
            return (
              <div key={column.id} className="col pr-[2rem]">
                <div className="flex items-center gap-[0.7rem]">
                  <div
                    className={`w-[1rem] h-[1rem] rounded-full`}
                    style={{ backgroundColor: generateRandomColor() }}
                  ></div>
                  <h1 className="text-[#828FA3] tracking-[0.2em] uppercase font-medium">
                    {`${column.name} (${column.tasks.length})`}
                  </h1>
                </div>
                {/* TASK */}
                {column.tasks.length === 0 && (
                  <div className="border-[#828fa3] border-2 border-dashed h-[33rem] w-[18rem] rounded-lg mt-[1rem] grid place-items-center group cursor-pointer"></div>
                )}
                {column.tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => {
                      dispatch(viewTask(task.id));
                      dispatch(setActiveColumn(colId));
                      dispatch(openViewTaskModal());
                    }}
                    className="bg-white px-[1.7rem] py-[1.5rem] w-[20rem] flex flex-col gap-[0.3rem] mt-[1rem] rounded-lg shadow-input-shadow hover:opacity-60 duration-200 cursor-pointer hover:scale-95"
                  >
                    <p className="font-semibold text-[1.2rem]">{task.title}</p>
                    <p className="text-[#828FA3] font-medium">
                      {" "}
                      {` ${
                        task?.subtasks.filter((subtask) => subtask.isCompleted)
                          .length
                      } of ${task?.subtasks.length} subtasks`}
                    </p>
                  </div>
                ))}
              </div>
            );
          })}
          <div className="bg-[#828fa332] h-[33rem] w-[18rem] rounded-lg mt-[2.5rem] grid place-items-center group cursor-pointer">
            <p className="text-[#828FA3] text-[1.4rem] font-semibold group-hover:text-[#635FC7] duration-200">
              + New Column
            </p>
          </div>
        </div>
        {viewTaskIsVisble && <ViewTask />}
        {/* <AddTask /> */}
      </div>
    </>
  );
};

export default KanbanBoard;
