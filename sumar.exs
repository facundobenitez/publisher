defmodule SumarArray do
 def sum(list), do: _sum(list, 0)
 defp _sum([], total), do: total
 defp _sum([head | tail], total), do: _sum(tail, head+total)
end
IO.puts "TOTAL #{SumarArray.sum([1,2,3])}"
