const express = require("express");
const router = express.Router();

const { fetchUsers } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    res.send(await fetchUsers());
  } catch (ex) {
    next(ex);
  }
});

// userRouter.get("/", async (req, res) => {
//   try {
      
//       const results = await getUsers();
//       res.send(results);
//   } catch (err) {
//       res.send({ err, message: "No bueno" });
//   }
// });

// userRouter.get("/me", requireUser, (req, res)=>{
 
//   res.send ("here is your account");
// });



module.exports = router;
