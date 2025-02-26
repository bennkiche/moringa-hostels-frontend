import React from "react";

const About = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center text-center bg-gray-50 py-16 px-6">
      <div className="max-w-4xl">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">About Moringa Hostels</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Welcome to <strong>Moringa Hostels</strong>, your ideal home away from home. 
          Our hostel is designed to offer a comfortable, safe, and affordable 
          living experience for students and professionals.
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Our Mission</h3>
        <p className="text-gray-700 leading-relaxed">
          At Moringa Hostels, we are committed to creating a vibrant and inclusive 
          community where residents can thrive academically and socially. 
          We provide high-quality accommodations with modern amenities to ensure 
          a seamless living experience.
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Why Choose Us?</h3>
        <ul className="text-gray-700 list-disc list-inside space-y-3">
          <li><strong>Prime Location:</strong> Conveniently located near major educational institutions.</li>
          <li><strong>Comfortable Living:</strong> Fully furnished rooms with essential amenities.</li>
          <li><strong>Security:</strong> 24/7 security and surveillance for your safety.</li>
          <li><strong>Affordable Rates:</strong> Cost-effective accommodation options.</li>
          <li><strong>Community Living:</strong> A welcoming space that fosters learning and friendships.</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
