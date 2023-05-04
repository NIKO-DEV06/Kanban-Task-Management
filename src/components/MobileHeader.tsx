import logoLight from "../assets/logo-mobile.svg";
import dropDown from "../assets/icon-chevron-down.svg";
import add from "../assets/icon-add-task-mobile.svg";
import options from "../assets/icon-vertical-ellipsis.svg";

type Props = {};

const MobileHeader = ({}: Props) => {
  return (
    <header className="fixed flex justify-between items-center w-full h-[6rem] p-[1.5rem] md:hidden bg-white border-b border-[#E4EBFA]">
      <div className="flex gap-[1rem] items-center">
        <img src={logoLight} alt="logo" className="h-[1.6rem]" />
        <h1 className="text-[1.5rem] font-semibold">Platform Launch</h1>
        <img src={dropDown} alt="dropdown" className="h-[0.5rem]" />
      </div>
      <div className="flex gap-[1rem]">
        <button className="bg-[#635FC7] w-[3rem] h-[2rem] grid place-items-center rounded-[1rem]">
          <img src={add} alt="add svg" />
        </button>
        <div>
          <img src={options} alt="ellipsis" className="translate-y-[0.3rem]" />
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
