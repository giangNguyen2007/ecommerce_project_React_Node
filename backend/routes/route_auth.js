const {Router} = require("express");
const {registerUser, loginUser } = require("../controllers/controller_auth");
const router = Router();
const { authValidator } = require("../validator/validator");
const { dataValidator } = require("../middleware/dataValidator");


router.post("/register", authValidator, dataValidator, registerUser);

router.post('/login', authValidator, dataValidator, loginUser)

module.exports = router;