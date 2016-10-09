require 'rails_helper'

RSpec.describe TasksController, type: :controller do
  before :all do

  end

  context "When the client call to create task" do
    it "should create the tasks" do
      posts = [
        {
          title: 'Pretty dress',
          body: 'A really pretty dress',
          image: ''
        },
        {
          title: 'Pretty dress',
          body: 'A really pretty dress',
          image: ''
        }
      ]

      posts.each do |post|
        Post.create(post)
      end

      groups = ['test_group']
      date_times = [
          {
            week_day: 'monday',
            time: '20:30'
          },
          {
            week_day: 'tuesday',
            time: '20:30'
          }
        ]

      tasks = {
        posts:[1,2],
        groups: groups,
        date_times: date_times
      }

      #"{"posts":[],"groups":[],"date_times":[{"week_day":"Monday","time":"14:30"},{"week_day":"Tuesday","time":"14:40"}]}"

      post :create_tasks, tasks
      tasks_count = posts.count * groups.count * date_times.count
      expect(Task.count).to eql(tasks_count)
    end
  end
end
