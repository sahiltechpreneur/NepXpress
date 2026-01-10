'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface) {
    const password = await bcrypt.hash('Admin@123', 10);
    return queryInterface.bulkInsert('users', [
      {
        name: 'Admin',
        email: 'admin@nepxpress.com',
        password,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('users', { email: 'admin@nepxpress.com' });
  },
};
