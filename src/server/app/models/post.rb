class Post < ActiveRecord::Base
  has_many :tasks, :dependent => :delete_all
  has_attached_file :image, styles: { small: "64x64",
                                      med: "100x100",
                                      large: "200x200" }

  validates_attachment_content_type :image,
    :content_type => /^image\/(png|gif|jpeg|jpg)/

  def small_image_url
    image.url(:small)
  end
  def med_image_url
    image.url(:med)
  end
  def large_image_url
    image.url(:large)
  end
end
