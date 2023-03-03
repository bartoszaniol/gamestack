import { api } from "~/utils/api";

interface ModalProps {
  onCancel: () => void;
}

const Modal: React.FC<ModalProps> = ({ onCancel }) => {
  const addGamee = api.game.addGame.useMutation({
    onSuccess: async ({}) => {},
  });
  const { mutate: addGame, isLoading, error } = api.game.addGame.useMutation();

  return (
    <form
      className="absolute left-1/2 top-1/2 z-10 -ml-[25%] -mt-[15%] flex h-3/5 w-1/2 flex-col rounded-md bg-black p-2 text-white"
      onSubmit={(e) => {
        e.preventDefault();
        addGame({ image: "", title: "", platformId: "" });
      }}
    >
      <p className="p-4 text-center text-3xl">Add your game</p>
      <label htmlFor="name" className="p-4 text-center text-2xl">
        Name
      </label>
      <input
        type="text"
        id="name"
        className="h-7 w-3/4 self-center bg-red-400 pl-1 text-xl font-bold text-black"
        placeholder="Name"
      />
      <label htmlFor="platform" className="p-4 text-center text-2xl">
        Choose a platform
      </label>
      <select
        name="platform"
        id="platform"
        className="w-3/4 self-center text-black"
      >
        <option value="pc">PC</option>
        <option value="xbox">X-box</option>
        <option value="ps">PlayStation</option>
        <option value="switch">Nintendo Switch</option>
      </select>
      <p className="text-center text-2xl">Game cover</p>
      <div className="mt-4 h-40 w-40 self-center bg-red-400" />
      <h1 className="text-center">
        Want different game cover? <span className="cursor-pointer">Click</span>
      </h1>
      <div className="flex flex-1 justify-between p-4">
        <button
          className="w-32 rounded-md border-4  p-2 text-white"
          type="submit"
        >
          Add
        </button>
        <button
          className="w-32 rounded-md border-4  p-2 text-white"
          onClick={() => {
            onCancel();
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Modal;
