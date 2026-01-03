import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { motion } from "motion/react"
import { FaChartLine, FaMobileAlt, FaSearch, FaShieldAlt, FaStethoscope, FaSyringe } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import doctorImg from '../assets/images/doctor.webp';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';



import acne from '../assets/images/acne-1.avif';
import pso from '../assets/images/pso-1.jpg';
import ecz from '../assets/images/eczema.png';
import mel from '../assets/images/melasma-1.jpg';
import tin from '../assets/images/tinea-1.jpg';


export const LandingPage = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  const navigate = useNavigate();

  const skinConditions = [
    { name: "Psoriasis", image: pso },
    { name: "Eczema", image: ecz },
    { name: "Acne", image:  acne },
    { name: "Melasma", image: mel },
    { name: "Tinea", image: tin },
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased pb-6">
      {/* Navbar Section */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-2 py-3 flex items-center justify-between w-full">
          {/* Logo and App Name */}
          <div className="flex items-center">
            <div className="text-4xl font-bold text-gray-700 flex items-center">
              <span className="text-[#a0e870] text-4xl">Derma</span>Therapy
            </div>
          </div>

          {/* Search Bar and Location (Hidden on small screens) */}
          <div className="hidden md:flex items-center space-x-4 flex-grow max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for skin issues or products..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <svg
                className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Right-side navigation links */}
          <div className="flex items-center space-x-6">
            <a
              href="#"
              className="hidden lg:flex items-center text-gray-600 hover:text-emerald-500"
            >
              Skincare Services
            </a>
            <Link
              to={"/sign-up"}
              className=" hidden md:flex items-center px-4 py-2 bg-[#a0e870] text-[#183201] rounded-full hover:bg-[#183201] hover:text-white transition-colors"
            >
              Login
            </Link>
            {/* Mobile menu button (if needed) */}
            <button className="md:hidden text-gray-600">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-[#a0e870] text-[#183201] py-14 px-4 md:w-full md:h-[700px] overflow-hidden">
        {/* Main Content Container */}
        <div className="container mx-auto text-center w-full md:h-full relative z-10 flex flex-col items-center justify-center md:items-stretch gap-16">
          {/* Title with Doctor Image Overlay */}
          <div className="relative mb-8">
            <h1 className="text-[10vw] leading-none font-bold tracking-tight uppercase text-[#2d5016] opacity-90 font-neue flex flex-row justify-center items-center gap-16">
              SKIN
              <span className="block w-5"></span>
              CARE
            </h1>

            {/* Doctor Image Positioned in Front of Text */}
            <div className="absolute inset-0 flex items-center justify-center md:justify-start md:left-[33%] md:top-[100%]">
              <img
                src={doctorImg}
                alt="AI Doctor Character"
                className="w-[180px] md:w-[250px] lg:w-[500px] h-auto z-20 drop-shadow-2xl transform transition-transform duration-300"
                style={{
                  filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.15))'
                }}
              /> 
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:mt-10 font-body">
            {/* Description Text */}
            <div className="md:w-1/3 text-left">
              <p className="text-xl md:text-2xl font-semibold leading-relaxed">
                Upload a photo of your skin concern,
                <br />
                <span className="text-[#2d5016]">our AI will analyze it with accuracy</span>
                <br />
                and provide tailored insights and care suggestions.
              </p>

            </div>

            {/* Enhanced Upload Box */}
            <div className="bg-white text-gray-800 p-6 rounded-2xl shadow-xl w-full md:w-[300px] min-h-[180px] flex flex-col justify-center space-y-4 hover:shadow-2xl transition-shadow duration-300 border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="bg-[#a0e870] p-3 rounded-xl">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-800">Upload Image</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Upload a picture of your skin
                  </p>
                </div>
              </div>

              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-[#a0e870] transition-colors duration-300 cursor-pointer">
                <div className="text-gray-500 text-sm">
                  Click to browse or drag & drop
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Pattern/Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#8fd858] rounded-full opacity-20 -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#8fd858] rounded-full opacity-20 translate-y-24 -translate-x-24"></div>
      </div>

      {/* Disease/Condition Cards Section */}
      <div className="container w-full md:h-[700px] h-max mx-auto p-4 py-18 flex flex-col justify-center items-center gap-18">
        <div className="w-full flex flex-col justify-center items-center text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center google-sans">
            Common Skin Conditions
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mb-6 text-lg">
            Explore some of the most frequently encountered skin conditions.
            Click on a card to learn more.
          </p>
        </div>
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {skinConditions.map((condition) => (
            <div key={condition.name} className="relative group">
              {/* Card with hover overlay */}
              <Card className="relative overflow-hidden rounded-2xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform cursor-pointer">
                <img
                  src={condition.image}
                  alt={condition.name}
                  className="w-full h-40 md:h-52 object-cover"
                />

                {/* Subtle hover overlay (no text) */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition"></div>
              </Card>

              {/* Pill placed outside the Card, overlapping */}
              <div className="absolute left-1/2 bottom-0 translate-x-[-50%] translate-y-1/2">
                <span className="bg-white px-4 py-1 rounded-full text-sm font-semibold text-gray-700 shadow-md border">
                  {condition.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* About DermaTherapy */}
      <div className="container mx-auto p-4 py-8">
        <motion.section
          id="about"
          className="container mx-auto px-4 py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={fadeInUp}
        >
          <h1 className="text-4xl font-bold text-center mb-8 google-sans text-[#183201]" >About DermaTherapy</h1>
          <hr className="h-0.5 bg-[#cbfeb5]" />
          <p className="text-center text-2xl  max-w-5xl mx-auto text-[#68bf1c] font-semibold mt-7">
            DermaTherapy is a cutting-edge AI-driven platform developed by passionate researchers to
            assist people in early skin disease detection. We aim to bridge the gap between
            accessible diagnosis and effective remedies using technology.
          </p>
        </motion.section>
      </div>


      {/* Features Section */}
      <div className="container mx-auto my-10 p-4 py-8 bg-[#abfa6e] rounded-xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center google-sans">Features</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {[{
            icon: <FaStethoscope size={40} className="mx-auto mb-4 text-[#183201]" />,
            title: "Accurate Detection",
            desc: "Trained on thousands of images to identify skin conditions with precision."
          }, {
            icon: <FaShieldAlt size={40} className="mx-auto mb-4 text-[#183201]" />,
            title: "Safe & Secure",
            desc: "Your data is processed securely and is never stored."
          }, {
            icon: <FaMobileAlt size={40} className="mx-auto mb-4 text-[#183201]" />,
            title: "Mobile Friendly",
            desc: "Detect skin issues anytime, anywhere – fully responsive experience."
          }, {
            icon: <FaSearch size={40} className="mx-auto mb-4 text-[#183201]" />,
            title: "Visual Insights",
            desc: "Highlight affected areas visually with annotated results."
          }, {
            icon: <FaSyringe size={40} className="mx-auto mb-4 text-[#183201]" />,
            title: "Remedy Suggestions",
            desc: "Get personalized remedy recommendations based on condition type."
          }, {
            icon: <FaChartLine size={40} className="mx-auto mb-4 text-[#183201]" />,
            title: "Progress Tracking",
            desc: "Track skin health improvement over time using image history."
          }].map((feature, idx) => (
            <motion.div
              key={idx}
              className="w-full"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              variants={fadeInUp}
            >
              <Card className="h-full bg-white">
                <CardContent className="p-6 text-center">
                  {feature.icon}
                  <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                  <p className="text-[#518926] font-bold">{feature.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

