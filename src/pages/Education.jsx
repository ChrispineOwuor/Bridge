export default function Education() {
  let links = [
    {
      label: "Balanced Diet for Pregnancy",
      text: "Focus on whole grains, fruits, vegetables, lean proteins, and healthy fatsStay hydrated by drinking plenty of water throughout the day",
      href: "https://www.youtube.com/embed/3GTK6MLPJ9g",
    },
    {
      label: "Nutrient-Rich Foods for Pregnancy",
      text: "Opt for foods high in iron, zinc, vitamin B12, and omega-3 fatty acids.Enjoy lean meats, fish, poultry, and legumes",
      href: "https://www.youtube.com/embed/Nx_tAkI4O7U",
    },
    {
      label: "Foods to Avoid for Pregnant Mothers",
      text: "Avoid foods high in saturated fats, trans fats, and added sugars. Focus on whole grains, fruits, vegetables, lean proteins, and healthy fats",
      href: "https://www.youtube.com/embed/lv4xrmvdamY",
    },
  ];
  return (
    <>
      <div className="top">
        <h1 className="text-xl font-semibold stick top-8">
          Educational Content
        </h1>
      </div>
      <div>
        {links.map((link, index) => {
          return (
            <>
              
              <div
                key={index}
                className="grid sm:grid-cols-2 grid-cols-1 gap-4 mb-4"
              >
                <div className="flex items-center justify-center h-72 rounded bg-gray-50 dark:bg-gray-800 ">
                  <iframe
                    className="w-full h-full rounded-lg"
                    src={link.href}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  />
                </div>
                <div className="flex p-6 items-start flex-col justify-start h-48 rounded bg-gray-50 dark:bg-gray-800">
                  <h1 className="text-xl ">{link.label}</h1> <p>{link.text}</p>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
