require 'spec_helper'
require 'rails_helper'

RSpec.describe PublisherController, type: :controller do
  before :all do

  end

  context "When the user want to get groups" do
    it "should return groups" do
      begin
        binding.pry
        response = get :groups, {group_filtering_words: ['test_group']}
        expect(response.body).to include('test_group')
      rescue => e
        puts "Test failed #{e}"
      end
    end
  end
end
