class CommentsController < ApplicationController

  def index
    comments = Comment.all
    render json: comments
  end

  def create
    comment = Comment.create(content: params[:content], user_id: params[:user_id], activity_id: params[:activity_id])
    render json: comment
  end

  def destroy
    comment = Comment.find(params['id'])
    comment.destroy
    render json: { message: 'success' }
  end

end
