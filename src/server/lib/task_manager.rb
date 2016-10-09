class TaskManager
  def self.update_cron_tasks
    new_crons = ""   
    tasks = Task.all
    new_crons = ""
    tasks.each do |task|
      task.frecuency_type = 'hours'
      new_cron = <<-SCHEDULE
every #{task.frecuency_value}.minutes do
  rake "publisher:publish[#{task.post_id},'#{task.group_id}']"
end
        SCHEDULE
      new_crons += new_cron
    end
    puts "-" * 100
    puts "UPDATED CRON TASKS:"
    puts "#{new_crons}"
    puts "-" * 100
    File.open('config/schedule.rb', 'w') do |f|  
      f.puts new_crons
    end  
    `whenever --update-crontab`
  end
end
