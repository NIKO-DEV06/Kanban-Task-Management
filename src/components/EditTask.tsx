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
import { toogleEditTaskModal } from "../store/UiSlice";
import { editTask } from "../store/BoardSlice";

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

const EditTask = ({}: Props) => {
  const dispatch = useDispatch();
  const sidebarState = useSelector((state: RootThemeState) => state.ui.sidebar);
  const boardState = useSelector((state: State) => state.board.boards);
  const activeBoardIndex = useSelector(
    (state: State) => state.board.activeBoardIndex
  );
  const activeTask = useSelector((state: State) => state.board.activeTask);
  const activeColumn = useSelector((state: State) => state.board.activeColumn);
  const [duplicateTaskState, setDuplicateTaskState] = useState(false);

  const defaultTitle = activeTask?.title;
  const defaultDescription = activeTask?.description;
  const [subtasks, setSubtasks] = useState<Subtasks[]>(
    activeTask?.subtasks.map((subtask) => ({
      id: subtask.id,
      name: subtask.title,
    })) || [{ id: 0, name: "" }]
  );

  const [isComSubtasks, setIsComSubtasks] = useState<boolean[]>(
    activeTask?.subtasks.map((subtask) => subtask.isCompleted) || [false]
  );

  const [status, setStatus] = useState(
    boardState[activeBoardIndex].columns.find((col) => col.id === activeColumn)
      ?.name
  );

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
    setIsComSubtasks((prevIsComSubtasks) => {
      const updatedIsComSubtasks = [...prevIsComSubtasks];
      updatedIsComSubtasks[index] = isComSubtasks[index] || false;
      return updatedIsComSubtasks;
    });
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
          (task) =>
            task.title.toLocaleLowerCase() ===
              values.title.toLocaleLowerCase() &&
            activeTask?.title.toLocaleLowerCase() !==
              values.title.toLocaleLowerCase()
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

  const submitEditTaskForm = (data: FormValues) => {
    const { title, description } = data;
    const editedTask = {
      description,
      id: activeTask?.id!,
      subtasks: subtasks.map((subtask, index) => ({
        id: Math.random(),
        title: subtask.name,
        isCompleted: isComSubtasks ? isComSubtasks[index] : false,
      })),
      title,
    };
    dispatch(editTask({ task: editedTask, selectedStatus: status! }));
    dispatch(toogleEditTaskModal(false));
    reset();
  };
  console.log(subtasks);

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
          onSubmit={handleSubmit(submitEditTaskForm)}
          className="bg-white fixed md:absolute w-[25rem] md:w-[30rem] pt-[2rem] pb-[1rem] rounded-lg z-30 overflow-scroll px-[1.65rem] h-[43rem] md:h-[42rem] scale-90 md:scale-95"
        >
          <h1 className="font-[600] text-[1.25rem]">Edit Task</h1>
          <div className="flex flex-col gap-[0.7rem]">
            <div>
              <p className="text-[#828FA3] text-[1rem] font-[500] mt-[1.2rem] mb-[0.5rem]">
                Title
              </p>
              <input
                {...register("title")}
                name="title"
                type="text"
                placeholder="e.g. Take coffee break"
                className={`outline-none border-[2px] ${
                  errors.title || duplicateTaskState
                    ? "focus:border-[#ea5555] border-[#ea5555]"
                    : "focus:border-[#635FC7] border-[#00011241]"
                }  indent-4 h-[3rem] w-full rounded-md appearance-none text-[0.95rem]`}
                defaultValue={defaultTitle}
              />

              <p className="text-[#ea5555] font-[500] text-sm text-left pt-1">
                {errors.title?.message}
              </p>
              {duplicateTaskState && (
                <p className=" absolute text-[#ea5555] font-[500] text-sm text-left pt-1 right-[2.5rem] top-[7.7rem]">
                  Used
                </p>
              )}
            </div>
            <div>
              <p className="text-[#828FA3] text-[1rem] font-[500] mb-[0.5rem]">
                Description
              </p>
              <textarea
                {...register("description")}
                name="description"
                cols={30}
                rows={10}
                autoComplete="off"
                placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
                className={`outline-none border-[2px]  ${
                  errors.description
                    ? "focus:border-[#ea5555] border-[#ea5555]"
                    : "focus:border-[#635FC7] border-[#00011241]"
                } px-4 h-[7rem] pt-3 w-full rounded-md appearance-none text-[0.95rem] resize-none`}
                defaultValue={defaultDescription}
              />
              <p className="text-[#ea5555] font-[500] text-sm text-left pt-1">
                {errors.description?.message}
              </p>
            </div>
            <div>
              <p className="text-[#828FA3] text-[1rem] font-[500] mb-[0.5rem]">
                Subtasks
              </p>
              <div className="max-h-[8rem] overflow-scroll flex flex-col gap-[0.5rem]">
                {subtasks.map((subtask, index) => (
                  <div
                    key={subtask.id}
                    className="relative flex justify-between gap-[1rem] items-center"
                  >
                    <input
                      {...register(`subtasks.${index}.name`, {
                        shouldUnregister: true,
                      })}
                      type="text"
                      placeholder=""
                      className={`outline-none border-[2px] ${
                        errors.subtasks && errors.subtasks[index]
                          ? "focus:border-[#ea5555] border-[#ea5555]"
                          : "focus:border-[#635FC7] border-[#00011241]"
                      } indent-4 h-[3rem] w-full rounded-md appearance-none text-[0.95rem]`}
                      defaultValue={subtask.name}
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
                      <p className="absolute text-[#ea5555] bottom-[0.8rem] right-[3rem] text-sm text-left pt-1 font-[400] translate-y-[-1.5px]">
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
            className="bg-[#625fc72a] flex justify-center rounded-full py-[0.9rem] mt-[1rem] gap-[0.5rem] items-center cursor-pointer"
          >
            <img src={add} alt="addSvg" className="h-[0.65rem] w-[0.65rem]" />
            <p className="text-[#635FC7] font-semibold">Add New Subtask</p>
          </div>
          <div className="mt-[1.5rem]">
            <p className="text-[#828FA3] text-[1rem] font-[500] mb-[0.5rem]">
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
              <p className="text-white font-semibold">Save Changes</p>
            </button>
          </div>
        </form>
      </div>
      <div
        onClick={() => dispatch(toogleEditTaskModal(false))}
        className="fixed inset-0 bg-black z-20 opacity-50"
      ></div>
    </>
  );
};

export default EditTask;
