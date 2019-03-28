$(function() {
    
    'use strict';
    


    var taskId = 0; //Счётчик задач (будет получаться от сервера)
    getTasks(); //Сразу проверяем базу данных на наличие задач.

    function loadTask(task) {
        /* Добавляет задачу в конец списка. */
        console.log('Start loading');
        console.log(task.name);
        let taskBox = '<li class="task" id="task-0'+ taskId +'">'+
        '<input class="isDone" type="checkbox" ';
        if(task.isDone) {
            taskBox +='checked';
        }
             taskBox+='><input class="taskName" type="text" placeholder="Task Name" value="'+ task.name +'">'+
             '<textarea class="taskDescription" placeholder="Task Description" value="'+ task.description +'"></textarea>'+
             '<select class="taskPriority">'+'<option';

            if(task.priority==1) {
                taskBox += 'selected';
            } 
            taskBox += '>High Priority</option>'+
            '<option';

            if(task.priority==2) {
                taskBox += 'selected';
            } 
            taskBox +='>Medium Priority</option>'+
            '<option';

            if(task.priority==3) {
                taskBox += 'selected';
            } 

            taskBox +='>Low Priority</option>'+
             '</select> '+
             '<p class="date-time">'+ task.creationDate +'</p>'+
             '<button class="save-button">Save</button>'+
             '<button class="delete-button">Delete</button>'+
     '</li>';
     $('.task-list').append(taskBox);
     console.log('task has been loaded');
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

    function getTasks() {
        //Получает задачи с сервера и добавляет их на страницу
        console.log('start getting tasks');
        var xhr = new XMLHttpRequest(); //Связываемся с сервером
        xhr.open('GET', '/data.json', true);
        xhr.send();
        xhr.onreadystatechange = function() { // (3)
            if (xhr.readyState != 4) return;
           
        var tasks = [];
        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText);
        } else {
            let tasksMessage = JSON.parse(xhr.responseText);
            taskId = tasksMessage.taskId;
            tasks = tasksMessage.tasks;
            console.log(tasks);

         for(var i=0; i<tasks.length; i++) {
             loadTask(tasks[i]);
         }
        }
    }
    }   


    function saveTask(task, parameter) {
        /* Отправляет задачу на сервер*/
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

    function addTask() {
        /* Добавляет задачу в конец списка. */
        console.log(taskId);
        taskId++;
        let curTime = curTimes(); //Текущее время
        let taskBox;
         taskBox = '<li class="task" id="task-0'+ taskId +'">'+
             '<input class="isDone" type="checkbox">'+
             '<input class="taskName" type="text" placeholder="Task Name" value="Task '+ taskId +'">'+
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
});
