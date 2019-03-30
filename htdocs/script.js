$(function() {
    
    'use strict';
    

    var currentId;  //Счётчик ID задач, чтобы каждая была уникальной
    var taskList = {currentId: 0, tasks: []};   //Объект, содержащий
    var fromNew = false; 
    getTasks(); //Сразу проверяем базу данных на наличие задач.

    function loadTask(task) {
        /* Добавляет задачу в конец списка. */
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
        let dateTime = new Date();
        let year = dateTime.getFullYear();
        let month = dateTime.getMonth();
        let day = dateTime.getDate();
        let hours = dateTime.getHours();
        let minutes = dateTime.getMinutes();
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
                taskList = xhr.responseText;
                taskList = JSON.parse(xhr.responseText);
                if (taskList.currentId > 0) {
                    for(var i=0; i<taskList.tasks.length; i++) {
                        loadTask(taskList.tasks[i]);
                    }
                }   
            
            }
        }
    }   

    function addTask() {
        /* Добавляет задачу в конец списка. */
        taskList.currentId++;
        let curTime = curTimes(); //Текущее время
        let taskBox;
         taskBox = '<li class="task" id="task-0'+ taskList.currentId +'" data-time="'+ Date() +'">'+
             '<input class="isDone" type="checkbox">'+
             '<input class="taskName" type="text" placeholder="Task Name" value="Task '+ taskList.currentId +'">'+
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

    function saveTaskList(id, saveType) {
        /* Отправляет задачу на сервер*/
        var targetElem;
        for (let i=0; i<taskList.tasks.length; i++) {
            if ($(id).attr('id') == taskList.tasks[i].id) {
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
                creationDate: $(id +' > .date-time').text(),
                dateTime: $(id).attr('data-time')
            }
            if (saveType == 'new') {
                taskList.tasks.push(newTask);
            }

            if (saveType == 'edit') {
                taskList.tasks[targetElem] = newTask;
            }

            if (saveType == 'remove') {
                taskList.tasks.splice(targetElem, 1);
                $(id).remove();
            }        
            
    }
            
    function sendToServer() {
        var toServer = JSON.stringify(taskList); //Заворачиваем нашу коллекцию тасков в JSON

        var xhrs = new XMLHttpRequest();   
        xhrs.open("POST", '/savetasklist', true);
        xhrs.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        xhrs.onreadystatechange = function() {
            if (xhrs.readyState != 4) return;
        }

        xhrs.send(toServer);

    }


    function sortTasks() {
        /* Сортирует задачи по булевому параметру fromNew = true для "сначала новые" или наоборот */
        function compare(a, b) {
            if (Date(a.dateTime) > Date(b.dateTime)) return 1;
            if (Date(a.dateTime) < Date(b.dateTime)) return -1;
        }
          
        taskList.tasks.sort(compare);
        $('.task-list').empty();
        if (fromNew == true) {
            for (let i=0; i<taskList.tasks.length; i++) {
                loadTask(taskList.tasks[i]);
                $(".sort").text('From Oldest');
                fromNew = false;
            }
        } else {
            for (let i=taskList.tasks.length-1; i>=0;  i--) {
                loadTask(taskList.tasks[i]);
                $(".sort").text('From Newest');
                fromNew=true;
            }
        }
    }

    function filterTasks(prior) {
        /* Меняет отображение элементов списка в зависимости от значения приоритета. */
        

        for(let i=0; i<taskList.tasks.length; i++) {
            if (taskList.tasks[i].priority==prior) {
                $('#'+taskList.tasks[i].id).css('{display: block;}');
        } else {
            $('#'+taskList.tasks[i].id).css('{display: hide;}');
            }
        }
    }

    $('#high').on('click', filterTasks($('#high').is(':checked')));
    $('#medium').on('click', filterTasks($('#medium').is(':checked')));
    $('#low').on('click', filterTasks($('#low').is(':checked')));

    $('.add-new').on('click', addTask); //Нажатие кнопки New Task создаёт новую задачу

    $('.sort').on('click', sortTasks);

    $(document).on('click', '.delete-button', function(event) {
        let id = '#' + $(this).parent().attr('id');
        saveTaskList(id, 'remove');
        sendToServer();
    }); //Нажатие кнопки Delete удаляет текущую задачу*/

    $(document).on('click', '.save-button', function(event) {
        let id = '#' + $(this).parent().attr('id');
        saveTaskList(id, 'new');
        sendToServer();
    }); //Нажатие кнопки save инициирует отправку данных на сервер

   
});
