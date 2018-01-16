module.exports = {
    newRecipe: (req, res, next) => {
        const db =  req.app.get('db')
        const {name, category, ingredients, directions, notes} = req.body 
        console.log(req.body)
        db.new_recipe([name, category, ingredients, directions, notes]).then(() => {
            res.status(200).send('success')
        }).catch(error => console.log(error))
    }, 
    getAll: (req, res, next) => {
        const db =  req.app.get('db')

        db.read_all_recipes([req.session.user])
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