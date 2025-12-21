

const NewArrivals = () => {
  return (
    <section className="container mx-auto py-12 px-4 md:p-4 lg:mb-14">
      {/* 🔴 Featured Label */}
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-5 h-10 bg-[#db4444] rounded-sm"></div>
        <p className="text-[#db4444] font-semibold">Featured</p>
      </div>

      {/* <h2> Heading */}
      <h2 className="text-4xl font-bold mb-10">New Arrival</h2>

      {/* 🖼️ Grid Layout (Main Content) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
        {/* === LEFT SIDE: Large Card (PlayStation 5) === */}
        <div className="relative overflow-hidden rounded-md">
          {/* Image */}
          <img
            src="https://i.pinimg.com/1200x/91/6a/4b/916a4bd57e9411f167c2c42526ff262f.jpg"
            alt="PlayStation 5 Black and White"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />

          {/* Text Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-8 flex flex-col justify-end text-white">
            <h3 className="text-3xl font-bold mb-3">PlayStation 5</h3>
            <p className="text-sm mb-4">
              The ultimate gaming experience is here with the newest console
              release.
            </p>
            <a
              href="#"
              className="w-fit border-b border-white pb-1 font-medium hover:text-[#db4444] hover:border-[#db4444] transition"
            >
              Shop Now
            </a>
          </div>
        </div>

        {/* === RIGHT SIDE: Two-Row Grid === */}
        <div className="grid grid-cols-1 gap-4">
          {/* Top Row: Watch Collection */}
          <div className="relative overflow-hidden rounded-md">
            {/* Image  */}
            <img
              src="https://i.pinimg.com/736x/11/eb/d3/11ebd3cbe253c6b44b9d7ddee4eadb4e.jpg"
              alt="Watch Collection" // alt text
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />

            {/* Text Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-8 flex flex-col justify-end text-white">
              <h3 className="text-3xl font-bold mb-3">Watch Collection</h3>
              <p className="text-sm mb-4 max-w-xs">
                The latest and most premium collection of smartwatches and
                chronographs.
              </p>
              <a
                href="#"
                className="w-fit border-b border-white pb-1 font-medium hover:text-[#db4444] hover:border-[#db4444] transition"
              >
                Shop Now
              </a>
            </div>
          </div>

          {/* Bottom Row: 2-Column Grid (Speakers & Perfume) */}
          <div className="grid grid-cols-2 gap-4">
            {/* Bottom Left: Speakers */}
            <div className="relative overflow-hidden rounded-md">
              {/* Image */}
              <img
                src="https://i.pinimg.com/1200x/61/0d/b8/610db82d3203285461634701ff18e18d.jpg"
                alt="Speakers"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />

              {/* Text Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-5 flex flex-col justify-end text-white">
                <h3 className="text-xl font-bold mb-2">Speakers</h3>
                <p className="text-xs mb-3">Amazon wireless speakers</p>
                <a
                  href="#"
                  className="w-fit border-b border-white pb-1 font-medium text-xs hover:text-[#db4444] hover:border-[#db4444] transition"
                >
                  Shop Now
                </a>
              </div>
            </div>

            {/* Bottom Right: Perfume */}
            <div className="relative overflow-hidden rounded-md">
              {/* Image */}
              <img
                src="https://i.pinimg.com/1200x/8f/e5/7e/8fe57eb929e1261d2af6f7848ce82eb5.jpg"
                alt="Perfume"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />

              {/* Text Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-5 flex flex-col justify-end text-white">
                <h3 className="text-xl font-bold mb-2">Perfume</h3>
                <p className="text-xs mb-3">GUCCI INTENSE OUD EDP</p>
                <a
                  href="#"
                  className="w-fit border-b border-white pb-1 font-medium text-xs hover:text-[#db4444] hover:border-[#db4444] transition"
                >
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
