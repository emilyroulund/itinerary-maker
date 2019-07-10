class UsersController < ApplicationController

  def login
    user = User.find_or_create_by(username: params[:username])
    render json: user
  end

  def index
    users = User.all
    render json: users, include: [:activities]
  end

  def create

  end

  def update
  end

  def destroy
  end

end
