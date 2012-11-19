module ApplicationHelper

  def broadcast(channel, &block)
    message = {:channel => channel, :data => capture(&block), :ext => {:auth_token => FAYE_TOKEN}}
    uri = URI.parse("http://nodey-server.herokuapp.com/faye")
    Net::HTTP.post_form(uri, :message => message.to_json)
  end

  def subscribe(room)
    raw "<script type=\"text/javascript\">
          $( function(){
            var client = new Faye.Client('http://nodey-server.herokuapp.com/faye');
            client.setHeader('Access-Control-Allow-Origin', '*');
            client.connect();
            Faye.Transport.WebSocket.isUsable = function(_,c) { c(false) }
            client.subscribe(\""+room+"\", function(data) {
            eval(data);
            });
          });
      </script>"
  end

  def pre
    raw "<script type=\"text/javascript\">
        $(document).ready(function(){
          $('#new_msg').keypress(function(event){
              if(event.keyCode == 13){
                $('#send_msg').click();
              }
            });
          $(\".chat-main\").scrollTop($(\".chat-main\")[0].scrollHeight);
          $(\"#send_msg\").click(function(){
            var cont = $(\"#new_msg\").val();
            if(cont.length == 0)
              return false;
          var name = '#{@user.name}';
            $.ajax({
              url:'#{ chats_send_msg_path }',
              type:'POST',
              datatype:'json',
              traditional:true,
              data:{
                content: cont,
                name: name  
              },
              timeout: 20000,
            });
          });
        });
      </script>"
  end
end
