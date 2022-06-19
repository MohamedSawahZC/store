import supertest from 'supertest';
import server from '..';

const request = supertest(server);

describe('Test basic endpoint server', () => {
  it('Get the / endpoint', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});
