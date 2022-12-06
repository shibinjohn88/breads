 
//require mongoose
const mongoose = require('mongoose')
const Baker = require('./baker')
//creating shorthand for the Schema constructor 
const { Schema } = mongoose

//schema

const breadSchema = new Schema ({
  name: { type: String, required: true },
  hasGluten: Boolean,
  image: { type: String, default: 'http://placehold.it/500x500.png' },
  baker: {
    type: Schema.Types.ObjectId,
    ref: 'Baker'  
  }
})

//helper methods
breadSchema.methods.getBakedBy = function() {
  return `${this.name} was baked with love by ${this.baker.name}, who has been with us since ${this.baker.startDate.getFullYear()}`
}
breadSchema.statics.breadListByBaker = function (baker) {
  console.log(baker)
  return this.find ({"baker": baker}, {'name': 1})
  
} 

//model and export 
const Bread = mongoose.model('Bread', breadSchema)
module.exports = Bread
