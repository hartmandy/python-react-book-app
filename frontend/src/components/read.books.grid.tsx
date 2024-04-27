import { useState, useEffect } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Book = {
  id: string;
  imageUrl: string;
  title: string;
  status: string;
  authorName: string;
  genre: string;
};

export default function ReadBooksGrid() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const fetchBooks = () => {
    fetch("http://127.0.0.1:5000/books")
      .then((response) => response.json())
      .then((data) => {
        const currentlyReadingBooks = data.books.filter(
          (book: Book) => book.status === "Read"
        );
        setBooks(currentlyReadingBooks);
      })
      .catch((error) => console.error("Error fetching books:", error));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleStatusChange = (newStatus: string) => {
    if (selectedBook) {
      fetch(`http://127.0.0.1:5000/update_book/${selectedBook.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })
        .then((response) => response.json())
        .then(() => {
          toast.success("Book updated successfully!");
          fetchBooks();
          setSelectedBook(null);
        })
        .catch((error) => {
          console.error("Error updating book:", error);
          toast.error("Failed to update book.");
        });
    }
  };

  const handleDelete = () => {
    if (selectedBook) {
      fetch(`http://127.0.0.1:5000/delete_book/${selectedBook.id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then(() => {
          toast.success("Book deleted successfully!");
          fetchBooks();
          setSelectedBook(null);
        })
        .catch((error) => {
          console.error("Error deleting book:", error);
          toast.error("Failed to delete book.");
        });
    }
  };

  const handleBookInteraction = (book: Book) => {
    setSelectedBook(book);
  };

  const handleModalClose = () => {
    setSelectedBook(null);
  };

  return (
    <div className="mt-8">
      <div className="grid grid-cols-3 gap-2 p-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="cursor-pointer"
            onClick={() => handleBookInteraction(book)}
            style={{ width: "50%" }}
          >
            <img
              src={book.imageUrl}
              alt={book.title}
              className="rounded-lg w-full h-auto"
            />
          </div>
        ))}
      </div>

      {selectedBook && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div
            className="bg-white p-5 rounded-lg max-w-4xl mx-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleModalClose}
              className="absolute top-3 right-3"
            >
              <Cross2Icon className="h-6 w-6 text-gray-700" />
            </button>
            <div className="flex gap-4 items-center">
              <img
                src={selectedBook.imageUrl}
                alt={selectedBook.title}
                className="w-48 h-48 rounded-lg object-cover"
              />
              <div className="max-w-lg">
                <div className="text-lg font-bold">{selectedBook.title}</div>
                <div>{selectedBook.authorName}</div>
                <div>{selectedBook.genre}</div>
                <div>
                  <label htmlFor="status" className="font-medium">
                    Status:
                  </label>
                  <select
                    id="status"
                    value={selectedBook.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="ml-2 rounded-md border-gray-300 shadow-sm"
                  >
                    <option value="Currently Reading">Currently Reading</option>
                    <option value="Read">Read</option>
                    <option value="To Read">To Read</option>
                  </select>
                </div>
                <button
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
