class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :age, :weight, :height, :gender, :body_fat, :bmr, :smoker, :drinker, :vegetarian, :avatar
end
