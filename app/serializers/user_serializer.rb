class UserSerializer < ActiveModel::Serializer
  attributes :name, :email, :age, :weight, :height, :gender, :body_fat, :bmr, :smoker, :drinker, :vegetarian, :avatar
end
