const bookshelf= require('../utils/db')

const Club = bookshelf.model('Club',{
    tableName: 'club',
    students(){
        return this.hasOne('Student')
    },
    staff(){
        return this.belongsTo('Staff')
    }
})

module.exports=Club