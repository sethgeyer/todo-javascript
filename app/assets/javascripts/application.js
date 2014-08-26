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

  var $body = $('body')
    $body.prepend("<h1 class='center' >Todoly</h1>");


  var sectionBreak = "<hr/>";
  var listSection =   "<h3 id='todos' class='col'>Todo!</h3>";
  var todoList = "<ul id='todo-list'></ul>";
  var toDoListSection = "<div id='header'>" + sectionBreak + listSection + "</div>";

  var xButton = "<div class='remove-button'>x</div>";
  var flash = "<div class='flash-text'>Todo Created</div>";
  var flashContainer = "<div class='col flash container'>" + flash + xButton + "</div>";

  var flashMessage = "Todo Created";
  var xButton = "<div class='remove-button'>x</div>";
  var flash = "<div class='flash-text'>" + flashMessage + "</div>";
  var flashContainer = "<div class='col flash container'>" + flash + xButton + "</div>";




  $body.append(toDoListSection);
  var $header = $('#header');
   $header.append(flashContainer);
   $header.append(todoList);

  $('form').on('submit', function(e) {
    e.preventDefault();


    var removeButton = "<div class='red remove-button'>x</div>";
    var todoItem = "<div class='item'>" + $('#todo-item').val() + "</div>";
    var itemContainer = "<div class='container'>" + todoItem + removeButton + "</div>";

    $('ul').append(itemContainer);

    if ($header.css('display') == 'none') {
      $header.toggle()
    }

    $flash = $('.flash')
    $flash.toggle();
    $flash.fadeOut(1000)

  });


  $body.on('click','.remove-button', function() {
    $(this).parents('.container').toggle()

    if ($(this).siblings('.item')) {
//      $flash.toggle()
//      $flash.fadeOut(1000)
//the above currently flashes green
    }

  })




});
