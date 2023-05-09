import { useSelector, useDispatch } from "react-redux";
import { RootThemeState, State } from "../interface/interfaces";

type Props = {};

const KanbanBoard = ({}: Props) => {
  const sidebarState = useSelector(
    (state: RootThemeState) => state.theme.sidebar
  );
  const boardState = useSelector((state: State) => state.board);
  console.log(boardState);

  return (
    <div
      className={` ${
        sidebarState
          ? "pl-[1.5rem] md:pl-[20.5rem]"
          : "pl-[1.5rem] md:pl-[3rem]"
      } overflow-visible`}
    >
      <div className="flex gap-[2rem]">
        <div>
          <div className="flex items-center gap-[0.7rem]">
            <div className="w-[1rem] h-[1rem] rounded-full bg-[#49C4E5]"></div>
            <h1 className="text-[#828FA3] tracking-[0.2em] uppercase font-medium">
              Todo (4)
            </h1>
          </div>
          <div className="bg-white px-[1.7rem] py-[1.5rem] w-[20rem] flex flex-col gap-[0.3rem] mt-[1rem] rounded-lg shadow-input-shadow">
            <p className="font-semibold text-[1.2rem]">
              Build UI for onboarding flow
            </p>
            <p className="text-[#828FA3] font-medium">0 of 3 substasks</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
