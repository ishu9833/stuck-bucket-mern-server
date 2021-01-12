const express = require('express')
const cors = require("cors");
const morgan = require('morgan');


const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.status(200).json({
      msg: 'Hello World',
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})