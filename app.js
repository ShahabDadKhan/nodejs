const fs = require('fs');
const express = require('express');
const app = express();

/////////////////// L-9 Patch

app.patch('/api/v1/tours/:id', (req, res) => {
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
});

// //////////////// L-8 Get Tours By Params

// app.get('/api/v1/tours/:id/:team?', (req, res) => {
//   console.log(req.params);

//   const id = parseInt(req.params.id);
//   const tour = tours.find((el) => el.id === id);

//   if (!tour) {
//     return res.status(404).json({
//       status: 'fails',
//       message: 'No Tour found',
//     });
//   }

//   console.log('Tour', tour.name);
//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour,
//     },
//   });
// });

///// Middleware, It can modify the incoming request data. As the name says, it stands between the request & the response.
app.use(express.json());

///////////// Practicing

const port = 3000;

app.listen(port, () => {
  console.log(`Hurre, App is running on port:${port}...`);
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello biro', app: 'Running fine' });
});

app.post('/', (req, res) => {
  res.status(200).send('You can post to this');
});

///////////// Practicing Ends Here

////////////////Starting the Tours Api from here

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Get Request

app.get('/api/v1/tours', (req, res) => {
  console.log('Get');
  res.status(200).json({
    status: 200,
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

// Post Request

app.post('/api/v1/tours', (req, res) => {
  console.log(req.body);
  // res.send('Ssiiuuuuu, Posted!');

  // const newId = tours[tours.length - 1].id + 1;
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
});

////////////////Ending here
