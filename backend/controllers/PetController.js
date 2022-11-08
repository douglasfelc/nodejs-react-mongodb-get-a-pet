const Pet = require("../models/Pet")

// helpers
const getToken = require("../helpers/get-token")
const getUserByToken = require("../helpers/get-user-by-token")
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class PetController {
  // create a pet
  static async create(req, res) {
    const { name, age, weight, color } = req.body
    const images = req.files
    const available = true

    // validations
    if(!name) {
      res.status(422).json({message: 'Name is required'})
      return
    }

    if(!age) {
      res.status(422).json({message: 'Age is required'})
      return
    }

    if(!weight) {
      res.status(422).json({message: 'Weight is required'})
      return
    }

    if(!color) {
      res.status(422).json({message: 'Color is required'})
      return
    }

    if(images.length === 0){
      res.status(422).json({message: 'Image is required'})
      return
    }

    // get the pet tutor
    const token = getToken(req)
    const user = await getUserByToken(token)

    // create a pet
    const pet = new Pet({
      name, 
      age, 
      weight, 
      color, 
      available, 
      images: [],
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      },
    })

    images.map((image) => {
      pet.images.push(image.filename)
    })

    try {
      const newPet = await pet.save()
      res.status(201).json({
        message: 'Pet registered successfully',
        newPet,
      })
      
    } catch (error) {
      res.status(500).json({ message: error })
    }
    
  }

  static async getAll(req, res) {
    const pets = await Pet.find().sort('-createdAt')

    res.status(200).json({
      pets: pets,
    })
  }

  static async getPetById(req, res) {

    const id = req.params.id

    // check if id is valid
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'Invalid id' })
      return
    }

    // check if pet exists
    const pet = await Pet.findOne({ _id: id })

    if (!pet) {
      res.status(404).json({ message: 'Pet not found' })
      return
    }

    res.status(200).json({
      pet: pet,
    })
  }

  static async getAllUserPets(req, res) {

    // get user from token
    const token = getToken(req)
    const user = await getUserByToken(token)

    const pets = await Pet.find({'user._id': user._id}).sort('-createdAt')

    res.status(200).json({
      pets
    })
  }

  static async getAllUserAdoptions(req, res) {

    // get user from token
    const token = getToken(req)
    const user = await getUserByToken(token)

    const pets = await Pet.find({'adopter._id': user._id}).sort('-createdAt')

    res.status(200).json({
      pets
    })
  }

  static async removePetById(req, res) {
    const id = req.params.id

    // check if id is valid
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'Invalid id' })
      return
    }

    // check if pet exists
    const pet = await Pet.findOne({ _id: id })

    if (!pet) {
      res.status(404).json({ message: 'Pet not found' })
      return
    }

    // check if logged in user registered the pet
    const token = getToken(req)
    const user = await getUserByToken(token)

    if(pet.user._id.toString() !== user._id.toString()) {
      res.status(422).json({ message: 'There was a problem processing your request, please try again later' })
      return
    }

    await Pet.findByIdAndRemove(id)

    res.status(200).json({message: 'Pet successfully removed'})
  }

  static async updatePet(req, res) {
    const id = req.params.id
    const { name, age, weight, color, available } = req.body
    const images = req.files

    const updatedData = {}

    // check if id is valid
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'Invalid id' })
      return
    }

    // check if pet exists
    const pet = await Pet.findOne({ _id: id })

    if (!pet) {
      res.status(404).json({ message: 'Pet not found' })
      return
    }

    // check if logged in user registered the pet
    const token = getToken(req)
    const user = await getUserByToken(token)

    if(pet.user._id.toString() !== user._id.toString()) {
      res.status(422).json({ message: 'There was a problem processing your request, please try again later' })
      return
    }

    // validations
    if(!name) {
      res.status(422).json({message: 'Name is required'})
      return
    } else {
      updatedData.name = name
    }

    if(!age) {
      res.status(422).json({message: 'Age is required'})
      return
    } else {
      updatedData.age = age
    }

    if(!weight) {
      res.status(422).json({message: 'Weight is required'})
      return
    } else {
      updatedData.weight = weight
    }

    if(!color) {
      res.status(422).json({message: 'Color is required'})
      return
    } else {
      updatedData.color = color
    }

    if(images.length === 0){
      res.status(422).json({message: 'Image is required'})
      return
    } else {
      updatedData.images = []
      images.map((image) => {
        updatedData.images.push(image.filename)
      })
    }

    await Pet.findByIdAndUpdate(id, updatedData)

    res.status(200).json({message: 'Pet successfully updated'})
  }
  
  static async schedule(req, res) {
    const id = req.params.id

    // check if pet exists
    const pet = await Pet.findOne({ _id: id })

    if (!pet) {
      res.status(404).json({ message: 'Pet not found' })
      return
    }

    // check if user registered the pet
    const token = getToken(req)
    const user = await getUserByToken(token)

    if(pet.user._id.equals(user._id)) {
      res.status(422).json({ message: 'You cannot schedule a visit with your own pet' })
      return
    }

    // check if user has already scheduled a visit
    if(pet.adopter) {
      if(pet.adopter._id.equals(user._id)) {
        res.status(422).json({ message: 'You have already booked a visit for this pet' })
        return
      }
    }

    // add user to pet
    pet.adopter = {
      _id: user.id,
      name: user.name,
      image: user.image,
    }

    await Pet.findByIdAndUpdate(id, pet)

    res.status(200).json({
      message: `The visit has been successfully scheduled, please contact ${pet.user.name} by phone ${pet.user.phone}`
    })
  }

  static async concludeAdoption(req, res) {
    const id = req.params.id

    // check if pet exists
    const pet = await Pet.findOne({ _id: id })

    if (!pet) {
      res.status(404).json({ message: 'Pet not found' })
      return
    }

    // check if logged in user registered the pet
    const token = getToken(req)
    const user = await getUserByToken(token)

    if(pet.user._id.toString() !== user._id.toString()) {
      res.status(422).json({ message: 'There was a problem processing your request, please try again later' })
      return
    }

    pet.available = false

    await Pet.findByIdAndUpdate(id, pet)

    res.status(200).json({
      message: 'Congratulations, the adoption cycle has been successfully completed'
    })
  }
}
