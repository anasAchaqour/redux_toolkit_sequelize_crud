import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { updateUser } from './redux/userSlice';

const UpdateUser = () => {
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const users = useSelector((state) => state.users);

    useEffect(() => {
        const userToUpdate = users.find((user) => user.id === parseInt(id));
        if (userToUpdate) {
            setName(userToUpdate.name);
            setEmail(userToUpdate.email);
            setAge(userToUpdate.age);
        }
    }, [id, users]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = {
                id: parseInt(id),
                name,
                email,
                age: parseInt(age),
            };
            await axios.put(`http://localhost:8080/api/users/${id}`, updatedUser);
            dispatch(updateUser(updatedUser));
            history.push('/');
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div>
            <h2>Update User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="age">Age:</label>
                    <input
                        type="number"
                        id="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>
                <button type="submit">Update User</button>
            </form>
        </div>
    );
};

export default UpdateUser;
