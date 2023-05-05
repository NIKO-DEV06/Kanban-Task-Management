import EmptyBoard from "./EmptyBoard";
// import KanbanBoard from "./KanbanBoard";

type Props = {};

const Board = ({}: Props) => {
  return (
    <div className="pt-[8rem] h-screen overflow-x-scroll">
      {/* <KanbanBoard /> */}
      <EmptyBoard />
    </div>
  );
};

export default Board;
