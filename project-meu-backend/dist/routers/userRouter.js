
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _userController = _interopRequireDefault(require("../controllers/userController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = (0, _express.Router)();
router.get('/:uid', async (req, res) => {
  const user = req.params;
  try {
    const data = await _userController.default.getName(user.uid);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
router.post('/', async (req, res) => {
  const userData = req.body;
  try {
    const uid = await _userController.default.createUser(userData);
    res.status(200).send(`User created with uid: ${uid}`);
  } catch (e) {
    console.log(e.message);
    console.log('Tried to create user');
    res.status(500).send(e.message);
  }
});
router.patch('/:uid', async (req, res) => {
  const updatedUser = req.body;
  const user = req.params;
  try {
    const uid = await _userController.default.updateUser(user.uid, updatedUser);
    res.status(200).send(`User updated with uid: ${uid}`);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
var _default = router;
exports.default = _default;