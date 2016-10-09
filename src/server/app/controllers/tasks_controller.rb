require 'task_manager'
require 'pry-byebug'
class TasksController < ApplicationController
  before_action :set_task, only: [:show, :update, :destroy]

  # GET /tasks
  # GET /tasks.json
  def index
    @tasks = Task.all

    render json: @tasks
  end

  # GET /tasks/1
  # GET /tasks/1.json
  def show
    render json: @task
  end

  # POST /tasks
  # POST /tasks.json
  def create
    @task = Task.new(task_params)

    if @task.save
      render json: @task, status: :created, location: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tasks/1
  # PATCH/PUT /tasks/1.json
  def update
    @task = Task.find(params[:id])

    if @task.update(task_params)
      TaskManager.update_cron_tasks
      head :no_content
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tasks/1
  # DELETE /tasks/1.json
  def destroy
    @task.destroy
    TaskManager.update_cron_tasks
    head :no_content
  end

# CUSTOM METHODS
  def create_tasks
    begin
      posts = params[:posts]
      groups = params[:groups]
      #date_times = params[:date_times]
      frecuency_value = params[:frecuency_value]
      posts.each do |post_id|
        groups.each do |group_id|
          Task.create(
            post_id: post_id,
            group_id: group_id,
            frecuency_value: frecuency_value
          )
        end
      end
      TaskManager.update_cron_tasks
      render json: {}, status: :ok
    rescue => e
      render json: {error: e.message}, status: :ok
    end
  end

  private

    def set_task
      @task = Task.find(params[:id])
    end

    def task_params
      params[:task]
    end
end
