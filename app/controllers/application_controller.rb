class ApplicationController < ActionController::Base
  protect_from_forgery

  def ensure_login
    if session[:user_id].nil?
      redirect_to chats_start_path
    end
  end
end
