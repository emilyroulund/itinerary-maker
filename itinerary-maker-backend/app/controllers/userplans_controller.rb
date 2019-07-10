class UserplansController < ApplicationController

  def index
    userplans = Userplan.all
    render json: userplans
  end
  
end
