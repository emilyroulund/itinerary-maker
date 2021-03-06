class ItinerariesController < ApplicationController

  def index
    itineraries = Itinerary.all
    render json: itineraries, include: [:users, :activities]
  end

  def show
    itinerary = Itinerary.find_by(id: params[:id])
    render json: itinerary, include: [:users, :activities]
  end

  def create
    puts params
    # grab the user thats coming in from param
    itinerary = Itinerary.create(location: params[:location], date: params[:date])
    userplan = Userplan.create(user_id: params[:user], itinerary_id: itinerary.id)
    # create userplans using the user and the itenerary

    render json: itinerary
  end

  def update
  end

  def destroy
    itinerary = Itinerary.find(params['id'])
    itinerary.destroy
    render json: { message: 'success' }
  end

end
