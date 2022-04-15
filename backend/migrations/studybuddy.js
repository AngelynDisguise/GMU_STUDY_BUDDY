'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const { Sequelize, DataTypes } = require('sequelize');
        const sequelize = new Sequelize( /* ... */ );
        const queryInterface = sequelize.getQueryInterface();
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        queryInterface.createTable('StudyBuddyList', {
            name: DataTypes.STRING,
            isBetaMember: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false
            }
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        // return queryInterface.sequelize.transaction(t => {
        //     return Promise.all([
        //         queryInterface.removeColumn('Users', 'date', { transaction: t })
        //     ]);
        // });

    }
};