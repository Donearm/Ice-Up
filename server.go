package main

import (
	"encoding/json"
	"html/template"
	"io/ioutil"
	"net/http"
	"path/filepath"
	"strings"
)

// Path of cocktail's recipes
const path string = "./data/"

// Initialize all templates at start
var templates = template.Must(template.ParseFiles("tmpl/index.html", "tmpl/recipe.html"))

// A single recipe
type Recipe struct {
	Title		string
	Id          string `json: "id"`
	Name        string `json: "name"`
	Description string `json: "description"`
	Method      string `json: "method"`
	Variations  string `json: "variations"`
	Ingredients []struct {
		Parts          string `json: "parts"`
		Amount         string `json: "amount"`
		AmountUnits    string `json: "amountUnits"`
		IngredientName string `json: "ingredientName"`
	} `json: "ingredients"`
	Glass   string `json: "glass"`
	Garnish string `json: "garnish"`
}

// A Page skeleton
type Page struct {
	Title string
	Body  string
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
	name := r.FormValue("query")
	if name != "" {
		rec, rec_err := GetRecipe(name + ".json")
		if rec_err != nil {
			rec = &Recipe{Name: "Not found"}
		}
		p.Title = "Ice Up! - " + rec.Name + " recipe"
		p.Body = "You searched for " + name
		err := templates.ExecuteTemplate(w, "index.html", p)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	} else {
		p.Title = "Ice Up! - Homepage"
		p.Body = "A quick and easy way to look up cocktail recipes"
		err := templates.ExecuteTemplate(w, "index.html", p)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}

// Serve specific recipe page
func recipeHandler(w http.ResponseWriter, r *http.Request) {
	title := r.URL.Path[len("/id/"):]
	rec, err := GetRecipe(title + ".json")
	if err != nil {
		rec = &Recipe{Name: "Not found"}
	}
	rec.Title = "Ice Up! - " + rec.Name + " recipe"
	t_err := templates.ExecuteTemplate(w, "recipe.html", rec)
	if t_err != nil {
		http.Error(w, t_err.Error(), http.StatusInternalServerError)
		return
	}
}

func main() {
	http.HandleFunc("/", homeHandler)
	http.HandleFunc("/id/", recipeHandler)
	// Serve css and other static files
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./static/"))))
	http.ListenAndServe(":8080", nil)
}
