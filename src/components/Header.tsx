import logoLight from "../assets/logo-mobile.svg";

import add from "../assets/icon-add-task-mobile.svg";
import options from "../assets/icon-vertical-ellipsis.svg";

type Props = {};

const Header = ({}: Props) => {
  return (
    <>
      <header className="fixed md:flex justify-between items-center w-full h-[6rem] p-[1.5rem] hidden bg-white border-b border-[#E4EBFA] px-[3rem] z-20">
        <hr className="border-[0.5px] border-[#E4EBFA] absolute h-full translate-x-[15.95rem]" />

        <div className="flex gap-[1rem] items-center w-[19rem] cursor-pointer">
          <img src={logoLight} alt="logo" className="h-[1.6rem]" />
          <h1 className="text-[2rem] font-bold">Kanban</h1>
        </div>

        <h1 className="absolute left-[20.5rem] text-[1.5rem] font-semibold grid place-items-center tracking-wide">
          Platform Launch
        </h1>
        <div className="flex gap-[1.5rem]">
          <button className="bg-[#635FC7] hover:bg-[#A8A4FF] duration-200 flex justify-center items-center gap-[0.5rem] w-[10rem] h-[3rem] rounded-full">
            <div>
              <img src={add} alt="" />
            </div>
            <p className="text-white font-semibold">Add New Task</p>
          </button>
          <div className="grid place-items-center cursor-pointer">
            <img src={options} alt="ellipsis" />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
