class User
  include Mongoid::Document
  field :name, type: String
  field :gender, type: Boolean
  field :ln,   type: String
  belongs_to :chat

  before_create :save_down

  def save_down
    self.ln = self.name.downcase
  end
end
