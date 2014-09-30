package main

import (
	"strings"
	"path/filepath"
	"net/http"
	"io/ioutil"
	"encoding/json"
	"html/template"
)

const path string = "./json/"

// A single recipe
type Recipe struct {
	Id string `json: "id"`
	Name string `json: "name"`
	Description string `json: "description"`
	Method string `json: "method"`
	Variations string `json: "variations"`
	Ingredients []struct {
		Parts string `json: "parts"`
		Amount string `json: "amount"`
		AmountUnits string `json: "amountUnits"`
		IngredientName string `json: "ingredientName"`
	} `json: "ingredients"`
	Glass string `json: "glass"`
	Garnish string `json: "garnish"`
}

// A Page skeleton
type Page struct {
	Title	string
	Body	string
}

// Remove extension, if any, from a path, returning just basename of the file
func removeExt(path string) string {
	basename := filepath.Base(path)
	return strings.TrimSuffix(basename, filepath.Ext(basename))
}

// Get a recipe from the JSON data
func GetRecipe(id string) (*Recipe, error) {
	var recipe *Recipe
	f, err := ioutil.ReadFile(path + id)
	if err != nil {
		return recipe, err
	}

	unmarshal_err := json.Unmarshal(f, &recipe)
	if unmarshal_err != nil {
		return recipe, unmarshal_err
	}

	return recipe, unmarshal_err
}

// Load the recipe into a Page struct
func loadPage(title, body string) *Page {
	return &Page{Title: title, Body: body}
}

// Serve homepage
func homeHandler(w http.ResponseWriter, r *http.Request) {
	var p Page
	p.Title = "Homepage"
	p.Body = "/"
	t, err := template.ParseFiles("index.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	err = t.Execute(w, p)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

// Serve specific recipe page
func recipeHandler(w http.ResponseWriter, r *http.Request) {
	title := r.URL.Path[len("/id/"):]
	rec, err := GetRecipe(title + ".json")
	if err != nil {
		rec = &Recipe{Name: "Not found"}
	}
	t, err := template.ParseFiles("recipe.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	err = t.Execute(w, rec)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}

func main() {
	http.HandleFunc("/", homeHandler)
	http.HandleFunc("/id/", recipeHandler)
	http.ListenAndServe(":8080", nil)
}

