const bookshelf= require('../utils/db')

const Staff = bookshelf.model('Staff',{
    tableName: 'staff',
    club(){
        return this.hasMany('Club')
    }
})

module.exports=Staff;