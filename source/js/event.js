'use strict';
/**
* @description модуль отображения событий
*/
(function () {
    let eventList = document.querySelector('.event__item-list'),
        eventSearch = document.querySelector('.event__search'),
        eventItem = document.querySelector('#event')
        .content
        .querySelector('.event__item');

    window.events = {

        /**
        * @description функция отрисовки одного события
        * @param {object} events - объект
        * @return {object} event - возвращает событие
        */
        render: function (events) {
            let eventItemDay = eventItem.querySelector('.event__item-day');
            let eventItemCity = eventItem.querySelector('.event__item-title');

            let event = eventItem.cloneNode(true);
    
            if (events) {
                eventItem.value = events.id;
                eventItemCity.innerHTML = events.name;
                eventItem.style.backgroundImage = `url(${events.image})`;
                eventItem.style.backgroundrepeat = 'no-repeat';
                eventItemDay.innerHTML = events.date.substr(0,2);
                eventItem.style.display = 'block';
            return event;
            } else {
            return null;
            }
        },
      /**        

        /**
        * @description функция отрисовки ивента при успешном получении данных с сервера
        * @param {array} data - массив
        */
        successHandler: function (data) {
            window.data = data;
            window.filtered = window.filters.getFilteredEvents(data);
            window.events.drawEvents(window.filtered);
        },
        /**
        * @description функция вывода сообщения об ошибки
        */
        errorHandler: function () {
            alert("Нет данных с сервера");
        },
        /**
        * @description функция отрисовки всех ивентов
        * @param {array} events - массив минов
        */
        drawEvents: function (events) {
            window.events.remove();
            let fragment = document.createDocumentFragment();
      
            for (let i = 0; i < events.length; i++) {
              fragment.appendChild(window.events.render(events[i]));
            }
      
            eventList.appendChild(fragment);
        },
        /**
        * @description удаляет лишние ивенты
        */
        remove: function () {
            let obj = document.querySelectorAll('.event__item');
            for (let i = 1; i < obj.length; i++) {
              obj[i].remove();
            }
          },

    };

    eventSearch.addEventListener('change', function (evt) {
        window.backend.request(window.events.successHandler,
             window.event.errorHandler);
    })
    /**
     * @description фильтрует ивенты при загрузке страницы
    */
    let activated = function () {
        window.backend.request(window.events.successHandler);
    }

    activated();
})();