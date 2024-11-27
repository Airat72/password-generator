
const PasswordList = ({ passwords, deletePassword }) => {
    return (
        <ul>
            {passwords.map((p) => (
                <li key={p.id} className="flex justify-between items-center border-b py-2">
                    <span>{p.service}: {p.password}</span>
                    <button onClick={() => deletePassword(p.id)} className="text-red-500">Удалить</button>
                </li>
            ))}
        </ul>
    );
};

export default PasswordList;
