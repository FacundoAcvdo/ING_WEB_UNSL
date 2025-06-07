package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/golang-jwt/jwt/v5"
	"github.com/jackc/pgx/v5"
)

var jwtKey []byte

type Credentials struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func enableCORS(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
}

func JWTValidate(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		enableCORS(w)

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
		}

		header := r.Header.Get("Authorization")

		if header == "" {
			http.Error(w, "No hay token", http.StatusUnauthorized)
			return
		}

		partes := strings.Split(header, " ")
		if len(partes) != 2 || partes[0] != "Bearer" {
			http.Error(w, "Formato incorrecto", http.StatusUnauthorized)
			return
		}

		tokenStr := partes[1]

		token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
			return jwtKey, nil
		})

		if err != nil || !token.Valid {
			http.Error(w, "Token invalido", http.StatusUnauthorized)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func handleLogin(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)

	if r.Method == "OPTIONS" {
		return
	}

	if r.Method != "POST" {
		http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
		return
	}

	var creds Credentials
	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		http.Error(w, "Datos inválidos", http.StatusBadRequest)
		return
	}

	conn, err := pgx.Connect(context.Background(), os.Getenv("DB_URL"))
	if err != nil {
		log.Fatalf("No se pudo conectar a la base de datos: %v\n", err)
	}
	defer conn.Close(context.Background())

	rows, err := conn.Query(context.Background(), "SELECT * FROM USUARIO WHERE nombreUsuario='"+creds.Username+"' AND Password='"+creds.Password+"'")

	if err != nil {
		fmt.Println(err)
		fmt.Println(creds.Username, creds.Password)
	}

	if !rows.Next() {
		http.Error(w, "Credenciales inválidas", http.StatusUnauthorized)
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": creds.Username,
	})

	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		http.Error(w, "No se pudo generar el token", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"token": tokenString})
}

func main() {
	jwtKey = []byte(os.Getenv("JWT_KEY"))

	http.HandleFunc("/login", handleLogin)
	http.Handle("/validate", JWTValidate(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})))
	http.ListenAndServe(":8080", nil)
}
