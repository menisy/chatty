class ChatsController < ApplicationController
  before_filter :ensure_login, except: [:start,:login]
  def login
    name = params[:name]
    @user = Chat.first.users.find_by(ln: name.downcase)
    if @user
      render text: "exists"
      return
    else
      @user = User.new
      @user.name = name
      @user.chat = Chat.first
      @user.gender = params[:gender]
      @user.save!
    end
    session[:user_id] = @user.id
    render "login.js"
  end

  def show
    @users = Chat.first.users
    @user = User.find(session[:user_id])
  end

  def disconnect_user
    user = User.find(session[:user_id])
    Chat.first.users = Chat.first.users - [user]
    session[:user_id] = nil
    redirect_to chats_start_path
  end

  def send_msg
    @name = params[:name]
    @content = params[:content]
  end

  def start
    if session[:user_id]
      redirect_to chats_show_path
    end
  end
end