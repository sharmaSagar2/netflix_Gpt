const VideoTitle = ({ overview, title }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start p-6 md:p-24 text-white bg-gradient-to-r from-black via-transparent to-transparent">
      <h1 className="py-2 text-2xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-1/4">{overview}</p>
      <div className="my-4 md:m-0">
        <button className="bg-white text-black py-1 md:py-3 px-3 md:px-12 text-xl rounded-lg hover:bg-opacity-80">
          ▶️ Play
        </button>
        <button className="hidden md:inline-block mx-2 bg-gray-500 text-white p-3 px-12 text-xl bg-opacity-50 rounded-lg">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
