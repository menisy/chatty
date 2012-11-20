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
  if($(".main").length > 0){
    $(".main").append('<b>'+name+': </b>'+message+'<br>');
  }
}
function scrollDown(){

  $(".chat").animate({ scrollTop: $(".chat-main")[0].scrollHeight }, "fast");
  //$(".see").append("  " + $("body")[0].scrollHeight);
}
function buzzOnline(name,id){
  $(".notify").html(name+' just came online!');
  $(".notify").addClass("green").slideDown("slow").delay(3000).slideUp("slow");

  $(".users").append('<div class="user" id="'+id+'">'+name+'</div>');
  var r=Math.floor((Math.random()*190)+100);
    var g=Math.floor((Math.random()*190)+100);
    var b=Math.floor((Math.random()*190)+100);
    var br = r-20;
    var bg = g-20;
    var bb = b-20;
    $("#"+id).css("background-color","rgb("+r+","+g+","+b+")");
    $("#"+id).css("border","1px solid rgb("+br+","+bg+","+bb+")");
}
function buzzOffline(name,id){
  $(".notify").html(name+' just went offline!');
  $(".notify").removeClass("green").slideDown("slow").delay(3000).slideUp("slow");
  $("#"+id).remove();
}

function subs(room){
            var client = new Faye.Client('http://nodey-server.herokuapp.com/faye');
            client.setHeader('Access-Control-Allow-Origin', '*');
            client.connect();
            Faye.Transport.WebSocket.isUsable = function(_,c) { c(false) }
            client.subscribe( room , function(data) {
            eval(data);
            });
          }