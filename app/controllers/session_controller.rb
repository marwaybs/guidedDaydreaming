class SessionController < ApplicationController
  def index
  end

  def create
    @session = Session.new(session_params)
    @session.save
    # redirect_to @article
  end

  private

    def session_params
      params.require(:session).permit(:comment, :rating)
    end
end
