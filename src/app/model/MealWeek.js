"use strict";
var MealWeek = (function () {
    function MealWeek(rwId, recDate, recWith, recDateCre, recipe) {
        this.rwId = rwId;
        this.recDate = recDate;
        this.recWith = recWith;
        this.recDateCre = recDateCre;
        this.recipe = recipe;
    }
    return MealWeek;
}());
exports.MealWeek = MealWeek;
