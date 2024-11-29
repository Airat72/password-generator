import React, { useState } from 'react';

const PasswordList = ({ passwords, deletePassword }) => {
  const [visiblePasswords, setVisiblePasswords] = useState({}); // Хранит видимость паролей

  const toggleVisibility = (id) => {
    setVisiblePasswords(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <ul>
      {passwords.map((p) => (
        <li key={p.id} className="flex justify-between items-center border-b py-2">
          <span>{p.service}: {visiblePasswords[p.id] ? p.password : '●●●●●●●●'}</span>
          <div>
            <button onClick={() => toggleVisibility(p.id)} className="text-blue-500 mr-2">
              {visiblePasswords[p.id] ? 'Скрыть' : 'Показать'}
            </button>
            <button onClick={() => deletePassword(p.id)} className="text-red-500">Удалить</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PasswordList;
