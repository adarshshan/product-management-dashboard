import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <h1 className="text-white text-2xl">Product Management Dashboard</h1>
      </div>
    </nav>
  );
};

export default Navbar;