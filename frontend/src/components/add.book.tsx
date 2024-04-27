import { useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import { ToastContainer, toast } from "react-toastify";

export default function Add() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [genre, setGenre] = useState("");
  const [status, setStatus] = useState("Currently Reading");

  const clearForm = () => {
    setTitle("");
    setAuthorName("");
    setImageUrl("");
    setGenre("");
    setStatus("Currently Reading");
  };

  const closeModal = () => {
    clearForm();
    setModalIsOpen(false);
  };

  const handleOverlayClick = (_event: any) => {
    closeModal();
  };

  const handleModalContentClick = (event: any) => {
    event.stopPropagation();
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const bookData = {
      title,
      authorName,
      imageUrl,
      genre,
      status,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/create_book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });
      const responseData = await response.json();
      if (response.ok) {
        toast.success(responseData.message);
        setModalIsOpen(false);
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error("Error submitting book:", error);
      toast.error("Failed to submit book.");
    }
  };

  return (
    <>
      <div className="text-white ml-8 z-10">
        <button onClick={() => setModalIsOpen(true)}>
          <PlusIcon />
        </button>
        {modalIsOpen && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
            onClick={handleOverlayClick}
          >
            <div
              className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
              onClick={handleModalContentClick}
            >
              <div className="mt-3 text-center">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Add New Book
                </h3>
                <form className="mt-2" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Title"
                    className="mt-2 p-2 w-full border rounded-md text-neutral-800"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Author Name"
                    className="mt-2 p-2 w-full border rounded-md text-neutral-800"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Image URL"
                    className="mt-2 p-2 w-full border rounded-md text-neutral-800"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Genre"
                    className="mt-2 p-2 w-full border rounded-md text-neutral-800"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    required
                  />
                  <select
                    className="mt-2 p-2 w-full border rounded-md text-neutral-800"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Read">Read</option>
                    <option value="To Read">To Read</option>
                    <option value="Currently Reading">Currently Reading</option>
                  </select>
                  <div className="items-center px-4 py-3">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                    >
                      Add Book
                    </button>
                    <button
                      type="button"
                      className="mt-3 px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={1}
      />
    </>
  );
}
