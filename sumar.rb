def sumar(nums, index)
  total =0
  if index == nums.length - 1
    total += nums[index]
  else
    total = nums[index] +  sumar(nums, index + 1)
  end
  total
end
puts "TOTAL #{sumar([1,2,3], 0)}"
