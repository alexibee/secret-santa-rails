require 'rails_helper'

RSpec.describe 'Api::V1::EventsController', type: :request do

  describe 'GET /api/v1/events' do
    before do
      user1 = FactoryBot.create(:user)
      user2 = FactoryBot.create(:user)
      user3 = FactoryBot.create(:user)
      user4 = FactoryBot.create(:user)
      user5 = FactoryBot.create(:user)
      @event1 = FactoryBot.create(:event, organiser_id: user1.id)
      event2 = FactoryBot.create(:event, organiser_id: user1.id)
      @event3 = FactoryBot.create(:event, organiser_id: user4.id)
      group1 = FactoryBot.create(:group, event_id: @event1.id)
      group2 = FactoryBot.create(:group, event_id: event2.id)
      member1 = FactoryBot.create(:member, user_id: user1.id, group_id: group1.id)

      member2 = FactoryBot.create(:member, user_id: user1.id, group_id: group2.id)

      member3 = FactoryBot.create(:member, user_id: user2.id, group_id: group1.id)
      member4 = FactoryBot.create(:member, user_id: user3.id, group_id: group1.id)
      member5 = FactoryBot.create(:member, user_id: user4.id, group_id: group1.id)
      member6 = FactoryBot.create(:member, user_id: user5.id, group_id: group1.id)
      pair1 = FactoryBot.create(:pair, receiver_id: member1.id, giver_id: member3.id, group_id: group1.id)
      @pair2 = FactoryBot.create(:pair, receiver_id: member3.id, giver_id: member1.id, group_id: group1.id)
      pair3 = FactoryBot.create(:pair, receiver_id: member4.id, giver_id: member5.id, group_id: group1.id)
      pair4 = FactoryBot.create(:pair, receiver_id: member5.id, giver_id: member6.id, group_id: group1.id)
      pair5 = FactoryBot.create(:pair, receiver_id: member6.id, giver_id: member4.id, group_id: group1.id)

      allow_any_instance_of(Api::V1::EventsController).to receive(:current_user) { user1 }
    end

    it 'works!' do
      get api_v1_events_path
      expect(response).to have_http_status(200)
    end

    it 'responds with correct number of organised events' do
      get api_v1_events_path
      events = JSON.parse(response.body)['org_events']
      expect(events.count).to eq(2)
    end

    it 'responds with correct number of participated events' do
      get api_v1_events_path
      events = JSON.parse(response.body)['part_events']
      expect(events.count).to eq(2)
    end

    it 'returns correct event' do
      get api_v1_event_path(@event1.id)
      body = response.parsed_body
      event = body['event']
      expect(event['title']).to eq(@event1.title)
    end

    it 'returns correct receiver' do
      get api_v1_event_path(@event1.id)
      body = response.parsed_body
      receiver = body['receiver_data']['receiver']
      expect(receiver['id']).to eq(@pair2.receiver_id)
    end

    it 'unauthorised when accessing event not a part of' do
      get api_v1_event_path(@event3.id)
      expect(response).to have_http_status(401)
    end
  end
end
