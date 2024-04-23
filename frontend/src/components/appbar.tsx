import { Link } from "react-router-dom";
import book from "/book.svg";
import Add from "./add.book";
import { BookmarkFilledIcon, LayersIcon } from "@radix-ui/react-icons";

function AppBar() {
  return (
    <div className="flex items-center bg-neutral-800 p-4">
      <img src={book} alt="Logo" className="h-7 mr-8" />
      <Link to="/" className="mr-8 no-underline text-white">
        <BookmarkFilledIcon />
      </Link>
      <Link to="/bookshelf" className="no-underline text-white">
        <LayersIcon />
      </Link>
      <Add />
    </div>
  );
}

export default AppBar;
