const express = require('express');
const cors = require('cors');
require('dotenv').config();

const eventosRoutes = require('./routes/eventos.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/eventos', eventosRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en puerto ${PORT}`);
});
