Rails.application.routes.draw do
  get 'session/index', as: 'session'
  post "session/index"            => "session#create"

  get 'welcome/index'

  root 'welcome#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  mount Blazer::Engine, at: "blazer"

end
