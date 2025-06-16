package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/golang-jwt/jwt/v5"
	"github.com/jackc/pgx/v5"
)

var jwtKey []byte

type Credentials struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type UserMovie struct {
	Username string `json:"username"`
	Id       int    `json:"movieId"`
}

type User struct {
	Username string `json:"username"`
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

func handleAdd(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)

	var creds UserMovie
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

	_, e := conn.Exec(
		context.Background(),
		"INSERT INTO FAVORITOS (nombreusuario, idpelicula) VALUES ($1, $2)",
		creds.Username,
		creds.Id,
	)

	if e != nil {
		log.Fatalf("No se pudo insertar en la base de datos: %\n", e)
	}

}

func handleFavoritos(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)

	var lista = make(map[int]any)

	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Datos inválidos", http.StatusBadRequest)
		return
	}

	conn, err := pgx.Connect(context.Background(), os.Getenv("DB_URL"))
	if err != nil {
		log.Fatalf("No se pudo conectar a la base de datos: %v\n", err)
	}
	defer conn.Close(context.Background())

	res, e := conn.Query(context.Background(), "SELECT idpelicula FROM FAVORITOS where nombreusuario='"+user.Username+"'")

	if e != nil {
		log.Fatalf("Error en la consulta: %v\n", e)
	}

	i := 0
	for res.Next() {
		id, _ := res.Values()
		lista[i] = id[0]
		i = i + 1
	}

	fmt.Println(lista)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(lista)
}

func handleRemove(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)
	var creds UserMovie
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
	_, e := conn.Exec(
		context.Background(),
		"DELETE FROM FAVORITOS WHERE nombreusuario = $1 AND idpelicula = $2",
		creds.Username,
		creds.Id,
	)
	if e != nil {
		log.Fatalf("No se pudo remover de la base de datos: %\n", e)
	}
}
func handleCheckFav(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)
	var data UserMovie
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil {
		http.Error(w, "Datos inválidos", http.StatusBadRequest)
		return
	}
	conn, err := pgx.Connect(context.Background(), os.Getenv("DB_URL"))
	if err != nil {
		log.Fatalf("No se pudo conectar a la base de datos: %v\n", err)
	}
	defer conn.Close(context.Background())
	res, e := conn.Query(context.Background(), "SELECT * FROM FAVORITOS where nombreusuario='"+data.Username+"' AND idpelicula='"+strconv.Itoa(data.Id)+"'")
	if e != nil {
		log.Fatalf("Error en la consulta: %v\n", e)
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]bool{"favorito": res.Next()})
}

func main() {
	jwtKey = []byte(os.Getenv("JWT_KEY"))

	http.HandleFunc("/login", handleLogin)
	http.HandleFunc("/add", handleAdd)
	http.HandleFunc("/favoritos", handleFavoritos)
	http.HandleFunc("/remove", handleRemove)
	http.HandleFunc("/checkfav", handleCheckFav)
	http.Handle("/validate", JWTValidate(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
	})))
	http.ListenAndServe(":8080", nil)
}
