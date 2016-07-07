const express = require('express');

const app = express();

app.use(express.static(`${__dirname}`));

app.listen(3030, () => {
  console.log('listening on 3030');
});
