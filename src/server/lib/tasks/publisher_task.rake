require 'facebook'
require 'task_manager'
namespace :publisher do
  desc "Publish Post"
  task :publish, [:post_id,:groups] => :environment do |t, args|
    Facebook.publish args[:post_id], args[:groups]
  end
  task :update_cron_tasks => :environment do
    TaskManager.update_cron_tasks
  end
end
