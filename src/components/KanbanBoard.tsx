import { useSelector } from "react-redux";
import { RootThemeState } from "../interface/interfaces";

type Props = {};

const KanbanBoard = ({}: Props) => {
  const sidebarState = useSelector(
    (state: RootThemeState) => state.theme.sidebar
  );

  return (
    <div
      className={` ${
        sidebarState ? "pl-[3rem] md:pl-[20.5rem]" : "md:pl-[3rem]"
      }`}
    >
      <div>Kanban Board</div>
    </div>
  );
};

export default KanbanBoard;
