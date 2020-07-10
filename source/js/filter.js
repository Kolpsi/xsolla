'use strict';
/**
* @description модуль фильтрации
*/
(function () {
    let city = document.querySelector('#city'),
        month = document.querySelector('#month');
    /**
    * @description фильтр по типу города
    * @param {object} object - объект события
    * @return {object} подходящее по параметрам событие.
    */
   let checkCityName = function (object) {
    if (city.value === 'all') {
      return window.data;
    }
    return object.city === city.value;
  };
  /**
    * @description фильтр по месяцу
    * @param {object} object - объект события
    * @return {object} подходящее по параметрам событие.
    */
   let checkMonth = function (object) {
    if (month.value === 'all') {
      return window.data;
    }
    return object.date.substr(3,2) === month.value;
  };

  window.filters = {
    /**
    * @description фильтр массива по кол-ву и типу
    * @param {array} data - массив событий
    * @return {array} отфильтрованный массив по всем фильтрам.
    */
    getFilteredEvents: function (data) {
      let filterData = data.
            filter(function (filterElem) {
              return checkMonth(filterElem) && checkCityName(filterElem);
            });
            return filterData;
    }
  };
})();