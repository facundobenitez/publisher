class PostsController < ApplicationController
  before_action :set_post, only: [:show, :update, :destroy]

  # GET /posts
  # GET /posts.json
  def index
    @posts = Post.all
      render json: @posts, methods: [:small_image_url,
                                    :med_image_url,
                                    :large_image_url],
                                    status: :created
  end

  # GET /posts/1
  # GET /posts/1.json
  def show
    render json: @post, methods: [:small_image_url,
                                    :med_image_url,
                                    :large_image_url],
                                    status: :ok
  end

  # POST /posts
  # POST /posts.json
  def create
    @post = Post.new(post_params)

    if @post.save
      render json: @post, methods: [:small_image_url,
                                    :med_image_url,
                                    :large_image_url],
                                    status: :created
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  # PATCH/PUT /posts/1.json
  def update
    @post = Post.find(params[:id])
    if @post.update(post_params)
      render json: @post, methods: [:small_image_url,
                                    :med_image_url,
                                    :large_image_url],
                                    status: :created
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  # DELETE /posts/1.json
  def destroy
    @post.destroy

    head :no_content
  end

  private

    def set_post
      @post = Post.find(params[:id])
    end

    def post_params
      params.require(:post).permit(:title, :body, :image)
    end
end
