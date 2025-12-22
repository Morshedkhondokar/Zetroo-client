import Countdown from "react-countdown";

const FlashSale = () => {
  return (
    // Main Section
    <section className="px-4 md:px-8 py-8 bg-white">
      {/* Title + Countdown - Exact design matching the image */}
      <div className="relative">
        {/* Background Line - Red line like in the image */}
        <div className="absolute inset-0 flex items-center">
          <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-red-500/80 to-transparent"></div>
        </div>
        
        {/* Main Content */}
        <div className="relative flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 pt-2">
          
          {/* Left Side - Title + Fire + Bottom Line */}
          <div className="flex items-center flex-grow relative z-10">
            {/* Fire Emoji + FLASH SALE (exact match to the image) */}
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-r-full shadow-sm border border-gray-100">
              <span className="text-2xl md:text-3xl">🔥</span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-wide text-[#db4444] uppercase whitespace-nowrap leading-tight">
                FLASH SALE
              </h2>
            </div>
            
            {/* Bottom Red Thick Line (like in the image) */}
            <div className="absolute bottom-[-8px] left-0 right-0 h-[4px] bg-gradient-to-r from-[#db4444] via-red-500 to-[#db4444] shadow-sm rounded-full hidden lg:block"></div>
          </div>

          {/* Right Side - Countdown Box (exact image styling) */}
          <div className="flex justify-end lg:justify-start relative z-10">
            <Countdown
              date={new Date("2025-12-30T23:59:59")}
              renderer={({ days, hours, minutes, seconds, completed }) => {
                if (completed) {
                  return (
                    <div className="bg-[#db4444] text-white py-3 px-8 rounded-full shadow-2xl font-black text-xl border-4 border-white flex items-center gap-2">
                      <span>🔥</span>
                      <span>Sale Ended</span>
                    </div>
                  );
                }
                
                // Exact image match - red gradient background, thick white border, rounded corners
                return (
                  <div className="relative bg-gradient-to-r from-[#ff6b6b] via-[#db4444] to-[#cc3333] text-white 
                                   py-3.5 px-6 md:px-8 shadow-2xl border-4 border-white/90 
                                   rounded-xl md:rounded-2xl flex items-center justify-center space-x-1 md:space-x-2 
                                   min-w-[260px] font-black text-xl md:text-2xl tracking-wider
                                   before:content-[''] before:absolute before:inset-0 before:bg-white/10 
                                   before:backdrop-blur-sm before:rounded-2xl hover:before:bg-white/20 
                                   transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl">
                    {/* Days */}
                    <p className="bg-white/20 flex flex-col backdrop-blur-sm px-2 py-1 rounded-lg min-w-[28px] text-center drop-shadow-lg">
                      {String(days).padStart(2, "0")}
                      <span className="text-xs">Day</span>
                    </p>
                    <span className="text-2xl md:text-3xl font-black text-white drop-shadow-md">:</span>
                    
                    {/* Hours */}
                    <p className="bg-white/20 flex flex-col backdrop-blur-sm px-2 py-1 rounded-lg min-w-[28px] text-center drop-shadow-lg">
                      {String(hours).padStart(2, "0")}
                      <span className="text-xs">Hours</span>
                    </p>
                    <span className="text-2xl md:text-3xl font-black text-white drop-shadow-md">:</span>
                    
                    {/* Minutes */}
                    <span className="bg-white/20 flex flex-col backdrop-blur-sm px-2 py-1 rounded-lg min-w-[28px] text-center drop-shadow-lg">
                      {String(minutes).padStart(2, "0")}
                      <span className="text-xs">Minutes</span>
                    </span>
                    <span className="text-2xl md:text-3xl font-black text-white drop-shadow-md">:</span>
                    
                    {/* Seconds */}
                    <span className="bg-white/20 flex flex-col backdrop-blur-sm px-2 py-1 rounded-lg min-w-[28px] text-center drop-shadow-lg animate-pulse">
                      {String(seconds).padStart(2, "0")}
                      <span className="text-xs">Seconds</span>
                    </span>
                  </div>
                );
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashSale;