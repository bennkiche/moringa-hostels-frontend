import React from "react";

const Contact = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-10">Contact </h2>
        
        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-8 text-gray-800">
          <div className="flex flex-col space-y-4">
            <h3 className="text-2xl font-semibold">Our Location</h3>
            <p>Moringa Hostels</p>
            <p>Ngong Lane, Off Ngong Road</p>
            <p>Nairobi, Kenya</p>
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="text-2xl font-semibold">Get in Touch</h3>
            <p>Email: support@moringahostels.com</p>
            <p>Phone: +254 712 345 678</p>
            <p>Office Hours: Mon - Fri, 8:00 AM - 6:00 PM</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-center mb-6">Send Us a Message</h3>
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input 
                type="text" 
                placeholder="Enter your name" 
                className="w-full border-gray-300 rounded-lg px-4 py-2 mt-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700">Email</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full border-gray-300 rounded-lg px-4 py-2 mt-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700">Message</label>
              <textarea 
                rows="4" 
                placeholder="Type your message..." 
                className="w-full border-gray-300 rounded-lg px-4 py-2 mt-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;