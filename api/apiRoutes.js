const express = require('express');
const router = express.Router();



let dummyData = [
  { id: 1, name: "Alice Johnson", email: "alice.johnson@example.com", age: 25 },
  { id: 2, name: "Bob Smith", email: "bob.smith@example.com", age: 30 },
  { id: 3, name: "Charlie Brown", email: "charlie.brown@example.com", age: 28 },
  { id: 4, name: "Diana Prince", email: "diana.prince@example.com", age: 32 },
  { id: 5, name: "Edward Norton", email: "edward.norton@example.com", age: 45 },
  { id: 6, name: "Fiona Gallagher", email: "fiona.gallagher@example.com", age: 22 },
  { id: 7, name: "George Miller", email: "george.miller@example.com", age: 35 },
  { id: 8, name: "Helen Mirren", email: "helen.mirren@example.com", age: 50 },
  { id: 9, name: "Ivan Petrov", email: "ivan.petrov@example.com", age: 40 },
  { id: 10, name: "Julia Roberts", email: "julia.roberts@example.com", age: 38 }
];


router.use((req, res, next) => {
  const userId = req.header('User-id');
  const scope = req.header('Scope');
  if (userId !== 'ifabula' || scope !== 'user') {
    return res.status(401).json({
      responseCode: 401,
      responseMessage: "UNAUTHORIZED"
    });
  }
  next();
});


router.get('/data', (req, res) => {
  res.json({
    responseCode: 200,
    responseMessage: "Success",
    data: dummyData
  });
});

router.post('/submit', (req, res) => {
  const { name, email, age } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email) {
    return res.status(400).json({
      responseCode: 400,
      responseMessage: "Name and Email are required"
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      responseCode: 400,
      responseMessage: "Invalid email format"
    });
  }

  const newEntry = {
    id: dummyData.length + 1,
    name,
    email,
    age: age || null
  };

  dummyData.push(newEntry);

  res.json({
    responseCode: 201,
    responseMessage: "Data successfully submitted",
    data: newEntry
  });
});

module.exports = router;



/**
 * @swagger
 * /api/data:
 *   get:
 *     summary: Get dummy data
 *     tags: [Data]
 *     parameters:
 *       - in: header
 *         name: User-id
 *         schema:
 *           type: string
 *         required: false
 *         description: User ID (ifabula)
 *       - in: header
 *         name: Scope
 *         schema:
 *           type: string
 *         required: false
 *         description: Scope (user)
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/submit:
 *   post:
 *     summary: Submit new dummy data
 *     tags: [Data]
 *     parameters:
 *       - in: header
 *         name: User-id
 *         schema:
 *           type: string
 *         required: false
 *         description: User ID
 *       - in: header
 *         name: Scope
 *         schema:
 *           type: string
 *         required: false
 *         description: Scope
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Data successfully submitted
 */
