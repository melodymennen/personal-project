module.exports = {
    newRecipe: (req, res, next) => {
        const db =  req.app.get('db')
        const { name, category, ingredients, directions, notes, picture_url } = req.body 
        const { user } = req.session

        db.new_recipe([name, category, ingredients, directions, notes, user.id, picture_url]).then(() => {
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
        const { id, name, category, ingredients, directions, notes, picture_url } = req.body
        
        db.update_recipe([id, name, category, ingredients, directions, notes, picture_url]).then(() => {
            res.status(200).send('success')
        }).catch(error => console.log('update recipe error',error))
    }, 
    delete: (req, res, next) => {
        const db =  req.app.get('db')
        const { recipe_id } = req.params
        
        db.delete_recipe([recipe_id]).then(() => {
            res.status(200).send('success')
        }).catch(error => console.log('delete recipe error',error))
    }, 
    getFavorites: (req, res, next) => {
        const db =  req.app.get('db')
        const { user } = req.session

        db.get_favorites([user.id]).then(favorites => {
            res.status(200).json(favorites)
        }).catch(error => console.log('get favorites error',error))
    }, 
    addFavorite: (req, res, next) => {
        const db =  req.app.get('db')
        const { user } = req.session
        const { recipe } = req.body

        db.check_favorites([user.id, recipe.id]).then(response => {
            if(response.length){
                res.send('already a favorite')
            } else {
                db.add_favorite([user.id, recipe.id]).then(() => {
                    res.status(200).send('success')
                }).catch(error => console.log('add favorite error',error))
            }
        }).catch(error => console.log('check favorites error', error))    
    },
    getRandom: (req, res, next) => {
        const db =  req.app.get('db')
        const { user } = req.session

        db.read_all_recipes([user.id]).then(recipes => {
            res.status(200).json(recipes[Math.floor((Math.random() * recipes.length-1) + 1)])
        }).catch(error => console.log('read all recipes for random error',error))
    }
}