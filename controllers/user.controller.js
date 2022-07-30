const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

module.exports.userInfo = (req, res) => {
  console.log(req.params);
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send(`ID unknow: ${req.params.id}`);
  }
  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("ID unknow :" + err);
    }
  }).select('-password')
};

module.exports.updateUserByID = async (req, res) => {
  UserModel.exists({ _id: req.params.id }, async (err, doc) => {
    if (err) {
      return res.status(500).send(`ID unknow ${req.params.id}`);
    } else {
      try {
        UserModel.findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              bio:req.body.bio
            },
          },
          { runValidators: true, returnDocument:'after' },
          (err, docs) => {
            if (!err) return res.send(docs);
            else return res.status(500).send({ message: err });
          }
        );
      } catch (err) {
        return res.status(500).json({ message: err });
      }
    }
  });
};

module.exports.deleteUserByID = async (req, res) => {
  UserModel.exists({ _id: req.params.id }, async (err, doc) => {
    if (err) {
      return res.status(500).send(`ID unknow ${req.params.id}`);
    } else {
      try {
        await UserModel.deleteOne({ _id: req.params.id }).exec();
        return res.status(200).json({ message: "Successfully deleted." });
      } catch (err) {
        return res.status(500).json({ message: err });
      }
    }
  });
};
