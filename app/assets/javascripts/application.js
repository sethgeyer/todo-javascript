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
    var todoItemContainer = "<div class='to-do-item'>" + "<div class='block'>" + itemText + "</div>" + "<div class='block-right' id='button-item-x'>x</div>" + "<div class='block-right' id='button-item-complete'>o</div>" + "</div>";
    $('#to-do-bucket').append(todoItemContainer);

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

// On click, you can delete a to-do-item and flash a red flash
  $('ul').on('click', '#button-item-x', function () {
    $(this).parents('.to-do-item').remove()
    $flash.removeClass('green')
    $('#message').text("ToDoDeleted")
    $flash.addClass('red')
    $flash.toggle()
    $flash.fadeOut(1000)

    if ($('#completed-bucket').find('.to-do-item').size() == 0) {
      $('#complete-header').hide();
    }


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

      $('#completed-bucket').append($(this).parents('.to-do-item'))
      $(this).hide()



    })

    $('#flash-complete').on('click', '.button-x', function() {
      $(this).parents('#flash-complete').hide()

    })







  });
});
