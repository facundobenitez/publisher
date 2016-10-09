require 'pry-byebug'
class Facebook

  def self.publish(post_id, groups)
    begin
      Koala.config.api_version = "v2.0"
      binding.pry
      page_id = '1084851288260830'
      user_graph = Koala::Facebook::API.new(self.oauth_access_token)
      page_token = user_graph.get_page_access_token(page_id)
      page_graph = Koala::Facebook::API.new(page_token)
      group_ids = groups.split(',')
      post = Post.find_by(id: post_id)
      message = post.body
      image_path = post.image.path(:large)
      image_content_type = post[:image_content_type]
      puts "PUBLISHING GROUP_ID #{group_ids}"
      puts "PUBLISHING POST #{message}"
      group_ids.each do |group_id|
        page_graph.put_picture(
          image_path,
          image_content_type,
          {:message => message},
          group_id
        )
      end
    rescue => error
      puts error.message
    end
  end
 # def self.publish(post_id, groups)
 #   begin
 #     group_ids = groups.split(',')
 #     post = Post.find_by(id: post_id)
 #     message = post.body
 #     image_path = post.image.path(:large)
 #     image_content_type = post[:image_content_type]
 #     puts "PUBLISHING GROUP_ID #{group_ids}"
 #     puts "PUBLISHING POST #{message}"
 #     graph = Koala::Facebook::API.new(self.oauth_access_token)
 #     group_ids.each do |group_id|
 #       graph.put_picture(
 #         image_path,
 #         image_content_type,
 #         {:message => message},
 #         group_id
 #       )
 #     end
 #   rescue => error
 #     puts error.message
 #   end
 # end
  def self.groups(group_filtering_words)
    graph = Koala::Facebook::API.new(self.oauth_access_token)
    groups = graph.get_connections("me", "groups")
    unless group_filtering_words.nil?
      groups = groups.select do |group|
        group_filtering_words.any? do |word|
          group["name"].downcase.include? word
        end
      end
    end
    groups
  end
  def self.facebook_app_id
    return Rails.application.secrets.facebook_app_id
  end
  def self.facebook_app_secret
    return Rails.application.secrets.facebook_app_secret
  end
  def self.oauth_access_token
    return Rails.application.secrets.oauth_access_token
  end
end
