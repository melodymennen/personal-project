module.exports = {
    newRecipe: (req, res, next) => {
        const db =  req.app.get('db')
        const {name, category, ingredients, directions, notes} = req.body 
        const { user } = req.session

        db.new_recipe([name, category, ingredients, directions, notes, user.id]).then(() => {
            res.status(200).send('success')
        }).catch(error => console.log('new recipe error',error))
    }, 
    getAll: (req, res, next) => {
        const db =  req.app.get('db')
        const { user } = req.session

        db.read_all_recipes([user.id]).then(recipes => {
            res.status(200).json(recipes)
        }).catch(error => console.log('read all recipes error',error))
    }, 
    getCategories: (req, res, next) => {
        const db =  req.app.get('db')

        db.get_categories().then(categories => {
            res.status(200).json(categories)
        }).catch(error => console.log('read all recipes error',error))
    }, 
    recipesByCategory: (req, res, next) => {
        const db =  req.app.get('db')
        const { user } = req.session
        const { category_id } = req.params

        db.recipes_by_category([user.id, category_id]).then(category => {
            res.status(200).json(category)
        }).catch(error => console.log('recipes by category error',error))
    }, 
    oneRecipe: (req, res, next) => {
        const db =  req.app.get('db')
        const { recipe_id } = req.params
        
        db.get_recipe([recipe_id]).then(recipe => {
            res.status(200).json(recipe)
        }).catch(error => console.log('get recipe error',error))
    }, 
    update: (req, res, next) => {
        const db =  req.app.get('db')
        
    }, 
    delete: (req, res, next) => {
        const db =  req.app.get('db')
        
    }, 
    getFavorites: (req, res, next) => {
        const db =  req.app.get('db')
        
    }, 
    addFavorite: (req, res, next) => {
        const db =  req.app.get('db')
        const { user } = req.session
        const { recipe } = req.body
        
        db.add_favorite([user.id, recipe.id]).then(() => {
            res.status(200).send('success')
        }).catch(error => console.log('add favorite error',error))
    }
}