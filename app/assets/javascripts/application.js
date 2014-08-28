// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(document).ready(function() {

//GET ToDos___________________________________
//1. Establish a variable equal to the javascript request to 'get' all of the todos
  var todosGETPromise = $.getJSON('/todos');

//4.  The map method in #3 iterates through each item in returned_todos_response and runs the parseResponse function.  The
//parseResponse function takes the individual item and converts it into html that can be rendered.
  var parseResponse = function(eachToDo) {
    var tdItemContainer = "<div class='to-do-item'>" + "<div class='block' data-id=" + eachToDo.id + ">" + eachToDo.name + "</div>" + "<div class='block-right' id='button-item-x'>x</div>" + "<div class='block-right' id='button-item-complete'>o</div>" + "</div>";
//    $('#to-do-bucket').append(tdItemContainer);
    return tdItemContainer;
  };

//3.This variable (that is a function) is called in step 2.  It is a function that a. takes the JSON response data from #2 (called 'todosGetPromise')
//, and b. sets it as the function's argument (its being renamed here to "returned_todos_response".  The function here takes the
// returned_todos_response and does the map function.  The jscript map function is effectively the same as the Ruby
// map call.  The 'block of code' (aka: function) that is called when map is called is named 'parseResponses' (see #4).  The information
//that is returned in the map call is saved as "parsed_todo_items" which is then converted to html within the HTML Element associated
//with the to-do-bucket id.
  var addToTheView = function(returned_todos_response) {
    var parsed_todo_items = returned_todos_response.map(parseResponse);
    $('#to-do-bucket').html(parsed_todo_items);
  };

//2. Call the function associated w/ todosGETPromise (in 1).  Wait until the program successfully
//returns data (which is a JSON response), and then do the function that is included as the variable in the argument (ie:.addToTheView)
  todosGETPromise.success(addToTheView);
///////////////////////////////////////


//Create Header Tag
  var $body = $('body');
  $body.prepend("<h1>Todoly</h1>");

//Create Header Section and Append It (Hidden)
  var sectionBreak = "<hr/>";
  var listSection = "<h3>Todo!</h3>";
  var toDoListSection = "<div id='list-header'>" + sectionBreak + listSection + "</div>";
  $body.append(toDoListSection);


//Append a Flash Message and Append it(hidden)
  var flashContainer = "<div id='flash' class='green block'><div class='block' id='message'></div><div class='block-right button-x'>x</div></div>"
  $body.append(flashContainer)

//Create a ul to hold to do items
  $body.append("<ul id='to-do-bucket'></ul>");

//Create Complete Section and Append It (Hidden)
  var completeHeader = "<h3>Completed</h3>";
  var completeSection = "<div id='complete-header'>" + completeHeader + "</div>";
  $body.append(completeSection);

  var flashCompleteContainer = "<div id='flash-complete' class='green block'><div class='block' id='complete-message'></div><div class='block-right button-x'>x</div></div>"
  $body.append(flashCompleteContainer)
//Create a ul to hold the completed to do items
  $body.append("<ul id='completed-bucket'></ul>");


//UPON SUBMISSION
  $('form').on('submit', function(e) {
    e.preventDefault();
    var $listHeader = $('#list-header');

//  If the list header is not displayed, show it.
    if ($listHeader.css('display') == 'none') {
      $listHeader.toggle();
    }

//  Add an to-do item upon submission
    var itemText = $('#todo-item').val()


    //POST the To Do ___________________________________
    var postToDoPromise = $.post("/todos", {name: itemText});

    postToDoPromise.success( function(todo) {
      var todoItemContainer = "<div class='to-do-item'>" + "<div class='block' data-id=" + todo.id + ">" + todo.name + "</div>" + "<div class='block-right' id='button-item-x'>x</div>" + "<div class='block-right' id='button-item-complete'>o</div>" + "</div>";
      $('#to-do-bucket').append(todoItemContainer);
    });

    ///////////////////////////


//  Flash that the to-do was created upon submission
    var $flash = $('#flash')
    $('#message').text("ToDoCreated")
    $flash.removeClass('red')
    $flash.addClass('green')
    $flash.toggle()
    $flash.fadeOut(1000)



// On click, you can hide the flash message
    $flash.on('click', '.button-x', function() {
     $(this).parents('#flash').hide()
   })

  });
// On click, you can delete a to-do-item and flash a red flash
  $('ul').on('click', '#button-item-x', function () {
    var $flash = $('#flash')
    var deleted_item = $(this)

    var deleteToDoPromise = $.ajax({url: "/todos/"  + deleted_item.siblings(".block").attr('data-id'), type:"DELETE"})


    deleteToDoPromise.success( function(deletedTodo) {
      console.log(deleted_item)
      deleted_item.parents('.to-do-item').remove();
      $flash.removeClass('green');
      $('#message').text("ToDoDeleted");
      $flash.addClass('red');
      $flash.toggle();
      $flash.fadeOut(1000);

      if ($('#completed-bucket').find('.to-do-item').size() == 0) {
        $('#complete-header').hide();
      }

    });


  })




// On click, you can complete a to-do-item, move it to a complete section and

    $('ul').on('click', '#button-item-complete', function () {
//  If the complete header is not displayed, show it.
    var $completeHeader = $('#complete-header');
    if ($completeHeader.css('display') == 'none')   {
      $completeHeader.toggle();
    }
    $('#complete-message').text("ToDoCompleted")
    var $flashComplete = $('#flash-complete');
      $flashComplete.toggle();
    $flashComplete.fadeOut(1000);

      var putToDoPromise = $.ajax({url: "/todos/" + $(this).siblings(".block").attr('data-id'), type:"PUT"})

      var $this = $(this)


      putToDoPromise.success( function() {

        $('#completed-bucket').append($this.parents('.to-do-item'))
        $(this).hide()

      });





    })

    $('#flash-complete').on('click', '.button-x', function() {
      $(this).parents('#flash-complete').hide()

    })








});
