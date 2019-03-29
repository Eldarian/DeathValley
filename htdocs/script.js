$(function() {
    
    'use strict';
    

    var taskId;
    var tasksMessage;
    getTasks(); //Сразу проверяем базу данных на наличие задач.

    function loadTask(task) {
        /* Добавляет задачу в конец списка. */
        //console.log('Start loading');
        //console.log(task.name);
        let taskBox = '<li class="task" id="'+ task.id +'">'+
        '<input class="isDone" type="checkbox" ';
        if(task.isDone) {
            taskBox +='checked';
        }
             taskBox+='><input class="taskName" type="text" placeholder="Task Name" value="'+ task.name +'">'+
             '<textarea class="taskDescription" placeholder="Task Description">'+ task.description +'</textarea>'+
             '<select class="taskPriority">'+'<option ';

            if(task.priority=="High Priority") {
                taskBox += 'selected';
            } 
            taskBox += '>High Priority</option>'+
            '<option ';

            if(task.priority=="Medium Priority") {
                taskBox += 'selected';
            } 
            taskBox +='>Medium Priority</option>'+
            '<option ';

            if(task.priority=="Low Priority") {
                taskBox += 'selected';
            } 

            taskBox +='>Low Priority</option>'+
             '</select> '+
             '<p class="date-time">'+ task.creationDate +'</p>'+
             '<button class="save-button">Save</button>'+
             '<button class="delete-button">Delete</button>'+
     '</li>';
     $('.task-list').append(taskBox);
     //console.log('task has been loaded');
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
        saveTaskList(id, 'remove');
    }

    function getTasks() {
        //Получает задачи с сервера и добавляет их на страницу
        console.log('start getting tasks');
        var xhr = new XMLHttpRequest(); //Связываемся с сервером
        xhr.open('GET', '/gettasks', true);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState != 4) return;
            var tasks = [];
            if (xhr.status != 200) {
                alert(xhr.status + ': ' + xhr.statusText);
            } else {
                tasksMessage = xhr.responseText;
                //console.log(tasksMessage);
                tasksMessage = JSON.parse(xhr.responseText);
                taskId = tasksMessage.taskId;
                //tasks = tasksMessage.tasks;
                //console.log(tasks);
                if (tasksMessage.taskId > 0) {
                    for(var i=0; i<tasksMessage.tasks.length; i++) {
                        loadTask(tasksMessage.tasks[i]);
                    }
                }   
            
            }
        }
    }   


    function saveTaskList(id, saveType) {
        /* Отправляет задачу на сервер*/
        var targetElem;
        for (let i=0; i<tasksMessage.tasks.length; i++) {
            if ($(id).attr('id') == tasksMessage.tasks[i].id) {
                console.log('search');
                if (saveType == 'remove') {
                    targetElem = i;
                }
                if (saveType == 'new') {
                    saveType = 'edit';
                    targetElem = i;
                }
            }
        }   
            var newTask = {
                id: $(id).attr('id'),
                name: $(id +' > .taskName').attr('value'),
                description: $(id +' > .taskDescription').val(),
                isDone: $(id +' > .isDone').is(':checked'),
                priority: $(id +' > .taskPriority').val(),
                creationDate: $(id +' > .date-time').text()
            }
            console.log(id);
            if (saveType == 'new') {
                tasksMessage.taskId=taskId;
                tasksMessage.tasks.push(newTask);
            }

            if (saveType == 'edit') {
                tasksMessage.tasks[targetElem] = newTask;
                console.log(targetElem);
            }

            if (saveType == 'remove') {
                tasksMessage.tasks.splice(targetElem, 1);
                $(id).remove();
            }
        console.log(tasksMessage.tasks);
        
        
        var toServer = JSON.stringify(tasksMessage); //Заворачиваем нашу коллекцию тасков в JSON
        console.log('saving on');

        var xhrs = new XMLHttpRequest();

        xhrs.open("POST", '/savetasklist', true);
        xhrs.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhrs.onreadystatechange = function() {
            if (xhrs.readyState != 4) return;
        }

        xhrs.send(toServer);

    
    }

    function sortTasks(fromNew) {
        /* Сортирует задачи по булевому параметру fromNew = true для "сначала новые" или наоборот */
    }

    function filterTasks(hPrior, mPrior, lPrior) {
        /* Меняет отображение элементов списка в зависимости от значения приоритета. */
    }

    $('.add-new').on('click', addTask); //Нажатие кнопки New Task создаёт новую задачу

    $('.refresh').on('click', function() {
        console.log(tasksMessage.tasks);
    });

    $(document).on('click', '.delete-button', function(event) {
        let id = '#' + $(this).parent().attr('id');
        saveTaskList(id, 'remove');
    }); //Нажатие кнопки Delete удаляет текущую задачу*/

    $(document).on('click', '.save-button', function(event) {
        let id = '#' + $(this).parent().attr('id');
        saveTaskList(id, 'new');
    }); //Нажатие кнопки save инициирует отправку данных на сервер

    function addTask() {
        /* Добавляет задачу в конец списка. */
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
