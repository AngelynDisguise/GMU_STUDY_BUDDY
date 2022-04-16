module.exports = (sequelize, DataTypes) => {
    const MatchList = sequelize.define("MatchList", {
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
    return MatchList;
};