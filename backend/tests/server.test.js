const request = require('supertest');
const app = require('../src/server');

describe('3-Tier Backend API Tests', () => {
  it('GET /api/health returns 200 and healthy status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('healthy');
  });

  it('GET /api/notes returns list of notes', async () => {
    const res = await request(app).get('/api/notes');
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
  });
});
