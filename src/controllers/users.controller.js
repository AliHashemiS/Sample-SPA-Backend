import fs from 'fs/promises';
import jwt from 'jsonwebtoken';

// Load user data from JSON file
async function getUsers() {
    try {
        const usersData = await fs.readFile('./database/users.json');
        console.log(JSON.parse(usersData));
        return JSON.parse(usersData);
    } catch (error) {
        return [];
    }
}

// Save user data in JSON file
async function saveUsers(users) {
    try {
        await fs.writeFile('./database/users.json', JSON.stringify(users, null, 2));
    } catch (error) {
        console.error('Error saving users:', error);
    }
}

export const getAllUsers = async (req, res) => {

    try {
        const users = await getUsers();
        console.log(users);

        res.status(200).json({ message: 'Authentication successful', users });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const signIn = async (req, res) => {
    const { username, password } = req.body;

    try {
        const users = await getUsers();
        console.log(users);
        const user = users.find(user => user.username === username);

        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
        res.status(200).json({ message: 'Authentication successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const signUp = async (req, res) => {
    const { username, password } = req.body;

    try {
        const users = await getUsers();
        console.log(users);
        const existingUser = users.find(user => user.username === username);

        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        users.push({ username, password });
        await saveUsers(users);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}; 