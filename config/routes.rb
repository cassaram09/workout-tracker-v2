Rails.application.routes.draw do
  
  scope '/api/v1' do
    resources :workouts
    resources :exercises
    resources :users, except: [:new, :edit]
    get '/current-user' => 'users#get_current_user'
  end

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'
  post '/signup' => 'users#create'

end
