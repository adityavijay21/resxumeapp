
let users = [
    { id: 1, username: 'admin', password: 'password' }
];

let books = [
    { id: 'W9752H01', title: 'Book 1', author: 'Author 1' },
    { id: 'W8742B09', title: 'Book 2', author: 'Author 2' },
    { id: 'W7644A14', title: 'Book 3', author: 'Author 3' },
    { id: 'W3245618', title: 'Book 4', author: 'Author 4' },
    { id: 'W456709A', title: 'Book 5', author: 'Author 5' }
];

const addUser = (username, password) => {
    const newUser = { id: users.length + 1, username, password };
    users.push(newUser);
    return newUser;
};

const getAllUsers = () => {
    return users;
};

const addBook = (id, title, author) => {
    const newBook = { id, title, author };
    books.push(newBook);
    return newBook;
};

const getAllBooks = () => {
    return books;
};

module.exports = { addUser, getAllUsers, addBook, getAllBooks };