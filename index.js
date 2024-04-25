const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/travelSiteDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const bookingSchema = new mongoose.Schema({
  place: String,
  guests: Number,
  arrival: Date,
  leaving: Date,
});

const Booking = mongoose.model('Booking', bookingSchema);

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  number: Number,
  subject: String,
  message: String,
});

const ContactData = mongoose.model('ContactData', contactSchema);

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname,"Additional")));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get("/more",(req,res)=>{
  res.sendFile(path.join(__dirname,"Additional","index.html"))
})
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
          return res.json({ success: false, msg: 'User already exists' });
      }

      const newUser = new User({
          email,
          password,
      });

      await newUser.save();
      res.json({ success: true, msg: 'User registered successfully' });
  } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email });
    console.log()
      if (!user || user.password !== password) {
          return res.json({ success: false, msg: 'Invalid credentials' });
      }

      // Generate a token (this is a basic example, in production use libraries like jsonwebtoken)
      const token = `${email}_${Date.now()}`;

      res.json({ success: true,token: token });
  } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
  }
});

// Existing code...


app.post('/book', (req, res) => {
  const { place, guests, arrival, leaving } = req.body;

  const newBooking = new Booking({
    place,
    guests,
    arrival,
    leaving,
  });

  newBooking.save()
    .then(() => {
      res.send({ msg: 'Booking successful' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
});

app.post('/sendMessage', (req, res) => {
  const { name, email, number, subject, message } = req.body;

  const newContactData = new ContactData({
    name,
    email,
    number,
    subject,
    message,
  });

  newContactData.save()
    .then(() => {
      res.json({ success: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
