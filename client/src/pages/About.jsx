import React from 'react';

export default function About() {
  return (
    <div className='py-20 px-4 max-w-6xl mx-auto'>
      <div className="about-container text-center">
        <div className="about-content mb-12">
          <h1 className='text-5xl font-extrabold mb-6 text-slate-800 tracking-tight'>
            About <span className='text-purple-600'>Donate +</span>
          </h1>
          <p className="about-description text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8">
            <strong>Donate +</strong> is a pioneering platform designed to create a global connection for the seamless exchange of donated commodities. By linking individuals, organizations, and communities with surplus resources to those in need, <strong>Donate +</strong> strives to foster growth, generosity, and positivity.
          </p>
          <div className="fluid-animation"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {developers.map((developer, index) => (
            <DeveloperCircle key={index} name={developer.name} image={developer.image} />
          ))}
        </div>
      </div>
    </div>
  );
}

const developers = [
  { name: 'Karthikeyan Sivarasu', image: 'https://via.placeholder.com/400?text=Karthikeyan' },
  { name: 'Aravinth', image: 'https://via.placeholder.com/400?text=Aravinth' },
  { name: 'Monish Rajan', image: 'https://via.placeholder.com/400?text=Monish' },
  { name: 'Ramapriya', image: 'https://via.placeholder.com/400?text=Ramapriya' },
  { name: 'Prateeksha', image: 'https://via.placeholder.com/400?text=Prateeksha' },
  { name: 'Jeevasakthi', image: 'https://via.placeholder.com/400?text=Jeevasakthi' },
];

function DeveloperCircle({ name, image }) {
  return (
    <div className="text-center relative group">
      <div className="w-44 h-44 mx-auto rounded-full overflow-hidden shadow-lg transition-transform duration-300 transform group-hover:scale-110 backdrop-blur-lg">
        <img className="w-full h-full object-cover" src={image} alt={name} />
      </div>
      <p className="mt-4 text-xl font-semibold text-slate-800 group-hover:text-purple-600 transition-colors duration-300">
        {name}
      </p>
    </div>
  );
}
