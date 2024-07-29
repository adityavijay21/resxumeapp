const express = require('express');
const cors = require('cors');
const opportunitiesRouter = require('./routes/opportunities');
const resxumewritersRouter = require('./routes/resxumewriters');
const slidersRouter = require('./routes/sliders');
const resxumetemplateRouter = require('./routes/resxumetemplates');
const dashboardRouter = require('./routes/dashboardRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/opportunities', opportunitiesRouter);
app.use('/api/resxumewriters', resxumewritersRouter);
app.use('/api/sliders', slidersRouter);
app.use('/api/resxumetemplates', resxumetemplateRouter);
app.use('/api/dashboard', dashboardRouter);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('changed');
});