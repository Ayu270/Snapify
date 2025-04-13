"use client";

import { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

export default function Photos({ imageList }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!imageList || imageList.length === 0) {
    return <></>;
  }

  const handleSwipe = (direction) => {
    if (direction === "left") {
      setSelectedIndex((prev) => (prev + 1) % imageList.length);
    } else if (direction === "right") {
      setSelectedIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
  });

  const openZoomPopup = () => {
    if (!isMobile) {
      setZoomed(true);
    }
  };

  const closeZoomPopup = () => {
    setZoomed(false);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    let x = ((e.clientX - left) / width) * 100;
    let y = ((e.clientY - top) / height) * 100;

    x = Math.max(0, Math.min(100, x));
    y = Math.max(0, Math.min(100, y));

    setZoomPosition({ x, y });
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <div {...handlers} className="flex justify-center w-full overflow-hidden">
        <img
          className="object-cover h-[320px] md:h-[430px] cursor-pointer"
          src={imageList[selectedIndex]}
          alt="Selected"
          onClick={openZoomPopup}
        />
      </div>
      <div className="flex flex-wrap justify-center items-center gap-3">
        {imageList.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`w-[80px] border rounded p-2 cursor-pointer ${selectedIndex === index ? "border-black" : ""}`}
          >
            <img className="object-cover" src={item} alt="Thumbnail" />
          </div>
        ))}
      </div>
      {zoomed && !isMobile && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative flex bg-transparent p-6 max-w-[95vw] w-full gap-6">
            <button
              className="absolute top-3 right-3 text-4xl cursor-pointer text-white z-10"
              onClick={closeZoomPopup}
            >
              ✕
            </button>
            <div
              className="w-1/2 flex justify-center items-center cursor-pointer"
              onMouseMove={handleMouseMove}
              onClick={handleSwipe.bind(null, "left")}
            >
              <img
                className="object-contain w-full h-[90vh]"
                src={imageList[selectedIndex]}
                alt="Original"
              />
            </div>
            <div className="w-1/2 overflow-hidden relative">
              <div
                className="absolute inset-0 bg-no-repeat bg-cover w-full h-[90vh]"
                style={{
                  backgroundImage: `url(${imageList[selectedIndex]})`,
                  backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  backgroundSize: "200%",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}