const user = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '1234567',
};

const allUsers = [user];

const loginBody = {
  email: 'admin@admin.com',
  password: 'secret_admin',
};

export { user, allUsers, loginBody };
