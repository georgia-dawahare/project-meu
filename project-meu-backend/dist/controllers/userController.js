"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _firestore = _interopRequireDefault(require("../services/firestore"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const getName = async uid => {
  const name = await _firestore.default.getName(uid);
  return name;
};
const createUser = async userData => {
  const uid = await _firestore.default.createUser(userData);
  return uid;
};
const updateUser = async (id, updatedData) => {
  const uid = await _firestore.default.updateUser(id, updatedData);
  return uid;
};
const userController = {
  getName,
  createUser,
  updateUser
};
var _default = userController;
exports.default = _default;