import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-grow">
      <section className="relative py-8 flex flex-col items-center gap-6">
        <div className="text-[#DE8436] text-2xl font-bold px-4 py-2 rounded mb-4">
          Today's Meals
        </div>
        <Link href="/store">
          <div className="flex flex-wrap justify-center gap-6 px-4 sm:px-6 lg:px-8 cursor-pointer">
            {[
              { src: "/hamburger.jpg", alt: "Hamburger" },
              { src: "/steak.jpg", alt: "Steak" },
              { src: "/tiramisu.jpg", alt: "Tiramisu" },
              { src: "/ppizza.webp", alt: "Pizza" },
              { src: "/ppasta.webp", alt: "Pasta" },
            ].map((meal, idx) => (
              <div
                key={idx}
                className="bg-white shadow-md rounded-xl overflow-hidden w-40 sm:w-48 md:w-56 transform transition-transform hover:scale-105"
              >
                <img
                  src={meal.src}
                  alt={meal.alt}
                  className="w-full h-32 sm:h-40 object-cover"
                />
                <div className="p-2 text-center font-semibold text-[#D8732F]">
                  {meal.alt}
                </div>
              </div>
            ))}
          </div>
        </Link>

        <div className="w-full mx-auto flex flex-col sm:flex-row bg-[#F6E8DC]">
          <div className="w-full sm:w-1/2 p-4 sm:p-6 flex flex-col">
            <h2 className="text-lg font-semibold text-[#D8732F] mb-2">
              Our Story
            </h2>
            <p className="text-[#D8732F] text-lg">
              We believe in creating unforgettable dining experiences with a
              focus on fresh, locally-sourced ingredients. Our passion for food
              and hospitality drives us to offer a welcoming atmosphere where
              every meal feels like a celebration.
            </p>
            <a
              href="/Pages/about.html"
              className="text-[#D8732F] cursor-pointer underline font-bold mt-4"
            >
              Read More
            </a>
          </div>
          <div className="w-full sm:w-1/2 h-auto">
            <img
              src="/ranveer-brar-main.jpg"
              alt="Our Story"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
      <section className="py-8 px-4 sm:px-6 lg:px-8 mt-10 sm:mt-0">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-[#DE8436]">
          Menu
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { src: "/ppasta.webp", label: "Pasta" },
            { src: "/ppizza.webp", label: "Pizza" },
            { src: "/tiramisu.jpg", label: "Dessert" },
          ].map((item, idx) => (
            <Link href="/store" key={idx}>
              <div className="group bg-white rounded-xl shadow-md overflow-hidden border border-[#D9AC84] transform transition-transform duration-300 hover:scale-105 mt-4 sm:mt-0 cursor-pointer">
                <div className="h-64 sm:h-72 overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.label}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-4 text-center text-lg font-semibold text-[#D9AC84]">
                  {item.label}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="bg-[#F6E8DC] py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="text-2xl font-bold text-[#DE8436] mb-6">Events</div>
        <div className="w-full flex flex-col sm:flex-row">
          <div className="w-full sm:w-1/2 flex justify-center items-center p-4">
            <img
              src="/wedges-catering.jpeg"
              alt="Event"
              className="w-[500px] h-64 object-cover rounded-lg shadow-md"
              style={{ margin: "20px auto" }}
            />
          </div>
          <div className="w-full sm:w-1/2 p-6">
            <h3 className="text-2xl font-bold text-[#DE8436] mb-4">
              Conference
            </h3>
            <p className="text-lg text-[#D8732F]">
              Host your next conference in our elegant private event space,
              perfect for meetings, workshops, and corporate gatherings....
            </p>
          </div>
        </div>
      </section>
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-4">
          {[1, 2, 3, 4, 5, 6].map((num, idx) => {
            const isWoman = idx % 2 === 1;
            const isFullStars = idx % 3 === 0;
            const stars = Array(5)
              .fill(0)
              .map((_, i) =>
                i < (isFullStars ? 5 : idx === 2 ? 2 : 4)
                  ? "/star.png"
                  : "/star(1).png"
              );
            return (
              <div key={idx} className="flex flex-col items-center">
                <img
                  src={isWoman ? "/woman.png" : "/person.png"}
                  alt={`Image ${num}`}
                  className="w-32 h-32 rounded-full object-cover"
                />
                <div className="flex gap-1 mt-2">
                  {stars.map((star, i) => (
                    <img key={i} src={star} alt="Star" className="w-4 h-4" />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
