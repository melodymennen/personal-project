module.exports = {
    post: (req, res, next) => {
        const db =  req.app.get('db')
        const {name, category, ingredients, direction, notes} = req.body 

        db.new_recipe([name, category, ingredients, direction, notes]).then(() => {
            res.status(200).send('success')
        }).catch(res.status(500).send())
    }, 
    getAll: (req, res, next) => {
        const db =  req.app.get('db')
        
    }, 
    getCategory: (req, res, next) => {
        const db =  req.app.get('db')
        
    }, 
    update: (req, res, next) => {
        const db =  req.app.get('db')
        
    }, 
    delete: (req, res, next) => {
        const db =  req.app.get('db')
        
    } 
}