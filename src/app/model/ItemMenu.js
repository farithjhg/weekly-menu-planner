"use strict";
var ItemMenu = (function () {
    function ItemMenu(recDate, dayName, type, menu, menuWith, notification) {
        this.recDate = recDate;
        this.dayName = dayName;
        this.type = type;
        this.menu = menu;
        this.menuWith = menuWith;
        this.notification = notification;
    }
    return ItemMenu;
}());
exports.ItemMenu = ItemMenu;
