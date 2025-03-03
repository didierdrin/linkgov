import React from 'react';

const Sidebar = () => {
  return (
    <aside className="bg-gray-100 p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Sidebar</h2>
      <ul className="space-y-2">
        <li>
          <a href="#" className="text-blue-500 hover:underline">
            Dashboard
          </a>
        </li>
        <li>
          <a href="#" className="text-blue-500 hover:underline">
            Profile
          </a>
        </li>
        <li>
          <a href="#" className="text-blue-500 hover:underline">
            Settings
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
