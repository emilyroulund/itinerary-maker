class ActivitiesController < ApplicationController

  def index
    activities = Activity.all
    render json: activities
  end

  def show
    activity = Activity.find_by(id: params[:id])
    render json: activity, include: [:comments]
  end

  def create
    activity = Activity.create(name: params[:name], date: params[:date], time: params[:time])
    render json: activity
  end

  def destroy
    activity = Activity.find(params['id'])
    activity.destroy
    render json: { message: 'success' }
  end

end
