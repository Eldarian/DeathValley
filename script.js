$(function() {
    
    'use strict';
    var taskNum = 0;
    function addTask() {
       /* Добавляет пустую задачу в конец списка */
       taskNum++;
        let curTime = curTimes();
        let taskBox = '<li class="task" id="task-0'+ taskNum +'">'+
            '<input class="isDone" type="checkbox">'+
            '<input class="taskName" type="text" placeholder="Task Name" value="Task '+ taskNum +'">'+
            '<textarea class="taskDescription" placeholder="Task Description"></textarea>'+
            '<select class="taskPriority">'+
                '<option>High Priority</option>'+
                '<option>Medium Priority</option>'+
                '<option>Low Priority</option>'+
            '</select> '+
            '<p class="date-time">'+ curTime +'</p>'+
            '<button class="save-button">Save</button>'+
            '<button class="delete-button">Delete</button>'+
    '</li>';
       $('.task-list').append(taskBox);
    // Задача добавлена
    }

    function curTimes() {
        let DateTime = new Date();
        let year = DateTime.getFullYear();
        let month = DateTime.getMonth();
        let day = DateTime.getDate();
        let hours = DateTime.getHours();
        let minutes = DateTime.getMinutes();
        let fMonth;
        // Преобразуем месяцы
        switch (month) {
            case 0: fMonth = "Jan"; 
            break;
            case 1: fMonth = "Feb"; 
            break;
            case 2: fMonth = "Mar"; 
            break;
            case 3: fMonth = "Apr"; 
            break;
            case 4: fMonth = "May"; 
            break;
            case 5: fMonth = "Jun"; 
            break;
            case 6: fMonth = "Jul"; 
            break;
            case 7: fMonth = "Aug"; 
            break;
            case 8: fMonth = "Sep"; 
            break;
            case 9: fMonth = "Oct"; 
            break;
            case 10: fMonth = "Nov"; 
            break;
            case 11: fMonth = "Dec"; 
            break;
        }
        if (minutes<10) {
            minutes="0" + minutes;
        }
        return day + ' ' + fMonth + ' ' + year + ' ' + hours + ":" + minutes;
    }

    function removeTask(id) {
        /* Удаляет задачу */
        $(id).remove();
    }

    function editTask(task, parameter) {
        /* Заменяет значения в формах по умолчанию value */
    }

    function sortTasks(fromNew) {
        /* Сортирует задачи по булевому параметру fromNew = true для "сначала новые" или наоборот */
    }

    function filterTasks(hPrior, mPrior, lPrior) {
        /* Меняет отображение элементов списка в зависимости от значения приоритета. */
    }

    $('.add-new').on('click', addTask); //Нажатие кнопки New Task создаёт новую задачу

    $(document).on('click', '.delete-button', function(event) {
        let id = '#' + $(this).parent().attr('id');
        removeTask(id);
    }); //Нажатие кнопки Delete удаляет текущую задачу*/
});
