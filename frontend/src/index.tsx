import CurrentlyReadingSlider from "./components/currently.reading.slider";
import "react-toastify/dist/ReactToastify.css";
import ToReadBooksGrid from "./components/to.read.grid";

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center my-14">
        <div className="lg:grid lg:grid-cols-2 md:grid md:grid-cols-2 sm:flex sm:flex-col gap-4 mx-4 my-auto">
          <div>
            <h1 className="text-neutral-800 lg:text-8xl md:text-5xl sm:text-4xl">
              What are you reading now?
            </h1>
          </div>
          <div>
            <CurrentlyReadingSlider />
          </div>
        </div>

        <hr className="my-8 border-gray-300" />

        <div className="gap-4 mx-4 my-auto">
          <h2 className="text-neutral-800 lg:text-6xl md:text-3xl sm:text-2xl text-end">
            What's up next?
          </h2>
          <ToReadBooksGrid />
        </div>
      </div>
    </>
  );
}

export default App;
