import { useSelector, useDispatch } from "react-redux";
import { RootThemeState, State } from "../interface/interfaces";
import {
  viewTask,
  setActiveColumn,
  updateTaskPosition,
} from "../store/BoardSlice";
import { toogleViewTaskModal, toogleEditBoardModal } from "../store/UiSlice";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ViewTask from "./ViewTask";
import AddTask from "./AddTask";
import DeleteTask from "./DeleteTask";
import EditTask from "./EditTask";
import { motion } from "framer-motion";
import AddBoard from "./AddBoard";
import DeleteBoard from "./DeleteBoard";
import EmptyBoard from "./EmptyBoard";
import EditBoard from "./EditBoard";

type Props = {};

const KanbanBoard = ({}: Props) => {
  const dispatch = useDispatch();
  const sidebarState = useSelector((state: RootThemeState) => state.ui.sidebar);
  const boardState = useSelector((state: State) => state.board.boards);
  const activeBoardIndex = useSelector(
    (state: State) => state.board.activeBoardIndex
  );
  const viewTaskIsVisble = useSelector(
    (state: RootThemeState) => state.ui.viewTask
  );
  const addTaskIsVisble = useSelector(
    (state: RootThemeState) => state.ui.addTask
  );
  const deleteTaskIsVisble = useSelector(
    (state: RootThemeState) => state.ui.deleteTask
  );
  const editTaskIsVisble = useSelector(
    (state: RootThemeState) => state.ui.editTask
  );
  const addBoardIsVisble = useSelector(
    (state: RootThemeState) => state.ui.addBoard
  );
  const deleteBoardIsVisble = useSelector(
    (state: RootThemeState) => state.ui.deleteBoard
  );
  const editBoardIsVisble = useSelector(
    (state: RootThemeState) => state.ui.editBoard
  );
  const colors = ["#49C4E5", "#8471F2", "#67E2AE", "#f084f0"];

  const onDragEnd = (result: any) => {
    const { destination, source } = result;

    // Check if the drag operation was dropped outside a droppable area
    if (!destination) {
      return;
    }

    // Check if the task was dropped in a different position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumnId = parseInt(
      source.droppableId.replace("kanbanboard-", "")
    );
    const destinationColumnId = parseInt(
      destination.droppableId.replace("kanbanboard-", "")
    );
    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    // Dispatch an action to update the task position in the board state
    dispatch(
      updateTaskPosition({
        sourceColumnId,
        destinationColumnId,
        sourceIndex,
        destinationIndex,
      })
    );
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div
          className={` ${
            sidebarState
              ? "pl-[1.5rem] md:pl-[20.5rem] pb-[1rem]"
              : "pl-[1.5rem] md:pl-[3rem] pb-[1rem]"
          } overflow-visible flex`}
        >
          <div className="flex pr-[2rem]">
            {/* COL */}
            {boardState[activeBoardIndex]?.columns.map((column, index) => {
              const colId = column.id;
              const colorIndex = index % colors.length;
              const backgroundColor = colors[colorIndex];
              return (
                <Droppable droppableId={`kanbanboard-${colId}`} key={colId}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      key={column.id}
                      className="col pr-[2rem]"
                    >
                      <div className="flex items-center gap-[0.7rem]">
                        <div
                          className={`w-[1rem] h-[1rem] rounded-full`}
                          style={{ backgroundColor }}
                        ></div>
                        <h1 className="text-[#828FA3] tracking-[0.2em] uppercase font-medium w-[16rem]">
                          {`${column.name} (${column.tasks.length})`}
                        </h1>
                      </div>
                      {/* TASK */}
                      {column.tasks.length === 0 && (
                        <div className="border-[#828fa3] border-2 border-dashed h-[33rem] w-[18rem] rounded-lg mt-[1rem] grid place-items-center group cursor-pointer"></div>
                      )}
                      {column.tasks.map((task, index) => (
                        <Draggable
                          key={task.id.toString()}
                          draggableId={task.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <motion.div
                                ref={provided.innerRef}
                                whileTap={{ scale: 0.85 }}
                                onClick={() => {
                                  dispatch(viewTask(task.id));
                                  dispatch(setActiveColumn(colId));
                                  dispatch(toogleViewTaskModal(true));
                                }}
                                className="bg-white group px-[1.7rem] py-[1.5rem] w-[20rem] flex flex-col gap-[0.3rem] mt-[1rem] rounded-lg shadow-input-shadow md:hover:opacity-60 duration-200  md:hover:scale-95"
                              >
                                <p className="font-semibold group-hover:text-[#635FC7] text-[1.1rem]">
                                  {task.title}
                                </p>

                                {task?.subtasks.length === 0 ? (
                                  <p className="text-[#828FA3] italic font-medium">
                                    No Subtasks
                                  </p>
                                ) : (
                                  <p className="text-[#828FA3] font-medium">
                                    {` ${
                                      task?.subtasks.filter(
                                        (subtask) => subtask.isCompleted
                                      ).length
                                    } of ${task?.subtasks.length} subtasks`}
                                  </p>
                                )}
                              </motion.div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              );
            })}
            {boardState.length !== 0 && (
              <div
                onClick={() => dispatch(toogleEditBoardModal(true))}
                className="bg-[#828fa332] h-[33rem] w-[18rem] rounded-lg mt-[2.5rem] grid place-items-center group cursor-pointer"
              >
                <p className="text-[#828FA3] text-[1.4rem] font-semibold group-hover:text-[#635FC7] duration-200">
                  + New Column
                </p>
              </div>
            )}
          </div>
          {viewTaskIsVisble && <ViewTask />}
          {addTaskIsVisble && <AddTask />}
          {deleteTaskIsVisble && <DeleteTask />}
          {editTaskIsVisble && <EditTask />}
          {addBoardIsVisble && <AddBoard />}
          {deleteBoardIsVisble && <DeleteBoard />}
          {editBoardIsVisble && <EditBoard />}
          {boardState[activeBoardIndex]?.columns.length === 0 ||
            (boardState.length === 0 && <EmptyBoard />)}
        </div>
      </DragDropContext>
    </>
  );
};

export default KanbanBoard;
