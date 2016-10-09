class Task < ActiveRecord::Base
  enum week_day: [:monday, :tuesday, :wednesday,
                  :thursday, :friday, :saturday, :sunday]
  enum frecuency: [:hours, :minutes, :seconds]
  belongs_to :post

  def time
    self[:time].to_s.match(/\s([^\:]*\:[^\:]*)/).to_s
  end
end
