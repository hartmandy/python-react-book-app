import ReadBooksGrid from "./components/read.books.grid";

export default function Bookshelf() {
  return (
    <div className="gap-4 mx-4 my-auto">
      <h2 className="text-neutral-800 lg:text-6xl md:text-3xl sm:text-xl text-end my-4">
        Bookshelf
      </h2>
      <ReadBooksGrid />
    </div>
  );
}
