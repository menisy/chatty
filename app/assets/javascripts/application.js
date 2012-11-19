// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

function appendWeb(message,name){
  if($(".chat-main").length > 0){
    $(".chat-main").append('<b>'+name+': </b>'+message+'<br>');
  }
}
function scrollDown(){

  $(".chat-main").animate({ scrollTop: $(".chat-main")[0].scrollHeight }, "fast");
  //$(".see").append("  " + $("body")[0].scrollHeight);
}
function buzzOnline(name,id){
  $(".notify").html(name+' just came online!');
  $(".notify").fadeIn("slow").delay(3000).fadeOut("slow");
  $(".users").append('<span id="'+id+'">'+name+'</span>');
}
function buzzOffline(name,id){
  $(".notify").html(name+' just went offline!');
  $(".notify").fadeIn("slow").delay(3000).fadeOut("slow");
  $("#"+id).remove();
}