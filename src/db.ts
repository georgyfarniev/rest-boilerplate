import mongoose, { Document, Schema } from 'mongoose'

//#region models

const enumValues = (enumeration: any) => Object
  .keys(enumeration)
  .reduce((p: string[], c: string) => ([...p, enumeration[c]]), [])

enum PetType {
  Dog = 'dog',
  Cat = 'cat',
  Squirrel = 'squirrel'
}

interface IPet extends Document {
  name: string
  type: PetType
}

const PetSchema: Schema = new Schema({
  name: String,
  type: { type: String, enum: enumValues(PetType) }
})

const Pet = mongoose.model<IPet>('Pet', PetSchema)

//#endregion

async function connect(url: string) {
  console.log('connecting to db')

  mongoose.set('useUnifiedTopology', true)
  mongoose.set('useNewUrlParser', true)

  await mongoose.connect(url)

  console.log('db connected')

  return mongoose;
}

export default {
  connect,
  Pet
}