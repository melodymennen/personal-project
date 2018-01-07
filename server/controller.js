module.exports = {
    post: (req, res, next) => {
        const db =  req.app.get('db')
        const {name, category, ingredients, direction, notes} = req.body 

        db.new_recipe([name, category, ingredients, direction, notes]).then(() => res.status(200).send()).catch(res.status(500).send())
    }, 
    read: (req.res.next) => {
        const db =  req.app.get('db')
        
    } 
}