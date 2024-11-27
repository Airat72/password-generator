import React, { useState, useEffect } from 'react';
import PasswordModal from './components/PasswordModal';
import PasswordList from './components/PasswordList';
import GeneratePassword from './components/GeneratePassword';

const App = () => {
  const [passwords, setPasswords] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedPasswords = JSON.parse(localStorage.getItem('passwords')) || [];
    setPasswords(storedPasswords);
  }, []);

  const toggleModal = () => setModalOpen(!isModalOpen);

  const addPassword = async (service, password) => {
    const newPassword = { service, password };
    const updatedPasswords = [...passwords, newPassword];
    setPasswords(updatedPasswords);
    localStorage.setItem('passwords', JSON.stringify(updatedPasswords));
    return true;
  };

  const deletePassword = (service) => {
    const updatedPasswords = passwords.filter(p => p.service !== service);
    setPasswords(updatedPasswords);
    localStorage.setItem('passwords', JSON.stringify(updatedPasswords));
  };

  const filteredPasswords = passwords.filter(p => 
    p.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Диспетчер паролей</h1>
      <input
        type="text"
        placeholder="Поиск по сервисам..."
        className="border p-2 rounded w-full mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex justify-center space-x-2 mb-4">
        <button onClick={toggleModal} className="bg-blue-500 text-white p-1 rounded">+</button>
        <GeneratePassword addPassword={addPassword} />
      </div>
      <PasswordList passwords={filteredPasswords} deletePassword={deletePassword} />
      {isModalOpen && <PasswordModal toggleModal={toggleModal} addPassword={addPassword} />}
    </div>
  );
};

export default App;
