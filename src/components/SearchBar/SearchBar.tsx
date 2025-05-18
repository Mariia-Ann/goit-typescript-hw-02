import style from "./SearchBar.module.css";
import { IoIosSearch } from "react-icons/io";
import { toast } from "react-hot-toast";
import { Image } from "../../types";
import { FormEvent } from "react";

interface SearchBarProps {
  onSubmit: (topic: string) => void
}

const SearchBar:React.FC<SearchBarProps> = ({ onSubmit }) => {
  const handleSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const input = form.elements.namedItem("topic") as HTMLInputElement | null;
    const topic = input?.value.trim();

    if (!topic) {
      toast.error("Please enter search term!");
      return;
    }

    onSubmit(topic);
    form.reset();
  };

  return (
    <header className={style.header}>
      <form className={style.form} onSubmit={handleSubmit}>
        <button className={style.button} type="submit">
          <IoIosSearch className={style.icon} />
        </button>
        <input
          className={style.input}
          type="text"
          name="topic"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default SearchBar;
