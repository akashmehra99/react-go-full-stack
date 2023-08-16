package repository

import (
	"backend/internal/models"
	"database/sql"
)

type DatabaseRepo interface {
	Connection() *sql.DB
	GetUserByEmail(email string) (*models.User, error)
	AllMovies() ([]*models.Movie, error)
	GetUserByID(id int) (*models.User, error)
}
