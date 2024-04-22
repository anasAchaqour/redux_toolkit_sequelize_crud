const db = require('../models');
const User = db.Users; 

// 1. Create User
const addUser = async (req, res) => {
    try {
        const { name, email, age } = req.body;
        const user = await User.create({ name, email, age });
        res.status(201).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error creating user' });
    }
};

// 2. Get All Users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error retrieving users' });
    }
};

// 3. Get Single User
const getOneUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error retrieving user' });
    }
};

// 4. Update User
const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const [updatedRows] = await User.update(req.body, { where: { id } });
        if (updatedRows === 0) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error updating user' });
    }
};

// 5. Delete User
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedRows = await User.destroy({ where: { id } });
        if (deletedRows === 0) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error deleting user' });
    }
};

module.exports = {
    addUser,
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser
};