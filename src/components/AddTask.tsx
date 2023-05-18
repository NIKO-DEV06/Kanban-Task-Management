import { useState, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootThemeState } from "../interface/interfaces";
import xSvg from "../assets/icon-cross.svg";
import add from "../assets/purple-add.svg";
import drop from "../assets/icon-chevron-down.svg";
import { State } from "../interface/interfaces";
import { addTask } from "../store/BoardSlice";
import { toogleAddTaskModal } from "../store/UiSlice";

type Props = {};

const AddTask = ({}: Props) => {
  const dispatch = useDispatch();
  const sidebarState = useSelector((state: RootThemeState) => state.ui.sidebar);
  const boardState = useSelector((state: State) => state.board.boards);
  const activeBoardIndex = useSelector(
    (state: State) => state.board.activeBoardIndex
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(
    boardState[activeBoardIndex].columns[0].name
  );
  const [subtasks, setSubtasks] = useState<string[]>([]);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };

  const addSubtask = () => {
    setSubtasks([...subtasks, ""]);
  };

  const removeSubtask = (index: number) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks.splice(index, 1);
    setSubtasks(updatedSubtasks);
  };

  const handleSubtaskChange = (index: number, value: string) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index] = value;
    setSubtasks(updatedSubtasks);
  };

  const newTask = {
    description,
    id: Date.now(),
    subtasks: subtasks.map((subtask) => ({
      id: Math.random(),
      title: subtask,
      isCompleted: false,
    })),
    title,
  };

  const testSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addTask({ task: newTask, selectedStatus: status }));
  };

  return (
    <>
      <div
        className={`fixed md:absolute z-30 w-screen flex justify-center translate-y-[-5.5rem] md:translate-y-[-6.3rem]  ${
          sidebarState
            ? "md:translate-x-[-20rem] translate-x-[-1.5rem]"
            : "translate-x-[-1.5rem]"
        }`}
      >
        <form
          onSubmit={testSubmit}
          className="bg-white fixed md:absolute w-[25rem] md:w-[30rem] pt-[2rem] pb-[1rem] rounded-lg z-30 overflow-scroll px-[1.65rem] h-[43rem] md:h-[42rem] scale-90 md:scale-95"
        >
          <h1 className="font-semibold text-[1.4rem]">Add New Task</h1>
          <div className="flex flex-col gap-[1.5rem]">
            <div>
              <p className="text-[#828FA3] text-[1.1rem] font-[500] mt-[1.5rem] mb-[0.5rem]">
                Title
              </p>
              <input
                type="text"
                placeholder="e.g. Take coffee break"
                className="outline-none border-[2px] border-[#00011241] focus:border-[#635FC7] indent-4 h-[3rem] w-full rounded-md appearance-none text-[0.95rem]"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <p className="text-[#828FA3] text-[1.1rem] font-[500] mb-[0.5rem]">
                Description
              </p>
              <textarea
                name="description"
                cols={30}
                rows={10}
                autoComplete="off"
                placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
                className="outline-none border-[2px] border-[#00011241] focus:border-[#635FC7] px-4 h-[7rem] pt-3 w-full rounded-md appearance-none text-[0.95rem] resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <p className="text-[#828FA3] text-[1.1rem] font-[500] mb-[0.5rem]">
                Subtasks
              </p>
              <div className="max-h-[8rem] overflow-scroll flex flex-col gap-[0.5rem]">
                {subtasks.map((subtask, index) => (
                  <div
                    key={index}
                    className="flex justify-between gap-[1rem] items-center"
                  >
                    <input
                      type="text"
                      placeholder=""
                      className="outline-none border-[2px] border-[#00011241] focus:border-[#635FC7] indent-4 h-[3rem] w-full rounded-md appearance-none text-[0.95rem]"
                      onChange={(e) =>
                        handleSubtaskChange(index, e.target.value)
                      }
                      value={subtask}
                    />
                    <img
                      src={xSvg}
                      alt=""
                      className="w-[1.3rem] h-[1.3rem] cursor-pointer"
                      onClick={() => removeSubtask(index)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            onClick={addSubtask}
            className="bg-[#625fc72a] flex justify-center rounded-full py-[0.9rem] mt-[1rem] gap-[0.5rem] items-center cursor-pointer"
          >
            <img src={add} alt="addSvg" className="h-[0.65rem] w-[0.65rem]" />
            <p className="text-[#635FC7] font-semibold">Add New Subtask</p>
          </div>
          <div className="mt-[1.5rem]">
            <p className="text-[#828FA3] text-[1.1rem] font-[500] mb-[0.5rem]">
              Status
            </p>

            <div className="relative">
              <select
                id="dropdown"
                name="services"
                className="cursor-pointer bg-white font-[500] text-[#656161] w-full border-2 outline-none py-3 px-[1.5rem] appearance-none rounded-md"
                value={status}
                onChange={handleStatusChange}
              >
                {boardState[activeBoardIndex].columns.map((col) => (
                  <option key={col.id} value={col.name}>
                    {col.name}
                  </option>
                ))}
              </select>
              <img
                src={drop}
                alt=""
                className="absolute right-[1.2rem] top-[50%] scale-[1.5]"
              />
            </div>

            <button className="bg-[#635FC7] flex justify-center rounded-full py-[0.9rem] mt-[1rem] gap-[0.5rem] items-center w-full">
              <p className="text-white font-semibold">Create Task</p>
            </button>
          </div>
        </form>
      </div>
      <div
        onClick={() => dispatch(toogleAddTaskModal(false))}
        className="fixed inset-0 bg-black z-20 opacity-50"
      ></div>
    </>
  );
};

export default AddTask;
