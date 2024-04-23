import React, { useState } from 'react';
import placeholderImage from '../components/img1.jpeg'; // Import the placeholder image

const developers = [
  { name: "Karthikeyan" },
  { name: "Aravinth" },
  { name: "Ramapriya" },
  { name: "Monish" },
  { name: "Pratteksha" },
  { name: "Jeevasakthi" }
];

export default function About() {
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);

  const handleMouseEnter = (developer) => {
    setSelectedDeveloper(developer);
  };

  const handleMouseLeave = () => {
    setSelectedDeveloper(null);
  };

  return (
    <div className='about-page py-20 px-4 max-w-6xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4 text-slate-800'>About Sahand Estate</h1>
      <p className='mb-4 text-slate-700'>Sahand Estate is a leading real estate agency that specializes in helping clients buy, sell, and rent properties in the most desirable neighborhoods. Our team of experienced agents is dedicated to providing exceptional service and making the buying and selling process as smooth as possible.</p>
      <p className='mb-4 text-slate-700'>
        Our mission is to help our clients achieve their real estate goals by providing expert advice, personalized service, and a deep understanding of the local market. Whether you are looking to buy, sell, or rent a property, we are here to help you every step of the way.
      </p>
      <p className='mb-4 text-slate-700'>Our team of agents has a wealth of experience and knowledge in the real estate industry, and we are committed to providing the highest level of service to our clients. We believe that buying or selling a property should be an exciting and rewarding experience, and we are dedicated to making that a reality for each and every one of our clients.</p>
      <div className="grid grid-cols-3 gap-4">
        {developers.map((developer, index) => (
          <div className="relative" key={index}>
            <div
              className="w-16 h-16 rounded-full bg-gray-300 cursor-pointer flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-110"
              onMouseEnter={() => handleMouseEnter(developer)}
              onMouseLeave={handleMouseLeave}
            >
              <img src={placeholderImage} alt={developer.name} className="w-full h-full object-cover rounded-full" />
            </div>
            <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-sm text-gray-800 hidden">{developer.name}</span>
          </div>
        ))}
      </div>
      {selectedDeveloper && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <img src={placeholderImage} alt={selectedDeveloper.name} className="max-w-xl max-h-xl" />
        </div>
      )}
    </div>
  );
}
