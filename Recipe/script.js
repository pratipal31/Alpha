// DOM Elements
const recipeList = document.getElementById('recipeList');
const welcomeView = document.getElementById('welcomeView');
const recipeView = document.getElementById('recipeView');
const recipeForm = document.getElementById('recipeForm');
const formTitle = document.getElementById('formTitle');
const addEditRecipeForm = document.getElementById('addEditRecipeForm');
const searchInput = document.getElementById('searchInput');
const addNewBtn = document.getElementById('addNewBtn');
const welcomeAddBtn = document.getElementById('welcomeAddBtn');
const cancelBtn = document.getElementById('cancelBtn');

// Recipe Manager Class
class RecipeManager {
    constructor() {
        this.recipes = this.loadRecipes();
        this.currentRecipeId = null;
        this.init();
    }

    // Initialize the application
    init() {
        this.renderRecipeList();
        this.setupEventListeners();
        this.checkIfEmpty();
    }

    // Load recipes from localStorage
    loadRecipes() {
        const savedRecipes = localStorage.getItem('recipes');
        return savedRecipes ? JSON.parse(savedRecipes) : [];
    }

    // Save recipes to localStorage
    saveRecipes() {
        localStorage.setItem('recipes', JSON.stringify(this.recipes));
    }

    // Generate a unique ID for new recipes
    generateId() {
        return Date.now().toString();
    }

    // Check if recipe list is empty and show welcome view if it is
    checkIfEmpty() {
        if (this.recipes.length === 0) {
            welcomeView.classList.remove('hidden');
            recipeView.classList.add('hidden');
        } else {
            welcomeView.classList.add('hidden');
            // Show the first recipe if none is selected
            if (!this.currentRecipeId) {
                this.showRecipe(this.recipes[0].id);
            }
        }
    }

    // Add a new recipe
    addRecipe(recipeData) {
        const newRecipe = {
            id: this.generateId(),
            ...recipeData,
            createdAt: new Date().toISOString()
        };
        
        this.recipes.push(newRecipe);
        this.saveRecipes();
        this.renderRecipeList();
        this.showRecipe(newRecipe.id);
    }

    // Update an existing recipe
    updateRecipe(id, recipeData) {
        const index = this.recipes.findIndex(recipe => recipe.id === id);
        
        if (index !== -1) {
            this.recipes[index] = {
                ...this.recipes[index],
                ...recipeData,
                updatedAt: new Date().toISOString()
            };
            
            this.saveRecipes();
            this.renderRecipeList();
            this.showRecipe(id);
        }
    }

    // Delete a recipe
    deleteRecipe(id) {
        if (confirm('Are you sure you want to delete this recipe?')) {
            this.recipes = this.recipes.filter(recipe => recipe.id !== id);
            this.saveRecipes();
            this.renderRecipeList();
            
            if (this.recipes.length > 0) {
                this.showRecipe(this.recipes[0].id);
            } else {
                this.checkIfEmpty();
            }
        }
    }

    // Render the recipe list in the sidebar
    renderRecipeList(searchTerm = '') {
        recipeList.innerHTML = '';
        
        let filteredRecipes = this.recipes;
        
        // Filter recipes if search term is provided
        if (searchTerm) {
            searchTerm = searchTerm.toLowerCase();
            filteredRecipes = this.recipes.filter(recipe => 
                recipe.name.toLowerCase().includes(searchTerm) || 
                recipe.category.toLowerCase().includes(searchTerm)
            );
        }
        
        // Sort recipes by name
        filteredRecipes.sort((a, b) => a.name.localeCompare(b.name));
        
        filteredRecipes.forEach(recipe => {
            const recipeItem = document.createElement('div');
            recipeItem.className = `recipe-item ${recipe.id === this.currentRecipeId ? 'active' : ''}`;
            recipeItem.innerHTML = `
                <h3>${recipe.name}</h3>
                <p>${recipe.category} • ${recipe.prepTime + recipe.cookTime} mins</p>
            `;
            
            recipeItem.addEventListener('click', () => this.showRecipe(recipe.id));
            recipeList.appendChild(recipeItem);
        });
        
        // Display message if no recipes found
        if (filteredRecipes.length === 0 && searchTerm) {
            const noResults = document.createElement('div');
            noResults.className = 'recipe-item';
            noResults.innerHTML = `
                <p class="text-center">No recipes matching "${searchTerm}"</p>
            `;
            recipeList.appendChild(noResults);
        }
    }

