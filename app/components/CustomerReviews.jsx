import { Rating } from "@mui/material";

export default function CustomerReviews() {
  const list = [
    {
      name: "Ayush",
      message:
        "Snapify is fantastic! The product quality is great, delivery is always on time, and customer service is very helpful. Highly recommended!",
      rating: 4.5,
      imageLink:"/me1.png",
    },
    {
      name: "Shraddha Kapoor",
      message:
        "Loved my shopping experience on Snapify! The website is easy to use, prices are great, and returns are super smooth. Will shop again!",
      rating: 5,
      imageLink:
        "/person2.jpg",
    },
    {
      name: "Nikhil Kamath",
      message:
        "Snapify never disappoints! The products are authentic, packaging is secure, and shipping is really fast. Excellent service!",
      rating: 4.5,
      imageLink:
        "/person3.jpg",
    },
  ];
  return (
    <section className="flex justify-center">
      <div className="w-full p-5 md:max-w-[900px] flex flex-col gap-3">
        <h1 className="text-center font-semibold text-xl">
          Our customers love
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {list?.map((item) => {
            return (
              <div className="flex flex-col gap-2 p-4 rounded-lg justify-center items-center border">
                <img
                  src={item?.imageLink}
                  className="h-32 w-32 rounded-full object-cover"
                  alt=""
                />
                <h1 className="text-sm font-semibold">{item?.name}</h1>
                <Rating
                  size="small"
                  name="customer-rating"
                  defaultValue={item?.rating}
                  precision={item?.rating}
                  readOnly
                />
                <p className="text-sm text-gray-500 text-center">
                  {item?.message}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}