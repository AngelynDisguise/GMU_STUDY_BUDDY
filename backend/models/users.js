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
        /**
         * Hashed with bycrypt
         */
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        /**
         * List/array of preferences, 
         * based on match categories (all public info, except firstName)
         */
        preferences: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        /**
         * Date of birth
         * Calculates age based on today's date (/register2)
         * Date format: [month/day/year]
         * Example: [1/1/2000]
         */
        date: {
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: true,
        },
        /**
         * List/array of match users to be displayed on cards.
         * Contains all user info (will change later)
         */
        matchList: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        numMatches: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        /**
         * List/array of study buddies swiped by user.
         * Contains all user model info (will change later)
         */
        studyBuddyList: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        numStudyBuddies: {
            type: DataTypes.JSON,
            defaultValue: 0,
            allowNull: true,
        },

        /****************** PUBLIC INFO *****************/
        pfp: {
            type: DataTypes.BLOB("long"),
            allowNull: true,
            get() {
                //return this.getDataValue('pfp') ? this.getDataValue('pfp').toString('base64') : null;
                return this.getDataValue('pfp') ? "something's there" : null;
            }
        },
        firstName: {
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: true,
        },
        lastName: {
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
        age: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        bio: {
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: true,
        },
        classesTaken: {
            type: DataTypes.JSON,
            allowNull: true,
        },
    });
    return Users;
};