Rails.application.routes.draw do
  devise_for :users,
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  get '/user-member-data', to: 'user_members#show'
  namespace :api do
    namespace :v1 do
      resources :home, only: [:index]
      resources :events do
        resources :groups do
          resources :members
          resources :pairs
        end
      end
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "home#index"
end
