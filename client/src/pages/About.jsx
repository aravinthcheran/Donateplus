// import React from 'react'

// export default function About() {
//   return (
//     <div className='py-20 px-4 max-w-6xl mx-auto'>
//       <h1 className='text-3xl font-bold mb-4 text-slate-800'>About Sahand Estate</h1>
//       <p className='mb-4 text-slate-700'>Sahand Estate is a leading real estate agency that specializes in helping clients buy, sell, and rent properties in the most desirable neighborhoods. Our team of experienced agents is dedicated to providing exceptional service and making the buying and selling process as smooth as possible.</p>
//       <p className='mb-4 text-slate-700'>
//       Our mission is to help our clients achieve their real estate goals by providing expert advice, personalized service, and a deep understanding of the local market. Whether you are looking to buy, sell, or rent a property, we are here to help you every step of the way.
//       </p>
//       <p className='mb-4 text-slate-700'>Our team of agents has a wealth of experience and knowledge in the real estate industry, and we are committed to providing the highest level of service to our clients. We believe that buying or selling a property should be an exciting and rewarding experience, and we are dedicated to making that a reality for each and every one of our clients.</p>
//     </div>
//   )
// }
import React from 'react';

export default function About() {
  return (
    <div className='py-20 px-4 max-w-6xl mx-auto'>
      <div className="about-container">
        <div className="about-content">
          <h1 className='text-5xl font-bold mb-8 text-slate-800 text-center'>About Donate +</h1>
          <p className="about-description">Donate + is a groundbreaking platform designed to facilitate the seamless exchange of commodities for donation purposes on a global scale. It serves as a digital bridge connecting individuals, organizations, and communities with surplus goods to those in need, fostering growth and happiness in the process.</p>
          <div className="fluid-animation"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <DeveloperCircle name="Karthikeyan Sivarasu" />
          <DeveloperCircle name="Aravinth" />
          <DeveloperCircle name="Monish Rajan" />
          <DeveloperCircle name="Ramapriya" />
          <DeveloperCircle name="Prateeksha" />
          <DeveloperCircle name="Jeevasakthi" />
        </div>
      </div>
    </div>
  );
}

function DeveloperCircle({ name }) {
  return (
    <div className="text-center relative">
      <div className="w-40 h-40 rounded-full mx-auto overflow-hidden shadow-lg hover-enlarge backdrop-blur">
        <div className="w-full h-full bg-gray-200 absolute inset-0"></div>
        <img className="w-full h-full object-cover" src={`https://via.placeholder.com/400?text=${name}`} alt={name} />
      </div>
      <p className="text-lg font-bold animate-blink">{name}</p>
    </div>
  );
}