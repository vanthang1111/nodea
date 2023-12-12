import bcrypt from 'bcrypt';

const users = [
  {
    name: "admin",
    email: "thangdzai@gmail.com",
    password: bcrypt.hashSync("123", 10),
    isAdmin: true
  },
  {
    name: "thang",
    email: "thangpro9669@gmail.com",
    password: bcrypt.hashSync("123", 10),
  },
];

export default users;
