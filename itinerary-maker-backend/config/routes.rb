Rails.application.routes.draw do
  resources :userplans
  resources :comments
  resources :activities
  resources :itineraries
  resources :users
  post 'users/login', to: 'users#login'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
