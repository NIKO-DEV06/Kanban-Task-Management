import add from "../assets/icon-add-task-mobile.svg";

type Props = {};

const EmptyBoard = ({}: Props) => {
  return (
    <div className="flex flex-col justify-center align-middle items-center translate-y-[14rem] gap-[1.5rem]">
      <h1 className="text-center text-[1.5rem] mx-[1rem] font-semibold text-[#828FA3]">
        This board is empty. Create a new column to get started.
      </h1>
      <button className="bg-[#635FC7] flex justify-center items-center gap-[0.5rem] w-[13rem] h-[4rem] rounded-full">
        <div>
          <img src={add} alt="" />
        </div>
        <p className="text-white font-semibold text-[1.1rem]">Add New Column</p>
      </button>
    </div>
  );
};

export default EmptyBoard;
