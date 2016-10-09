require 'koala'
require 'facebook'
require 'pry-byebug'
class PublisherController < ApplicationController

  def publish
    #TODO: Right now we are passing group name it should pass group id.
    post_id = params[:post_id]
    group_id = params[:group_id]
    Facebook.publish post_id, group_id
  end

  def groups
    group_filtering_words = params['group_filtering_words']
    groups = Facebook.groups group_filtering_words
    render json: groups.to_json, content_type: 'application/json', status: :ok
  end

  def set_access_token
    user_email = params[:email]
    oauth_access_token = params[:oauth_access_token]
    user = User.find_by(email: user_email)
    if user.nil?
      user = User.new(email: user_email, oauth_access_token: oauth_access_token)
      head :created, content_type: "text/html"
    else
      user.oauth_access_token = oauth_access_token
    end
    user.save!
  end

  def oauth_access_token
    return Rails.application.secrets.oauth_access_token
  end

  private
  def facebook_app_id
    return Rails.application.secrets.facebook_app_id
  end

  def facebook_app_secret
    return Rails.application.secrets.facebook_app_secret
  end
  def post_params
    params.require(:post).permit(:title, :body, :image)
  end
end
