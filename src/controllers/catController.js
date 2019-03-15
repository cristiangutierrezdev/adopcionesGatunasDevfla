const {
  newCat, getCat, getActiveCats,
  getCats, deleteCat, updateCat,
  adoptCat, likeCat, unlikeCat,
  commentCat, getCatsCommentsUsers } = require('./resolver/catResolver.js')

module.exports = {

  createCat: async (req, res) => {
    const cat = await newCat(req.body)
    cat
      ? res.status(201).send(cat)
      : res.status(400).send({ message: 'Error' })
  },
  getThisCat: async (req, res) => {
    const cat = await getCat(req.params.catid)
    cat
      ? res.status(200).send(cat)
      : res.status(404).send({ message: 'Gato No encontrado' })
  },
  getAllActiveCats: async (req, res) => {
    const cats = await getActiveCats()
    cats
      ? res.status(200).send(cats)
      : res.status(404).send({ message: 'Gatos No encontrado' })
  },
  getAllCats: async (req, res) => {
    const cats = await getCats()
    cats
      ? res.status(200).send(cats)
      : res.status(404).send({ message: 'Gatos No encontrado' })
  },
  deleteThisCat: async (req, res) => {
    const cat = await deleteCat(req.params.catid)
    cat
      ? res.status(200).send({ message: `El gato ${req.params.catid} ha sido eliminado` })
      : res.ststus(409).send({ message: 'Error' })
  },
  updateThisCat: async (req, res) => {
    const newCat = await updateCat(req.params.catid, req.body)
    newCat
      ? res.status(200).send(newCat)
      : res.status(409).send({ message: `Error` })
  },
  adoptThisCat: async (req, res) => {
    const catAdopted = await adoptCat(req.params.catid, req.body)
    catAdopted
      ? res.status(200).send(catAdopted)
      : res.status(409).send({ message: `Error` })
  },
  likeThisCat: async (req, res) => {
    const cat = await likeCat(req.params.catid)
    cat
      ? res.status(200).send(cat)
      : res.status(409).send({ message: `Error` })
  },
  unlikeThisCat: async (req, res) => {
    const cat = await unlikeCat(req.params.catid)
    cat
      ? res.status(200).send(cat)
      : res.status(409).send({ message: `Error` })
  },
  commentThisCat: async (req, res) => {
    const cat = await commentCat(req.params.catid, req.body.comments)
    cat
      ? res.status(201).send(cat)
      : res.status(409).send({ message: `Error` })
  },
  getAllCatsCommentsUsers: async (req, res) => {
    const users = await getCatsCommentsUsers()
    users
      ? res.status(201).send(users)
      : res.status(404).send({ message: `Error` })
  }
}
