const fs = require('fs');
const express = require('express');
const app = express();

///// Middleware, It can modify the incoming request data. As the name says, it stands between the request & the response.
app.use(express.json());

// /// Port that we are lisitning on
const port = 3000;
app.listen(port, () => {
  console.log(`Hurre, App is running on port:${port}...`);
});

//////////////////// Request Handller Functions
const getAllTours = (req, res) => {
  console.log('GeT all tours');
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  console.log(req.params);

  const id = parseInt(req.params.id);
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fails',
      message: 'No Tour found',
    });
  }

  console.log('Tour', tour.name);
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tour,
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id > tours.length) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid Id',
    });
  }

  res.status(204).json({
    status: 'sucess',
    data: null,
  });
};

const updateTour = (req, res) => {
  if (req.params.id > tours.length) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid Id',
    });
  }

  res.status(200).json({
    status: 'Success',
    data: {
      tour: '<Updated tours here ....>',
    },
  });
};

const createTour = (req, res) => {
  console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  console.log('New ID', newId);
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'Success',
        data: {
          data: newTour,
        },
      });
    }
  );
};

// // Get Request for all the tours
// app.get('/api/v1/tours', getAllTours);

// //////////////// L-8 Get Tours By Params
// app.get('/api/v1/tours/:id', getTour);

// Post Request
// app.post('/api/v1/tours', createTour);

/////////////////// Patch Request
// app.patch('/api/v1/tours/:id', updateTour);

// //////////////// Delete Request
// app.delete('/api/v1/tours/:id', deleteTour);

// //////// Making Routes easy for us to use
app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

///////////// Practicing
// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Hello biro', app: 'Running fine' });
// });

// app.post('/', (req, res) => {
//   res.status(200).send('You can post to this');
// });
///////////// Practicing Ends Here

////////////////Starting the Tours Api from here
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
////////////////Ending here
