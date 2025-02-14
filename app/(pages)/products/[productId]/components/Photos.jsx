// "use client";

// import { useState } from "react";

// export default function Photos({ imageList }) {
//   const [selectedImage, setSelectedImage] = useState(imageList[0]);
//   if (imageList?.length === 0) {
//     return <></>;
//   }

//   return (
//     <div className="flex flex-col gap-3 w-full">
//       <div className="flex justify-center w-full">
//         <img
//           className="object-cover h-[350px] md:h-[430px]"
//           src={selectedImage}
//         />
//       </div>
//       <div className="flex flex-wrap justify-center items-center gap-3">
//         {imageList?.map((item) => {
//           return (
//             <div
//               onClick={() => {
//                 setSelectedImage(item);
//               }}
//               className="w-[80px] border rounded p-2"
//             >
//               <img className="object-cover" src={item} alt="" />
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useState, useEffect } from "react";
// import { useSwipeable } from "react-swipeable";

// export default function Photos({ imageList }) {
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [zoomed, setZoomed] = useState(false);
//   const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   if (!imageList || imageList.length === 0) {
//     return <></>;
//   }

//   const handleSwipe = (direction) => {
//     if (direction === "left") {
//       setSelectedIndex((prev) => (prev + 1) % imageList.length);
//     } else if (direction === "right") {
//       setSelectedIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
//     }
//   };

//   const handlers = useSwipeable({
//     onSwipedLeft: () => handleSwipe("left"),
//     onSwipedRight: () => handleSwipe("right"),
//   });

//   const openZoomPopup = () => {
//     if (!isMobile) {
//       setZoomed(true);
//     }
//   };

//   const closeZoomPopup = () => {
//     setZoomed(false);
//   };

//   const handleMouseMove = (e) => {
//     const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
//     const x = ((e.clientX - left) / width) * 100;
//     const y = ((e.clientY - top) / height) * 100;
//     setZoomPosition({ x, y });
//   };

//   return (
//     <div className="flex flex-col gap-3 w-full">
//       <div {...handlers} className="flex justify-center w-full overflow-hidden">
//         <img
//           className="object-cover h-[350px] md:h-[430px] cursor-pointer"
//           src={imageList[selectedIndex]}
//           alt="Selected"
//           onClick={() => openZoomPopup()}
//         />
//       </div>
//       <div className="flex flex-wrap justify-center items-center gap-3">
//         {imageList.map((item, index) => (
//           <div
//             key={index}
//             onClick={() => setSelectedIndex(index)}
//             className={`w-[80px] border rounded p-2 cursor-pointer ${selectedIndex === index ? "border-black" : ""}`}
//           >
//             <img className="object-cover" src={item} alt="Thumbnail" />
//           </div>
//         ))}
//       </div>
//       {zoomed && !isMobile && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
//           <div className="relative flex p-8 w-[95vw] h-[95vh] gap-3">
//             <button
//               className="absolute top-2 right-2 text-white text-3xl cursor-pointer bg-transparent border-none"
//               onClick={closeZoomPopup}
//             >
//               ✕
//             </button>
//             <div className="w-1/2 flex justify-center items-center relative">
//               <img
//                 className="w-full h-full object-contain"
//                 src={imageList[selectedIndex]}
//                 alt="Original"
//                 onMouseMove={handleMouseMove}
//               />
//               <div
//                 className="absolute border border-white opacity-75 transition-all duration-75"
//                 style={{
//                   width: "150px",
//                   height: "150px",
//                   left: `${zoomPosition.x}%`,
//                   top: `${zoomPosition.y}%`,
//                   transform: "translate(-50%, -50%)",
//                 }}
//               ></div>
//             </div>
//             <div className="w-1/2 overflow-hidden relative">
//               <div
//                 className="absolute inset-0 bg-no-repeat bg-cover"
//                 style={{
//                   backgroundImage: `url(${imageList[selectedIndex]})`,
//                   backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
//                   backgroundSize: "200%",
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// Best
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
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition((prev) => ({
      x: prev.x + (x - prev.x) * 0.2,
      y: prev.y + (y - prev.y) * 0.2,
    }));
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <div {...handlers} className="flex justify-center w-full overflow-hidden">
        <img
          className="object-cover h-[350px] md:h-[430px] cursor-pointer"
          src={imageList[selectedIndex]}
          alt="Selected"
          onClick={() => openZoomPopup()}
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
          <div className="relative flex p-8 w-[95vw] h-[95vh] gap-3">
            <button
              className="absolute top-2 right-2 text-white text-3xl cursor-pointer bg-transparent border-none"
              onClick={closeZoomPopup}
            >
              ✕
            </button>
            <div className="w-1/2 flex justify-center items-center relative">
              <img
                className="w-full h-full object-contain"
                src={imageList[selectedIndex]}
                alt="Original"
                onMouseMove={handleMouseMove}
              />
              <div
                className="absolute border border-white opacity-75"
                style={{
                  width: "50%",
                  height: "50%",
                  left: `${zoomPosition.x}%`,
                  top: `${zoomPosition.y}%`,
                  transform: "translate(-50%, -50%)",
                  transition: "left 0.1s ease-out, top 0.1s ease-out",
                }}
              ></div>
            </div>
            <div className="w-1/2 overflow-hidden relative">
              <div
                className="absolute inset-0 bg-no-repeat bg-cover"
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

