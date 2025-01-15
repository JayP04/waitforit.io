const express = require('express');
const supabase = require('../../../../backend/routes/supabaseClient');
const app = express();

app.use(express.json());

// Signup Endpoint
app.post('/auth/signup', async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json({ message: 'Signup successful', user: data.user });
});

// Login Endpoint
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return res.status(400).json({ error: error.message });
  res.status(200).json({ message: 'Login successful', user: data.user });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
