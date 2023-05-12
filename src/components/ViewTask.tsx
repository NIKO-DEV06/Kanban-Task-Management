import { useSelector, useDispatch } from "react-redux";
import options from "../assets/icon-vertical-ellipsis.svg";
import drop from "../assets/icon-chevron-down.svg";
import { State } from "../interface/interfaces";
import { closeViewTaskModal } from "../store/ThemeSlice";

type Props = {};

const ViewTask = ({}: Props) => {
  const dispatch = useDispatch();
  const boardState = useSelector((state: State) => state.board.boards);
  const activeBoardIndex = useSelector(
    (state: State) => state.board.activeBoardIndex
  );
  const activeTask = useSelector((state: State) => state.board.activeTask);

  return (
    <>
      <div className="fixed z-30 flex justify-center w-screen h-screen mx-auto translate-x-[-1.5rem] translate-y-[-1rem]">
        <div className="bg-white fixed w-[25rem] pt-[2rem] pb-[2.5rem] rounded-lg">
          <div className="flex justify-between mx-[1.5rem] items-center gap-[1rem]">
            <h2 className="font-bold text-[1.2rem]">{activeTask?.title}</h2>
            <img src={options} alt="ellipse" className="h-[1.5rem]" />
          </div>
          <p className="mx-[1.5rem] my-[1.5rem] text-[#828FA3]">
            {activeTask?.description.trim() === ""
              ? "No Description;)"
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
                className="flex items-center px-[1rem] py-[0.5rem] mx-[1.5rem] gap-[1rem] bg-[#828fa332] rounded-lg mb-[1rem]"
              >
                <input
                  defaultChecked={subtask.isCompleted}
                  type="checkbox"
                  className="peer checked:bg-[#635FC7] appearance-none min-w-[1.2rem] h-[1.2rem] bg-white border-[1.5px] border-[#828fa351] rounded-sm relative after:content-[''] after:w-full after:h-full after:absolute after:left-0 after:top-0 after:bg-no-repeat after:bg-center after:bg-[length:12px] after:bg-[url('.././src/assets/icon-check.svg')] after:opacity-0 after:checked:opacity-100"
                />
                <span className="pr-[3rem] font-semibold peer-checked:line-through peer-checked:text-[#00011278] text-[0.95rem]">
                  {subtask.title}
                </span>
              </p>
            ))}
          </div>

          <p className="font-semibold text-[#828FA3] ml-[1.5rem] mt-[1.1rem]">
            Current Status
          </p>
          <div className="relative">
            <select
              id="dropdown"
              name="services"
              defaultValue={boardState[activeBoardIndex].columns[0].name}
              className="appearance-none bg-white flex items-center border-2 mx-[1.5rem] w-[22rem] border-[#828fa351] text-[1.1rem] rounded-sm mt-[0.7rem] px-[1rem] py-[0.7rem]"
            >
              {boardState[activeBoardIndex].columns.map((column) => (
                <option key={column.name} value={column.name}>
                  {column.name}
                </option>
              ))}
            </select>
            <img
              src={drop}
              alt="down"
              className="w-[1rem] absolute right-[11%] top-[45%]"
            />
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
