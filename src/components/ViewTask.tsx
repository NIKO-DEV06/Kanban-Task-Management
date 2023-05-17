import { useSelector, useDispatch } from "react-redux";
import options from "../assets/icon-vertical-ellipsis.svg";
import { State, RootThemeState } from "../interface/interfaces";
import { closeViewTaskModal } from "../store/UiSlice";
import { updateTask } from "../store/BoardSlice";

import { useState } from "react";

type Props = {};

const ViewTask = ({}: Props) => {
  const [editDeleteModal, setEditDeleteModal] = useState(false);
  const sidebarState = useSelector((state: RootThemeState) => state.ui.sidebar);
  const toggleEditDelete = () => {
    setEditDeleteModal(!editDeleteModal);
  };
  const dispatch = useDispatch();
  const boardState = useSelector((state: State) => state.board.boards);
  const activeBoardIndex = useSelector(
    (state: State) => state.board.activeBoardIndex
  );
  const activeColumnId = useSelector(
    (state: State) => state.board.activeColumn
  );
  const activeTask = useSelector((state: State) => state.board.activeTask);

  const handleCheckboxChange = (subtaskId: number, isChecked: boolean) => {
    const updatedSubtasks = activeTask?.subtasks.map((subtask) =>
      subtask.id === subtaskId
        ? { ...subtask, isCompleted: isChecked }
        : subtask
    );

    dispatch(
      updateTask({
        id: activeTask?.id || 0,
        title: activeTask?.title || "",
        description: activeTask?.description || "",
        subtasks: updatedSubtasks || [],
      })
    );
  };

  //   const handleDropdownChange = (
  //     event: React.ChangeEvent<HTMLSelectElement>
  //   ) => {
  //     const selectedColumnId = event.target.value;

  //   };

  return (
    <>
      <div
        className={`fixed md:absolute z-30 w-screen flex justify-center  ${
          sidebarState
            ? "md:translate-x-[-20rem] translate-x-[-1.5rem]"
            : "translate-x-[-1.5rem]"
        }`}
      >
        <div className="bg-white fixed md:absolute w-[25rem] md:w-[30rem] pt-[2rem] pb-[2.5rem] rounded-lg z-30 overflow-scroll">
          <div className="flex justify-between mx-[1.5rem] items-center gap-[1rem]">
            <h2 className="font-bold text-[1.2rem]">{activeTask?.title}</h2>
            <div
              onClick={toggleEditDelete}
              className="hover:bg-[#828fa349] w-[1.2rem] h-[2.5rem] flex justify-center items-center rounded-t-full rounded-b-full duration-200 cursor-pointer"
            >
              <img src={options} alt="ellipse" className="h-[1.5rem]" />
            </div>
            {editDeleteModal && (
              <div className="absolute bg-white right-[1rem] w-[12rem] top-[4.7rem] pl-[1rem] py-[1rem] flex flex-col gap-[1rem] rounded-lg shadow-input-shadow">
                <p
                  onClick={() => setEditDeleteModal(false)}
                  className="text-[#828FA3] cursor-pointer hover:opacity-70 duration-200"
                >
                  Edit Task
                </p>
                <p
                  onClick={() => setEditDeleteModal(false)}
                  className="text-[#EA5555] cursor-pointer hover:opacity-70 duration-200"
                >
                  Delete Task
                </p>
              </div>
            )}
          </div>
          <p className="mx-[1.5rem] my-[1.5rem] text-[#828FA3]">
            {activeTask?.description.trim() === ""
              ? "No Description."
              : activeTask?.description}
          </p>
          <p className="text-[#828FA3] font-semibold ml-[1.5rem] pb-[1rem]">
            {` Subtasks (${
              activeTask?.subtasks.filter((subtask) => subtask.isCompleted)
                .length
            } of ${activeTask?.subtasks.length})`}
          </p>
          <div className="max-h-[10rem] overflow-auto">
            {activeTask?.subtasks.map((subtask) => (
              <p
                key={subtask.id}
                className="flex items-center px-[1rem] py-[0.5rem] mx-[1.5rem] gap-[1rem] bg-[#F4F7FD] hover:bg-[#625fc752] duration-200 rounded-lg mb-[1rem]"
              >
                <input
                  defaultChecked={subtask.isCompleted}
                  onChange={(event) =>
                    handleCheckboxChange(subtask.id, event.target.checked)
                  }
                  type="checkbox"
                  className="peer cursor-pointer checked:bg-[#635FC7] appearance-none min-w-[1.2rem] h-[1.2rem] bg-white border-[1.5px] border-[#828fa351] rounded-sm relative after:content-[''] after:w-full after:h-full after:absolute after:left-0 after:top-0 after:bg-no-repeat after:bg-center after:bg-[length:12px] after:bg-[url('.././src/assets/icon-check.svg')] after:opacity-0 after:checked:opacity-100"
                />
                <span className="pr-[3rem] font-semibold peer-checked:line-through peer-checked:text-[#00011278] text-[0.95rem]">
                  {subtask.title}
                </span>
              </p>
            ))}
          </div>

          <p className="font-semibold text-[#828FA3] ml-[2.5rem] md:ml-[1.5rem] mt-[1.1rem]">
            Current Status
          </p>
          <div className="relative w-full grid place-items-center md:place-items-start">
            <div className="appearance-none bg-white flex items-center border-2 mx-[1.5rem] w-[20rem] md:w-[27rem] border-[#625fc758] text-[1.1rem] rounded-lg mt-[0.7rem] px-[1rem] py-[0.7rem] justify-center font-semibold">
              {
                boardState[activeBoardIndex].columns.find(
                  (col) => col.id === activeColumnId
                )?.name
              }
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => dispatch(closeViewTaskModal())}
        className="fixed inset-0 bg-black z-20 opacity-50"
      ></div>
    </>
  );
};

export default ViewTask;
