import React from 'react';
import Title from './Title';

const About = () => {
  return (
    <section className="flex flex-col items-center px-6 md:px-16 lg:px-24 pt-20 pb-30 w-full">
      <div className="max-w-6xl w-full">
        <Title 
          title="About RegalRetreat" 
          subTitle="Your trusted partner for unique stays and unforgettable experiences worldwide." 
        />
        <div className=" rounded-2xl shadow-lg mt-20 p-12 md:p-16 text-center max-w-4xl mx-auto bg-slate-50">
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-medium">
            At <strong>RegalRetreat</strong>, we believe every journey deserves a special place to rest, recharge, and create memories.
            Whether you're seeking a cozy cabin, a luxury beachfront villa, or a stylish city apartment, our curated collection offers extraordinary stays for every traveler.
          </p>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed mt-8">
            Founded with a passion to connect travelers with unique accommodations, RegalRetreat is dedicated to providing seamless booking experiences,
            exceptional customer support, and exclusive offers. Join thousands of happy guests who trust us to make their travel dreams a reality.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
