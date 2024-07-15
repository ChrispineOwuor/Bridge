import { NavLink } from "react-router-dom";
import mom from "../assets/expec.png"

export default function Landing() {
  return (
    <div className="flex flex-wrap">
      <div className="w-full sm:w-8/12 mb-4">
        <div className="container mx-auto h-full sm:p-10">
          <nav className="flex px-4 justify-between  w-full">
            <div className="cont">
              <div className="text-4xl font-bold">
                BridgeHealth<span className="text-blue-700">.</span>
              </div>
            </div>
          </nav>
          <header className="container px-4 lg:flex mt-4 items-center h-full lg:mt-0">
            <div className="w-3/4">
              <h1 className="text-2xl lg:text-4xl font-bold">
                Get personalized medical advice and support from trusted
                doctors.
              </h1>
              <p className="text-xl mb-10">
                We help expecting mothers by providing personalized medical
                advice and support through our innovative symptom tracking and
                doctor reach-out system.
              </p>

              <NavLink
                to={"auth/login"}
                className="bg-indigo-600 text-white text-2xl font-medium px-4 py-2 rounded shadow"
              >
                Get Started Today
              </NavLink>
            </div>
          </header>
        </div>
      </div>
      <img
        src={mom}
        alt="Leafs"
        className="w-full h-1/4 object-cover sm:h-screen  sm:w-4/12"
      />
    </div>
  );
}
