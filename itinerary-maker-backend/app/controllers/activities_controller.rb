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
    activity = Activity.create(name: params[:name], date: params[:date], times: params[:times], link: params[:link], image: params[:image], itinerary_id: params[:itinerary_id], user_id: params[:user_id])
    render json: activity
  end

  def destroy
    activity = Activity.find(params[:id])
    activity.destroy

    render json: { message: 'success' }
  end

end
