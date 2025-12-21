import Countdown from "react-countdown";

const FlashSale = () => {
  return (
    <section className="px-6 pt-5 rounded-lg">
      {/* Top label*/}
      <div className="hidden md:flex items-center gap-2 mb-4  ">
        <span className="w-3 h-6 bg-red-500 rounded "></span>
        <p className="text-red-500 font-medium text-sm">Today’s</p>
      </div> 

      {/* Title and countdown */}
      <div className="flex flex-col md:flex-row md:justify-between items-center gap-6 border-b md:border-none">
        <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
          ⚡ Flash Sales
        </h2>

        <Countdown
          date={new Date("2025-12-30T23:59:59")}
          renderer={({ days, hours, minutes, seconds, completed }) => {
            if (completed) {
              return <span className="text-xl font-semibold text-gray-500">Sale Ended 🔥</span>;
            }

            return (
              <div className="flex items-center gap-4 text-center font-semibold text-gray-700">
                <div>
                  <span className="block text-sm mb-1">Days</span>
                  <span className="block text-2xl md:text-3xl">{String(days).padStart(2, "0")}</span>
                </div>
                <span className="text-2xl md:text-3xl">:</span>
                <div>
                  <span className="block text-sm mb-1">Hours</span>
                  <span className="block text-2xl md:text-3xl">{String(hours).padStart(2, "0")}</span>
                </div>
                <span className="text-2xl md:text-3xl">:</span>
                <div>
                  <span className="block text-sm mb-1">Minutes</span>
                  <span className="block text-2xl md:text-3xl">{String(minutes).padStart(2, "0")}</span>
                </div>
                <span className="text-2xl md:text-3xl">:</span>
                <div>
                  <span className="block text-sm mb-1">Seconds</span>
                  <span className="block text-2xl md:text-3xl">{String(seconds).padStart(2, "0")}</span>
                </div>
              </div>
            );
          }}
        />
      </div>
    </section>
  );
};

export default FlashSale;
