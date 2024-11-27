
import React, { useState } from 'react';

const PasswordModal = ({ toggleModal, addPassword }) => {
    const [service, setService] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await addPassword(service, password);
        if (success) {
            alert('Пароль успешно добавлен!');
        } else {
            alert('Не удалось добавить пароль.');
        }
        toggleModal();
    };

    return (
        <div className="modal">
            <form onSubmit={handleSubmit} className="p-4">
                <div className="flex space-x-4 mb-4">
                    <div className="flex-1">
                        <label className="block mb-2">
                            Сервис:
                            <input
                                value={service}
                                onChange={e => setService(e.target.value)}
                                required
                                className="border border-gray-300 p-2 rounded w-full"
                            />
                        </label>
                    </div>
                    <div className="flex-1">
                        <label className="block mb-2">
                            Пароль:
                            <input
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                className="border border-gray-300 p-2 rounded w-full"
                            />
                        </label>
                    </div>
                </div>
                <div className="flex justify-between">
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">Сохранить</button>
                    <button type="button" onClick={toggleModal} className="bg-red-500 text-white p-2 rounded">Закрыть</button>
                </div>
            </form>
        </div>
    );
};

export default PasswordModal;