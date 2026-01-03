const HeroSection = () => {
  const handleScroll = () => {
    event.preventDefault();
    const section = document.getElementById("getStartedSection");
    section.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div
      id="aboutUsSection"
      className="flex h-[75vh] flex-col items-center pt-6 lg:pt-20"
    >
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        Voice To
        <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
          {" "}
          Intent
        </span>
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
        “Voice to Intent” is an intelligent app that listens to how people naturally speak and instantly converts their thoughts into clear, structured intent. Whether you’re sharing ideas, tasks, reminders, decisions, or questions, the app understands context, emotions, and meaning. Turning raw voice into actionable clarity in real time. Just speak freely, and let your intent take shape automatically
      </p>
      <div className="flex justify-center my-10">
        <button
          href="#"
          className="bg-gradient-to-r from-orange-500 to-orange-800 py-3 px-4 mx-3 rounded-md"
          onClick={handleScroll}
        >
          Start for free
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
