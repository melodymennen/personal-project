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

        db.read_all_recipes([user.id]).then(recipe => {
            res.status(200).json(recipe)
        }).catch(error => console.log('read all recipes error',error))
    }, 
    getCategory: (req, res, next) => {
        const db =  req.app.get('db')
        
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
        
    }
}