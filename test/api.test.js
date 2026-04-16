const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');

// ── Inline app for testing (no real DB needed — we mock the models) ──────────
const app = express();
app.use(express.json());

// Mock session middleware so isAuthenticated passes in tests
app.use((req, res, next) => {
  req.session = { user: { _id: 'testuser123' } };
  next();
});

app.use('/workouts', require('../routes/workouts'));
app.use('/exercises', require('../routes/exercises'));
app.use('/users', require('../routes/users'));
app.use('/goals', require('../routes/goals'));

// ── Mock all four models ──────────────────────────────────────────────────────
jest.mock('../models/workout', () => ({
  find: jest.fn(),
  findById: jest.fn()
}));
jest.mock('../models/exercise', () => ({
  find: jest.fn(),
  findById: jest.fn()
}));
jest.mock('../models/user', () => ({
  find: jest.fn(),
  findById: jest.fn()
}));
jest.mock('../models/goal', () => ({
  find: jest.fn(),
  findById: jest.fn()
}));

const Workout = require('../models/workout');
const Exercise = require('../models/exercise');
const User = require('../models/user');
const Goal = require('../models/goal');

// ── WORKOUTS ──────────────────────────────────────────────────────────────────
describe('GET /workouts', () => {
  test('returns all workouts with status 200', async () => {
    const mockWorkouts = [
      { _id: '64a1b2c3d4e5f6a7b8c9d0e1', name: 'Morning Run', type: 'Cardio', duration: 30 }
    ];
    Workout.find.mockResolvedValue(mockWorkouts);

    const res = await request(app).get('/workouts');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockWorkouts);
  });

  test('returns 500 on server error', async () => {
    Workout.find.mockRejectedValue(new Error('DB error'));

    const res = await request(app).get('/workouts');
    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('message');
  });

  test('returns 400 for invalid ID format', async () => {
    const res = await request(app).get('/workouts/invalid-id');
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Invalid ID format');
  });

  test('returns 404 when workout not found', async () => {
    Workout.findById.mockResolvedValue(null);
    const res = await request(app).get('/workouts/64a1b2c3d4e5f6a7b8c9d0e1');
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Workout not found');
  });
});

// ── EXERCISES ─────────────────────────────────────────────────────────────────
describe('GET /exercises', () => {
  test('returns all exercises with status 200', async () => {
    const mockExercises = [
      { _id: '64a1b2c3d4e5f6a7b8c9d0e2', name: 'Push Up', category: 'Strength' }
    ];
    Exercise.find.mockResolvedValue(mockExercises);

    const res = await request(app).get('/exercises');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockExercises);
  });

  test('returns 500 on server error', async () => {
    Exercise.find.mockRejectedValue(new Error('DB error'));

    const res = await request(app).get('/exercises');
    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('message');
  });

  test('returns 400 for invalid ID format', async () => {
    const res = await request(app).get('/exercises/bad-id');
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Invalid ID format');
  });

  test('returns 404 when exercise not found', async () => {
    Exercise.findById.mockResolvedValue(null);
    const res = await request(app).get('/exercises/64a1b2c3d4e5f6a7b8c9d0e2');
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Exercise not found');
  });
});

// ── USERS ─────────────────────────────────────────────────────────────────────
describe('GET /users', () => {
  test('returns all users with status 200', async () => {
    const mockUsers = [
      { _id: '64a1b2c3d4e5f6a7b8c9d0e3', displayName: 'John Doe', email: 'john@test.com' }
    ];
    User.find.mockResolvedValue(mockUsers);

    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockUsers);
  });

  test('returns 500 on server error', async () => {
    User.find.mockRejectedValue(new Error('DB error'));

    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('message');
  });

  test('returns 400 for invalid ID format', async () => {
    const res = await request(app).get('/users/bad-id');
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Invalid ID format');
  });

  test('returns 404 when user not found', async () => {
    User.findById.mockResolvedValue(null);
    const res = await request(app).get('/users/64a1b2c3d4e5f6a7b8c9d0e3');
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('User not found');
  });
});

// ── GOALS ─────────────────────────────────────────────────────────────────────
describe('GET /goals', () => {
  test('returns all goals with status 200', async () => {
    const mockGoals = [
      { _id: '64a1b2c3d4e5f6a7b8c9d0e4', title: 'Lose 10 lbs', type: 'Weight Loss' }
    ];
    Goal.find.mockResolvedValue(mockGoals);

    const res = await request(app).get('/goals');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockGoals);
  });

  test('returns 500 on server error', async () => {
    Goal.find.mockRejectedValue(new Error('DB error'));

    const res = await request(app).get('/goals');
    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty('message');
  });

  test('returns 400 for invalid ID format', async () => {
    const res = await request(app).get('/goals/bad-id');
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Invalid ID format');
  });

  test('returns 404 when goal not found', async () => {
    Goal.findById.mockResolvedValue(null);
    const res = await request(app).get('/goals/64a1b2c3d4e5f6a7b8c9d0e4');
    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Goal not found');
  });
});