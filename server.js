const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// ✅ MongoDB Atlas connection string with encoded password
mongoose.connect("mongodb+srv://trushaldhumale:%40Piyu0718@cluster0.dordzjf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Atlas Connected"))
.catch((err) => console.error("❌ Connection Error:", err));

// 🧾 User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});
const User = mongoose.model('User', userSchema);

// 🔧 Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// 🏠 Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.send('<h2>✅ Registration Successful!</h2><a href="/">Go back</a>');
  } catch (err) {
    console.error(err);
    res.send('<h2>❌ Registration Failed!</h2><a href="/">Try Again</a>');
  }
});

// 🚀 Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