    // Show recipe details
    showRecipe(id) {
        const recipe = this.recipes.find(r => r.id === id);
        
        if (!recipe) return;
        
        this.currentRecipeId = id;
        
        // Update active status in list
        const recipeItems = document.querySelectorAll('.recipe-item');
        recipeItems.forEach(item => {
            item.classList.remove('active');
            if (item.querySelector('h3')?.textContent === recipe.name) {
                item.classList.add('active');
            }
        });
        
        // Parse ingredients and instructions as lists
        const ingredientsList = recipe.ingredients.split('\n').filter(ing => ing.trim() !== '');
        const instructionsList = recipe.instructions.split('\n').filter(ins => ins.trim() !== '');
        
        // Calculate total time
        const totalTime = recipe.prepTime + recipe.cookTime;
        
        // Generate recipe view HTML
        recipeView.innerHTML = `
            <div class="recipe-header">
                <div class="recipe-title">
                    <h2>${recipe.name}</h2>
                    <span class="recipe-category">${recipe.category}</span>
                </div>
                <div class="recipe-actions">
                    <button class="secondary-btn" id="editRecipeBtn">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="danger-btn" id="deleteRecipeBtn">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
            
            <div class="recipe-meta">
                <div class="recipe-time">
                    <i class="fas fa-clock"></i> Prep: ${recipe.prepTime} mins
                </div>
                <div class="recipe-time">
                    <i class="fas fa-fire"></i> Cook: ${recipe.cookTime} mins
                </div>
                <div class="recipe-time">
                    <i class="fas fa-hourglass-half"></i> Total: ${totalTime} mins
                </div>
            </div>
            
            <div class="recipe-section">
                <h3>Ingredients</h3>
                <ul class="ingredients-list">
                    ${ingredientsList.map(ing => `<li>${ing}</li>`).join('')}
                </ul>
            </div>
            
            <div class="recipe-section">
                <h3>Instructions</h3>
                <ol class="instruction-list">
                    ${instructionsList.map(ins => `<li>${ins}</li>`).join('')}
                </ol>
            </div>
            
            ${recipe.notes ? `
            <div class="recipe-section">
                <h3>Notes</h3>
                <div class="recipe-notes">${recipe.notes.replace(/\n/g, '<br>')}</div>
            </div>
            ` : ''}
        `;
        
        // Show recipe view and hide other views
        recipeView.classList.remove('hidden');
        welcomeView.classList.add('hidden');
        recipeForm.classList.add('hidden');
        
        // Add event listeners to recipe view buttons
        document.getElementById('editRecipeBtn').addEventListener('click', () => this.showEditForm(id));
        document.getElementById('deleteRecipeBtn').addEventListener('click', () => this.deleteRecipe(id));
    }

    // Show the form to add a new recipe
    showAddForm() {
        formTitle.textContent = 'Add New Recipe';
        addEditRecipeForm.reset();
        document.getElementById('recipeId').value = '';
        
        // Show form and hide other views
        recipeForm.classList.remove('hidden');
        recipeView.classList.add('hidden');
        welcomeView.classList.add('hidden');
    }

    // Show the form to edit an existing recipe
    showEditForm(id) {
        const recipe = this.recipes.find(r => r.id === id);
        
        if (!recipe) return;
        
        formTitle.textContent = 'Edit Recipe';
        
        // Fill form with recipe data
        document.getElementById('recipeId').value = recipe.id;
        document.getElementById('recipeName').value = recipe.name;
        document.getElementById('recipeCategory').value = recipe.category;
        document.getElementById('prepTime').value = recipe.prepTime;
        document.getElementById('cookTime').value = recipe.cookTime;
        document.getElementById('ingredients').value = recipe.ingredients;
        document.getElementById('instructions').value = recipe.instructions;
        document.getElementById('notes').value = recipe.notes || '';
        
        // Show form and hide other views
        recipeForm.classList.remove('hidden');
        recipeView.classList.add('hidden');
        welcomeView.classList.add('hidden');
    }

    // Set up event listeners
    setupEventListeners() {
        // Add new recipe button
        addNewBtn.addEventListener('click', () => this.showAddForm());
        
        // Welcome view add recipe button
        welcomeAddBtn.addEventListener('click', () => this.showAddForm());
        
        // Cancel form button
        cancelBtn.addEventListener('click', () => {
            if (this.recipes.length > 0) {
                this.showRecipe(this.currentRecipeId || this.recipes[0].id);
            } else {
                recipeForm.classList.add('hidden');
                welcomeView.classList.remove('hidden');
            }
        });
        
        // Search input
        searchInput.addEventListener('input', (e) => {
            this.renderRecipeList(e.target.value);
        });
        
        // Form submission
        addEditRecipeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const recipeId = document.getElementById('recipeId').value;
            
            const recipeData = {
                name: document.getElementById('recipeName').value,
                category: document.getElementById('recipeCategory').value,
                prepTime: parseInt(document.getElementById('prepTime').value),
                cookTime: parseInt(document.getElementById('cookTime').value),
                ingredients: document.getElementById('ingredients').value,
                instructions: document.getElementById('instructions').value,
                notes: document.getElementById('notes').value
            };
            
            if (recipeId) {
                this.updateRecipe(recipeId, recipeData);
            } else {
                this.addRecipe(recipeData);
            }
        });
    }
}

// Initialize the Recipe Manager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RecipeManager();
});