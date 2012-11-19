class Chat
  include Mongoid::Document
  field :name, type: String

  has_many :users, inverse_of: 'chat', class_name: 'User'
end
