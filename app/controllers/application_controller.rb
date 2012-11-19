class ApplicationController < ActionController::Base
  protect_from_forgery

  def ensure_login
    if session[:user_id].nil?
      redirect_to chats_start_path
    end
  end

  def broadcast(channel, &block)
    message = {:channel => channel, :data => capture(&block), :ext => {:auth_token => FAYE_TOKEN}}
    uri = URI.parse("http://nodey-server.herokuapp.com/faye")
    Net::HTTP.post_form(uri, :message => message.to_json)
  end
end
