import request from 'supertest';
import app from '../../../server.js'; // Assuming your express app is exported from server.js

describe('Inventory API', () => {
  let createdItemId;

  describe('POST /api/v1/inventory', () => {
    it('should return 400 if required fields are missing', async () => {
      const res = await request(app)
        .post('/api/v1/inventory')
        .send({}); // empty body
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Missing required fields: name, categoryId, and date are required');
    });

    it('should create a new inventory item with valid data', async () => {
      const newItem = {
        name: 'Test Item',
        categoryId: '64a7f0f9f1a2b3c4d5e6f7a8', // Replace with a valid categoryId from your DB
        date: '2023-07-10T00:00:00.000Z',
        quantity: 10,
        unitCost: 5,
        totalCost: 50
      };
      const res = await request(app)
        .post('/api/v1/inventory')
        .send(newItem);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('name', newItem.name);
      createdItemId = res.body.data.id;
    });
  });

  describe('GET /api/v1/inventory/filtered', () => {
    it('should return available and exhausted items', async () => {
      const res = await request(app)
        .get('/api/v1/inventory/filtered');
      expect(res.statusCode).toEqual(200);
      expect(res.body.data).toHaveProperty('available');
      expect(res.body.data).toHaveProperty('exhausted');
    });
  });

  // Additional tests for update, delete, entries, sales can be added here
});
