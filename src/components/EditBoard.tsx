import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootThemeState, State } from "../interface/interfaces";
import xSvg from "../assets/icon-cross.svg";
import add from "../assets/purple-add.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { editBoard } from "../store/BoardSlice";
import { toogleEditBoardModal } from "../store/UiSlice";

type Column = {
  id: number;
  name: string;
};
type FormValues = {
  boardName: string;
  boardCols: Column[];
};

const EditBoard = () => {
  const dispatch = useDispatch();
  const sidebarState = useSelector((state: RootThemeState) => state.ui.sidebar);
  const boardState = useSelector((state: State) => state.board.boards);
  const activeBoardIndex = useSelector(
    (state: State) => state.board.activeBoardIndex
  );

  const defaultBoardName = boardState[activeBoardIndex].name;
  const [columns, setColumns] = useState<Column[]>(
    boardState[activeBoardIndex].columns.map((col) => {
      return {
        id: col.id,
        name: col.name,
        task: col.tasks,
      };
    })
  );

  const [duplicateBoardName, setDuplicateBoardName] = useState(false);

  const addColumn = () => {
    const newColumn: Column = {
      id: Date.now(),
      name: "",
    };
    setColumns([...columns, newColumn]);
  };

  const removeColumn = (index: number) => {
    const updatedColumns = columns
      .filter((_, idx) => idx !== index)
      .map((column, idx) => ({ ...column, id: idx }));
    setColumns(updatedColumns);
  };

  const handleChangeColumn = (index: number, value: string) => {
    const updatedColumns = [...columns];
    updatedColumns[index].name = value;
    setColumns(updatedColumns);
  };

  const schema = yup
    .object()
    .shape({
      boardName: yup.string().trim().required("Board Name field is required"),
      boardCols: yup.array().of(
        yup.object().shape({
          name: yup.string().trim().required("Can't be empty"),
        })
      ),
    })
    .test(
      "duplicate-board",
      "Board with the same name already exists",
      function (values) {
        const allBoardNames = boardState.map((board) =>
          board.name.toLocaleLowerCase()
        );
        const duplicateBoardName =
          allBoardNames.includes(values.boardName.toLocaleLowerCase()) &&
          values.boardName.toLowerCase() !== defaultBoardName.toLowerCase();
        setDuplicateBoardName(duplicateBoardName);
        return !duplicateBoardName;
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

  const editBoardhandler = (data: FormValues) => {
    const { boardName } = data;
    const editedBoard = {
      id: boardState[activeBoardIndex].id,
      name: boardName,
      columns: columns.map((bCol) => ({
        id: bCol.id,
        name: bCol.name,
        // @ts-ignore
        tasks: bCol.task,
      })),
    };
    dispatch(editBoard(editedBoard));
    console.log(editedBoard);
    dispatch(toogleEditBoardModal(false));
    setColumns([{ id: 0, name: "" }]);
    reset();
  };
  return (
    <>
      <div
        className={`fixed md:absolute w-screen flex justify-center z-30 pointer-events-none  ${
          sidebarState
            ? "md:translate-x-[-20rem] translate-x-[-1.5rem]"
            : "translate-x-[-1.5rem]"
        }`}
      >
        <form
          onSubmit={handleSubmit(editBoardhandler)}
          className="bg-white dark:bg-[#2B2C37] dark:text-white w-[24rem] md:w-[32rem] rounded-lg p-[2rem] z-30 overflow-scroll pointer-events-auto"
        >
          <h1 className="font-[600] text-[1.2rem]">Edit Board</h1>
          <div className="relative">
            <p className="text-[#828FA3] dark:text-white text-[0.9rem] font-[500] mt-[1rem] mb-[0.5rem]">
              Board Name
            </p>

            <input
              {...register("boardName")}
              name="boardName"
              placeholder="e.g. Web Design"
              className={` outline-none border-[2px] dark:bg-[#2B2C37] indent-4 h-[3rem] w-full rounded-md appearance-none text-[0.95rem]  ${
                errors.boardName || duplicateBoardName
                  ? "focus:border-[#ea5555] border-[#ea5555]"
                  : "focus:border-[#635FC7] border-[#00011241] dark:border-[#3E3F4E]"
              }`}
              type="text"
              defaultValue={defaultBoardName}
            />
            <p className="text-[#ea5555] font-[500] text-sm text-left pt-1">
              {errors.boardName?.message}
            </p>
            {duplicateBoardName && (
              <p className=" absolute text-[#ea5555] font-[500] text-sm text-left pt-1 right-[1rem] top-[2.5rem]">
                Used
              </p>
            )}
          </div>
          <div>
            <p className="text-[#828FA3] dark:text-white text-[0.9rem] font-[500] mt-[1.2rem] mb-[0.5rem]">
              Board Columns
            </p>
            <div className="flex flex-col gap-[0.5rem] max-h-[5rem] overflow-scroll">
              {columns.map((column, index) => (
                <div
                  key={column.id}
                  className="relative flex justify-between gap-[1rem] items-center"
                >
                  <input
                    {...register(`boardCols.${index}.name`, {
                      shouldUnregister: true,
                    })}
                    type="text"
                    placeholder=""
                    className={`outline-none border-[2px] dark:bg-[#2B2C37] indent-4 h-[3rem] w-full rounded-md appearance-none text-[0.95rem] ${
                      errors.boardCols && errors.boardCols[index]
                        ? "focus:border-[#ea5555] border-[#ea5555]"
                        : "focus:border-[#635FC7] border-[#00011241] dark:border-[#3E3F4E]"
                    }`}
                    value={columns[index].name}
                    onChange={(e) => handleChangeColumn(index, e.target.value)}
                  />
                  {columns.length > 1 && (
                    <img
                      onClick={() => removeColumn(index)}
                      src={xSvg}
                      alt=""
                      className="w-[1.3rem] h-[1.3rem] cursor-pointer"
                    />
                  )}
                  {errors.boardCols && errors.boardCols[index] && (
                    <p
                      className={`absolute text-[#ea5555] text-sm text-left pt-1 font-[400] translate-y-[-1.5px] ${
                        columns.length > 1 ? "right-[3rem]" : "right-[1rem]"
                      }`}
                    >
                      {errors.boardCols[index]?.name?.message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div
            onClick={addColumn}
            className="bg-[#625fc72a] dark:bg-white flex justify-center rounded-full py-[0.9rem] mt-[1rem] gap-[0.5rem] items-center cursor-pointer"
          >
            <img src={add} alt="addSvg" className="h-[0.65rem] w-[0.65rem]" />
            <p className="text-[#635FC7] font-semibold">Add New Column</p>
          </div>
          <button className="bg-[#635FC7] flex justify-center rounded-full py-[0.9rem] mt-[1rem] gap-[0.5rem] items-center w-full">
            <p className="text-white font-semibold">Save Changes</p>
          </button>
        </form>
      </div>
      <div
        onClick={() => dispatch(toogleEditBoardModal(false))}
        className="fixed inset-0 bg-black z-20 opacity-50"
      ></div>
    </>
  );
};

export default EditBoard;
