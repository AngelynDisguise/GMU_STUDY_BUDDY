// import { picture } from './attachments';
modules.exports = (sequelize, DataTypes) => {
    const userinfo = sequelize.define("userinfo", {
        /****************** PRIVATE INFO *****************/
        /**
         * Check if includes “@gmu.edu” substring
         */
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        /**
         * Date format: [month/day/year]
         * Index 1 = month
         * Index 2 = day
         * Index 3 = year
         * 
         * Prop not shown on matches list; shown as age only
         */
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        /****************** PUBLIC INFO *****************/
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        /**
         * Limited to Male/Female (for now)
         * Make selector/drop-down options for this
         */
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        /**
         * Limited to one major (for now)
         */
        major: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    // picture.addTo(userinfo);
    return Users;
};