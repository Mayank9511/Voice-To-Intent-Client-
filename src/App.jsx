import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Features from "./components/Features";
import ContactUs from "./components/ContactUs";
import GetStarted from "./components/GetStarted";
import ChatBot from "./components/ChatBot";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <ChatBot/>
        <HeroSection />
        <GetStarted />
        <Features />
        <ContactUs />
      </div>
    </>
  );
};

export default App;
