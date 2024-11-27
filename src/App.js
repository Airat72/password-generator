
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
    const response = await simulateServerRequest();
    if(response){
        const newPassword = { service, password };
        const updatedPasswords = [...passwords, newPassword];
        setPasswords(updatedPasswords);
        localStorage.setItem('passwords', JSON.stringify(updatedPasswords));
        return true;
    }
    return false;
  };

  const simulateServerRequest = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(Math.random() < 0.5); // 50% вероятность успеха
      }, 1000);
    });
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
      <input 
        type="text" 
        placeholder="Поиск по сервисам..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} 
        className="border p-2 rounded w-full mb-4"
      />
      <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-2 mb-4">
        <button 
          onClick={toggleModal} 
          className="bg-blue-500 text-white p-2 rounded w-full md:w-auto transition duration-200 hover:bg-blue-600"
        >
          Добавить пароль
        </button>
        <GeneratePassword addPassword={addPassword} />
      </div>
      <PasswordList passwords={filteredPasswords} deletePassword={deletePassword} />
      {isModalOpen && <PasswordModal toggleModal={toggleModal} addPassword={addPassword} />}
    </div>
  );
};

export default App;
