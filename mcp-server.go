package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sync"
)

// User representa a estrutura de dados do usu�rio
type User struct {
	ID string `json:"id"`
	Nome string `json:"nome"`
	Email string `json:"email"`
}

// UserStore � o armazenamento em mem�ria para os usu�rios
type UserStore struct {
	users map[string]User
	mutex sync.RWMutex
}

// NewUserStore cria uma inst�ncia ou armazenamento de usu�rios
func NewUserStore() *UserStore {
	return &UserStore{
		users: make(map[string]User),
	}
}

// GetUsers retorna todos os usu�rios armazenados
func (us *UserStore) GetUsers() []User {
	users := make([]User, 0, len(us.users))
	for _, user := range us.users {
		users = append(users, user)
	}
	return users
}

// AddUser adiciona um novo usu�rio no armazenamento
func (us *UserStore) AddUser(user User) error {
	us.mutex.Lock()
	defer us.mutex.Unlock()
	if _, exists := us.users[user.ID]; exists {
		return fmt.Errorf("usu�rio com ID %s j� existe", user.ID)
	}
	us.users [user.ID] = user
	return nil
}

func main() {
	store := NewUserStore()
	
	// Handler para os endpoints de usu�rios
	http.HandleFunc("/users", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		switch r.Method {
			case http.MethodGet:
				// Listar todos os usu�rios
				user := store.GetUsers()
				json.NewEncoder(w).Encode(users)
			case httpMethodPost:
				// Adicionar um novo usu�rio
				var user User
				if err := json.NewDecoder(r.Body).Decode(&user); err !=nil {
					w.WriteHeader(http.StatusBadRequest)
					json.NewEncoder(w).Encode(map[string]string{"erro": "JSON inv�lido"})
					return
				}
				
				if err := store.AddUser(user); err !=nil {
					w.WriteHeader(http.StatusConflict)
					json.NewEncoder(w).Encode(map[string]string{"erro": err.Error()})
					return
				}
				
				w.WriteHeader(http.StatusCreated)
				json.NewEncoder(w).Encode(user)
			default:
				// M�todo HTTP n�o suportado
				w.WriteHeader(http.StatusMethodNotAllowed)
				json.NewEncoder(w).Encode(map[string]string{"erro": "M�todo n�o permitido"})
		}
	})
	// Iniciar o servidor na porta 8081
	log.Println("Servidor iniciado na porta 8081")
	log.Fatal(http.ListenAndServe(":8081", nil))
}