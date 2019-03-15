const { Cat } = require('../../models')

module.exports = {

  newCat: (cat) => {
    return new Promise((resolve, reject) => {
      const { picture, age, gender, first_owner } = cat // eslint-disable-line
      const { name, last_name, celphone, email } = first_owner // eslint-disable-line
      const newCat = Cat({
        picture,
        age,
        gender,
        first_owner: {
          name,
          last_name,
          celphone,
          email
        }
      })
      newCat.save((err, cat) => {
        err
          ? reject(new Error(false))
          : resolve(cat)
      })
    })
  },
  getCat: (catid) => {
    return Cat.findById(catid).exec()
      .then((cat) => {
        return cat
      }).catch(() => {
        return false
      })
  },
  getActiveCats: () => {
    return Cat.find({
      is_adopted: false, is_active: true
    }).exec()
      .then((cats) => {
        return cats
      }).catch(() => {
        return false
      })
  },
  getCats: () => {
    return Cat.find().exec()
      .then((cats) => {
        return cats
      }).catch(() => {
        return false
      })
  },
  deleteCat: (catid) => {
    return Cat.findByIdAndUpdate(catid, {
      $set: { is_active: false }
    }, { new: true }).exec()
      .then((cat) => {
        return cat
      }).catch(() => {
        return false
      })
  },
  updateCat: (catid, body) => {
    return Cat.findByIdAndUpdate(catid, {
      $set: body
    }, { new: true }).exec()
      .then((newCat) => {
        return newCat
      }).catch(() => {
        return false
      })
  },
  adoptCat: (catid, owner) => {
    return Cat.findByIdAndUpdate(catid, {
      $set: { is_adopted: true },
      $push: { current_owner: owner }
    }, { new: true }).exec()
      .then((catAdopted) => {
        return catAdopted
      }).catch(() => {
        return false
      })
  },
  likeCat: (catid) => {
    return Cat.findByIdAndUpdate(catid, {
      $inc: { likes: 1 }
    }, { new: true }).exec()
      .then((cat) => {
        return cat
      }).catch(() => {
        return false
      })
  },
  unlikeCat: (catid) => {
    return Cat.findByIdAndUpdate(catid, {
      $inc: { likes: -1 }
    }, { new: true }).exec()
      .then((cat) => {
        return cat
      }).catch(() => {
        return false
      })
  },
  commentCat: (catid, comment) => {
    return Cat.findByIdAndUpdate(catid, {
      $push: { comments: comment }
    }, { new: true }).exec()
      .then((cat) => {
        return cat
      }).catch(() => {
        return false
      })
  },
  getCatsCommentsUsers: () => {
    return Cat.find({
      is_adopted: false,
      is_active: true
    }).populate('comments.user').exec()
      .then((users) => {
        return users
      }).catch(() => {
        return false
      })
  }
}
