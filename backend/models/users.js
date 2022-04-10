module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        /****************** PRIVATE INFO *****************/
        /**
         * Check if includes “@gmu.edu” substring
         */
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
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
        date: {
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: true,
        },
        /****************** PUBLIC INFO *****************/
        firstName: {
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: true,
        },
        /**
         * Limited to Male/Female (for now)
         * Make selector/drop-down options for this
         */
        gender: {
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: true,
        },
        /**
         * Limited to one major (for now)
         */
        major: {
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: true,
        },
    });
    return Users;
};