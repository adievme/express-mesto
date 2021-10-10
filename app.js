const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

// добавляет в каждый запрос объект user, в котором идентификатор пользователя
app.use((req, res, next) => {
  req.user = {
    _id: '616136c777d74c2c70b82244'
  };
  next();
});

app.use(express.json());

app.use(routes);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
