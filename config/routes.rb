Rails.application.routes.draw do
  devise_for :users,
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  get '/user-member-data', to: 'user_members#show'
  namespace :api do
    namespace :v1 do
      resources :events do
        resources :groups do
          resources :members
          resources :pairs
        end
      end
      resources :wishlists do
        resources :wishes
      end
      resources :gifts
      get '/own-wishlist', to: 'wishlists#show_own'
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
end
