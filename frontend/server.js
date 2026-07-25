const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', tier: 'Frontend Nginx/Node Web Tier' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🌐 Frontend serving on port ${PORT}`));
