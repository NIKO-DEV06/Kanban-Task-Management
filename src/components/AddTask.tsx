import { useSelector } from "react-redux";
import { RootThemeState } from "../interface/interfaces";
import xSvg from "../assets/icon-cross.svg";
import add from "../assets/purple-add.svg";

type Props = {};

const AddTask = ({}: Props) => {
  const sidebarState = useSelector(
    (state: RootThemeState) => state.theme.sidebar
  );
  return (
    <>
      <div
        className={`fixed md:absolute z-30 w-screen flex justify-center  ${
          sidebarState
            ? "md:translate-x-[-20rem] translate-x-[-1.5rem]"
            : "translate-x-[-1.5rem]"
        }`}
      >
        <div className="bg-white fixed md:absolute w-[25rem] md:w-[30rem] pt-[2rem] pb-[1rem] rounded-lg z-30 overflow-scroll px-[1.65rem]">
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
              />
            </div>
            <div>
              <p className="text-[#828FA3] text-[1.1rem] font-[500] mb-[0.5rem]">
                Description
              </p>
              <textarea
                name="message"
                cols={30}
                rows={10}
                autoComplete="off"
                placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
                className="outline-none border-[2px] border-[#00011241] focus:border-[#635FC7] px-4 h-[7rem] pt-3 w-full rounded-md appearance-none text-[0.95rem] resize-none"
              />
            </div>
            <div>
              <p className="text-[#828FA3] text-[1.1rem] font-[500] mb-[0.5rem]">
                Subtasks
              </p>
              <div>
                <div className="flex justify-between gap-[1rem] items-center">
                  <input
                    type="text"
                    placeholder=""
                    className="outline-none border-[2px] border-[#00011241] focus:border-[#635FC7] indent-4 h-[3rem] w-full rounded-md appearance-none text-[0.95rem]"
                  />
                  <img
                    src={xSvg}
                    alt=""
                    className="w-[1.5rem] h-[1.5rem] cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#625fc72a] flex justify-center rounded-full py-[0.9rem] mt-[1rem] gap-[0.5rem]">
            <img src={add} alt="addSvg" />
            <p className="text-[#635FC7] font-semibold">Add New Subtask</p>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 bg-black z-20 opacity-50"></div>
    </>
  );
};

export default AddTask;
