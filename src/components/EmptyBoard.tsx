import add from "../assets/icon-add-task-mobile.svg";
import { useSelector } from "react-redux";
import { RootThemeState } from "../interface/interfaces";

type Props = {};

const EmptyBoard = ({}: Props) => {
  const sidebarState = useSelector((state: RootThemeState) => state.ui.sidebar);

  return (
    <div
      className={`flex flex-col justify-center items-center translate-y-[14rem] gap-[1.5rem] ${
        sidebarState ? "md:pl-[20rem] lg:pl-[25rem] xl:pl-[30rem]" : ""
      }`}
    >
      <h1 className="text-center text-[1.5rem] mx-[1rem] md:ml-[3rem] font-semibold text-[#828FA3]">
        This board is empty. Create a new column to get started.
      </h1>
      <button className="bg-[#635FC7] hover:bg-[#A8A4FF] duration-200 flex justify-center items-center gap-[0.5rem] w-[13rem] h-[4rem] rounded-full">
        <div>
          <img src={add} alt="" />
        </div>
        <p className="text-white font-semibold text-[1.1rem]">Add New Column</p>
      </button>
    </div>
  );
};

export default EmptyBoard;
