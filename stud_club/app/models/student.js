const bookshelf=require('../utils/db')

const Student = bookshelf.model('Student',{
    tableName: 'student',
    club(){
        return this.belongsTo('Club')
    }
})

module.exports=Student;