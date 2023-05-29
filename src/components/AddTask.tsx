import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RootThemeState } from "../interface/interfaces";
import xSvg from "../assets/icon-cross.svg";
import xSvgRed from "../assets/subtask-red-close.svg";
import add from "../assets/purple-add.svg";
import drop from "../assets/icon-chevron-down.svg";
import { State } from "../interface/interfaces";
import { addTask } from "../store/BoardSlice";
import { toogleAddTaskModal } from "../store/UiSlice";

type Props = {};

type Subtasks = {
  id: number;
  name: string;
};
type FormValues = {
  title: string;
  description: string;
  subtasks: Subtasks[];
};

const AddTask = ({}: Props) => {
  const dispatch = useDispatch();
  const sidebarState = useSelector((state: RootThemeState) => state.ui.sidebar);
  const boardState = useSelector((state: State) => state.board.boards);
  const activeBoardIndex = useSelector(
    (state: State) => state.board.activeBoardIndex
  );
  const [duplicateTaskState, setDuplicateTaskState] = useState(false);
  const [status, setStatus] = useState(
    boardState[activeBoardIndex].columns[0].name
  );
  const [subtasks, setSubtasks] = useState<Subtasks[]>([{ id: 0, name: "" }]);
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };

  const addSubtask = () => {
    const newSubtasks: Subtasks = {
      id: Date.now(),
      name: "",
    };
    setSubtasks([...subtasks, newSubtasks]);
  };

  const removeSubtask = (index: number) => {
    const updatedSubtasks = subtasks
      .filter((_, idx) => idx !== index)
      .map((subtask, idx) => ({ ...subtask, id: idx }));
    setSubtasks(updatedSubtasks);
  };
  const handleChangeSubtask = (index: number, value: string) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index].name = value;
    setSubtasks(updatedSubtasks);
  };

  const schema = yup
    .object()
    .shape({
      title: yup.string().trim().required("Title field is required"),
      description: yup
        .string()
        .trim()
        .required("Description field is required"),
      subtasks: yup.array().of(
        yup.object().shape({
          name: yup.string().trim().required("Can't be empty"),
        })
      ),
    })
    .test(
      "duplicate-task",
      "Task with the same name already exists",
      function (values) {
        const allTasks = boardState.flatMap((board) =>
          board.columns.flatMap((column) => column.tasks)
        );
        const duplicateTask = allTasks.find(
          (task) => task.title === values.title
        );
        duplicateTask
          ? setDuplicateTaskState(true)
          : setDuplicateTaskState(false);
        return !duplicateTask;
      }
    );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const submitAddTaskForm = (data: FormValues) => {
    const { title, description } = data;
    const newTask = {
      description,
      id: Date.now(),
      subtasks: subtasks.map((subtask) => ({
        id: Math.random(),
        title: subtask.name,
        isCompleted: false,
      })),
      title,
    };
    dispatch(addTask({ task: newTask, selectedStatus: status }));
    dispatch(toogleAddTaskModal(false));
    reset();
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
          onSubmit={handleSubmit(submitAddTaskForm)}
          className="bg-white dark:bg-[#2B2C37] dark:text-white fixed md:absolute w-[25rem] md:w-[30rem] pt-[2rem] pb-[1rem] rounded-lg z-30 overflow-scroll px-[1.65rem] h-[43rem] md:h-[42rem] scale-90 md:scale-95"
        >
          <h1 className="font-[600] text-[1.25rem]">Add New Task</h1>
          <div className="flex flex-col gap-[0.7rem]">
            <div>
              <p className="text-[#828FA3] dark:text-white text-[1rem] font-[500] mt-[1.2rem] mb-[0.5rem]">
                Title
              </p>
              <input
                {...register("title")}
                name="title"
                type="text"
                placeholder="e.g. Take coffee break"
                className={`outline-none border-[2px] dark:bg-[#2B2C37] ${
                  errors.title || duplicateTaskState
                    ? "focus:border-[#ea5555] border-[#ea5555]"
                    : "focus:border-[#635FC7] border-[#00011241] dark:border-[#3E3F4E]"
                }  indent-4 h-[3rem] w-full rounded-md appearance-none text-[0.95rem]`}
              />

              <p className="text-[#ea5555] font-[500] text-sm text-left pt-1">
                {errors.title?.message}
              </p>
              {duplicateTaskState && (
                <p className=" absolute text-[#ea5555] font-[500] text-sm text-left pt-1 right-[3rem] top-[7.7rem]">
                  Used
                </p>
              )}
            </div>
            <div>
              <p className="text-[#828FA3] dark:text-white text-[1rem] font-[500] mb-[0.5rem]">
                Description
              </p>
              <textarea
                {...register("description")}
                name="description"
                cols={30}
                rows={10}
                autoComplete="off"
                placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
                className={`outline-none border-[2px] dark:bg-[#2B2C37]  ${
                  errors.description
                    ? "focus:border-[#ea5555] border-[#ea5555]"
                    : "focus:border-[#635FC7] border-[#00011241] dark:border-[#3E3F4E]"
                } px-4 h-[7rem] pt-3 w-full rounded-md appearance-none text-[0.95rem] resize-none`}
              />
              <p className="text-[#ea5555] font-[500] text-sm text-left pt-1">
                {errors.description?.message}
              </p>
            </div>
            <div>
              <p className="text-[#828FA3] dark:text-white text-[1rem] font-[500] mb-[0.5rem]">
                Subtasks
              </p>
              <div className="max-h-[8rem] overflow-scroll flex flex-col gap-[0.5rem]">
                {subtasks.map((subtask, index) => (
                  <div
                    key={subtask.id}
                    className="flex relative justify-between gap-[1rem] items-center"
                  >
                    <input
                      {...register(`subtasks.${index}.name`, {
                        shouldUnregister: true,
                      })}
                      type="text"
                      placeholder=""
                      className={`outline-none border-[2px] dark:bg-[#2B2C37] ${
                        errors.subtasks && errors.subtasks[index]
                          ? "focus:border-[#ea5555] border-[#ea5555]"
                          : "focus:border-[#635FC7] border-[#00011241] dark:border-[#3E3F4E]"
                      } indent-4 h-[3rem] w-full rounded-md appearance-none text-[0.95rem]`}
                      value={subtask.name}
                      onChange={(e) =>
                        handleChangeSubtask(index, e.target.value)
                      }
                    />
                    <img
                      src={
                        errors.subtasks && errors.subtasks[index]
                          ? xSvgRed
                          : xSvg
                      }
                      alt=""
                      className="w-[1.3rem] h-[1.3rem] cursor-pointer"
                      onClick={() => removeSubtask(index)}
                    />
                    {errors.subtasks && errors.subtasks[index] && (
                      <p className="absolute text-[#ea5555] right-[3.5rem] text-sm text-left pt-1 font-[400] translate-y-[-1.5px]">
                        {errors.subtasks[index]?.name?.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            onClick={addSubtask}
            className="bg-[#625fc72a] dark:bg-white flex justify-center rounded-full py-[0.9rem] mt-[1rem] gap-[0.5rem] items-center cursor-pointer"
          >
            <img src={add} alt="addSvg" className="h-[0.65rem] w-[0.65rem]" />
            <p className="text-[#635FC7] font-semibold">Add New Subtask</p>
          </div>
          <div className="mt-[1.5rem]">
            <p className="text-[#828FA3] dark:text-white text-[1rem] font-[500] mb-[0.5rem]">
              Status
            </p>

            <div className="relative">
              <select
                id="dropdown"
                name="services"
                className="cursor-pointer bg-white dark:bg-[#2B2C37] dark:text-white font-[500] text-[#656161] w-full border-2 dark:border-[#3E3F4E] outline-none py-3 px-[1.5rem] appearance-none rounded-md"
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
