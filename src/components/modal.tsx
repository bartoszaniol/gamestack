import { FormEvent, useState } from "react";
import { api } from "~/utils/api";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface ModalProps {
  onCancel: () => void;
}

const schema = z.object({
  title: z.string().min(1, { message: "Required" }),
  platform: z.string(),
  url: z.union([z.literal(""), z.string().trim().url()]),
});

const Modal = (props: ModalProps) => {
  const { mutate: addGame } = api.game.addGame.useMutation();
  const { data: platforms } = api.game.getPlatforms.useQuery();
  const [URL, setURL] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const addGameHandler = (
    data: FieldValues
    // e: FormEvent
  ) => {
    // e.preventDefault();
    const platformId = platforms?.filter(
      (platform) => platform.name === data.platform
    );

    if (!platformId || !platformId[0]) return;

    addGame({
      image: data.url,
      title: data.title,
      platformId: platformId[0].id,
    });
    props.onCancel();
  };

  return (
    <form
      className="absolute left-1/2 top-[40%] z-10 -ml-[25%] -mt-[15%] flex h-3/4 w-1/2 flex-col rounded-md bg-slate-900 p-2 text-white"
      onSubmit={handleSubmit((data) => {
        addGameHandler(data);
      })}
    >
      <p className="p-4 text-center text-3xl">Add your game</p>
      <label htmlFor="title" className="p-4 text-center text-2xl">
        Title
      </label>
      <input
        {...register("title")}
        type="text"
        id="title"
        className="h-7 w-3/4 self-center bg-slate-500 pl-1 text-xl font-bold text-white"
        placeholder="Title"
      />
      {errors.title?.message && <p>{errors?.title?.message as String}</p>}
      <label htmlFor="platform" className="p-4 text-center text-2xl">
        Choose a platform
      </label>
      <select
        {...register("platform")}
        name="platform"
        id="platform"
        className="w-3/4 self-center bg-slate-500 text-white"
      >
        <option value="pc">PC</option>
        <option value="xbox">X-box</option>
        <option value="ps">PlayStation</option>
        <option value="switch">Nintendo Switch</option>
      </select>
      <label htmlFor="url" className="p-4 text-center text-2xl">
        Url
      </label>
      <input
        {...register("url")}
        type="text"
        id="url"
        className="h-7 w-3/4 self-center bg-slate-500 pl-1 text-xl font-bold text-white"
        placeholder="Address URL"
        onChange={(e) => {
          setURL(e.target.value);
        }}
      />
      <p className="mt-2 text-center text-2xl">Game cover</p>
      <img
        src={URL}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src =
            "https://www.grouphealth.ca/wp-content/uploads/2018/05/placeholder-image.png";
        }}
        alt="Game's cover"
        className="mt-4 h-40 w-40 self-center bg-slate-300"
      />
      <div className="mt-auto flex justify-between p-4">
        <button
          className="w-32 rounded-md  border-4 p-2 text-white"
          type="submit"
        >
          Add
        </button>
        <button
          className="w-32 rounded-md border-4 p-2 text-white"
          onClick={() => {
            props.onCancel();
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Modal;
