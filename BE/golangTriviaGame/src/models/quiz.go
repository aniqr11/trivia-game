package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Quiz struct {
	ID       primitive.ObjectID `bson:"_id"`
	Question string             `bson:"Question"`
	Answer   string             `bson:"Answer"`
	Options  []string           `bson:"Options"`
}
