import React, { useState } from 'react';

const GeneratePassword = ({ addPassword }) => {
    const [length, setLength] = useState(12);
    const [includeUpper, setIncludeUpper] = useState(true);
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);

    const generatePassword = () => {
        let charset = "abcdefghijklmnopqrstuvwxyz";
        if (includeUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (includeNumbers) charset += "0123456789";
        if (includeSymbols) charset += "!@#$%^&*()_+[]{}|;:,.<>?";

        let password = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        addPassword("Сгенерированный пароль", password);
    };

    return (
        <div className="bg-gray-100 p-4 rounded shadow ">
            <h2 className="text-xl font-semibold mb-2">Генерация пароля</h2>
            <label>
                Длина пароля:
                <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="border p-1 rounded ml-2"
                    min="1"
                />
            </label>
            <div className="flex items-center mt-2">
                <label className="mr-2">
                    <input
                        type="checkbox"
                        checked={includeUpper}
                        onChange={() => setIncludeUpper(!includeUpper)}
                    />
                    Включать заглавные буквы
                </label>
                <label className="mr-2">
                    <input
                        type="checkbox"
                        checked={includeNumbers}
                        onChange={() => setIncludeNumbers(!includeNumbers)}
                    />
                    Включать цифры
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={includeSymbols}
                        onChange={() => setIncludeSymbols(!includeSymbols)}
                    />
                    Включать спецсимволы
                </label>
            </div>
            <button onClick={generatePassword} className="bg-green-500 text-white p-2 rounded mt-2">
                Сгенерировать пароль
            </button>
        </div>
    );
};

export default GeneratePassword;