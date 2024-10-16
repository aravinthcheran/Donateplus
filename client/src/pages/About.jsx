import React from 'react';
import '../styles/about.css';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 relative"> {/* Gradient background */}
      <div className="py-20 px-4 max-w-6xl mx-auto bg-white shadow-md rounded-lg z-10 relative">
        <div className="about-container text-center">
          <div className="about-content mb-16">
            <h1 className="text-5xl font-extrabold mb-8 text-slate-800 tracking-tight">
              About <span className="text-purple-600">Donate +</span>
            </h1>
            <p className="text-slate-700 leading-relaxed max-w-2xl mx-auto mb-12">
              <strong>Donate +</strong> is a pioneering platform designed to create a global connection for the seamless exchange of donated commodities. By linking individuals, organizations, and communities with surplus resources to those in need, <strong>Donate +</strong> strives to foster growth, generosity, and positivity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {developers.map((developer, index) => (
              <DeveloperCircle key={index} name={developer.name} image={developer.image} />
            ))}
          </div>
        </div>
      </div>

      {/* Water flow effect SVG */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="rgba(156, 139, 255, 0.5)"
          d="M0,256L30,245.3C60,235,120,213,180,202.7C240,192,300,192,360,186.7C420,181,480,171,540,154.7C600,139,660,117,720,96C780,75,840,53,900,64C960,75,1020,117,1080,144C1140,171,1200,181,1260,160C1320,139,1380,85,1410,64L1440,43L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
        ></path>
      </svg>
    </div>
  );
}

const developers = [
  { name: 'Karthikeyan Sivarasu', image: 'https://via.placeholder.com/400?text=Karthikeyan' },
  { name: 'Aravinth', image: 'https://via.placeholder.com/400?text=Aravinth' },
  { name: 'Monish Rajan', image: 'https://via.placeholder.com/400?text=Monish' },
  { name: 'Ramapriya', image: 'https://via.placeholder.com/400?text=Ramapriya' },
  { name: 'Prateekshaa', image: 'https://via.placeholder.com/400?text=Prateeksha' },
  { name: 'Jeevasakthi', image: 'https://via.placeholder.com/400?text=Jeevasakthi' },
];

function DeveloperCircle({ name, image }) {
  return (
    <div className="text-center relative group">
      <div className="w-44 h-44 mx-auto rounded-full overflow-hidden shadow-lg transition-transform duration-300 transform group-hover:scale-105 bg-gradient-to-r from-purple-300 to-pink-200">
        <img className="w-full h-full object-cover" src={image} alt={name} />
      </div>
      <p className="mt-4 text-xl font-semibold text-slate-800 group-hover:text-purple-700 transition-colors duration-300">
        {name}
      </p>
    </div>
  );
}
