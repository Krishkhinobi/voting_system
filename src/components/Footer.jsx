import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-4">Online Voting Student Council</h3>
            <p className="text-sm">Empowering students through democratic participation</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul>
              <li className="mb-2"><a href="/" className="hover:text-blue-400 transition-colors duration-300">Home</a></li>
              <li className="mb-2"><a href="/vote" className="hover:text-blue-400 transition-colors duration-300">Vote</a></li>
              <li className="mb-2"><a href="/candidates" className="hover:text-blue-400 transition-colors duration-300">Candidates</a></li>
              <li className="mb-2"><a href="/results" className="hover:text-blue-400 transition-colors duration-300">Results</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="mb-2">Email: KrishKinobebayalan321@gmail.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm">&copy; {currentYear} Online Voting Student Council. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
