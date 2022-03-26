import { picture } from './attachments';
modules.exports = (sequelize, DataTypes) => {
    const userinfo = sequelize.define("userinfo", {
		//Match with users table
        username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
        //First and Last name
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        //M/F
        gender:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        //List of classes
        classes:{
            type: DataTypes.ARRAY,
            allowNull: false,
        },
        //Assume user has 1 major
        major:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        //Assume undergrad
        GraduationDate:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        //Split this categpry up in Date/Month/Year
        //Make function to convert into age
        DOB:{
            type: DataTypes.ARRAY,
            allowNull: false,
        },

    });
    picture.addTo(userinfo);
    return userinfo;
};