# Expense Splitter Backend API Documentation

## Base URL

```
http://localhost:5000
```

## Authentication

All endpoints require JWT authentication token in the header:

```
Authorization: Bearer <token>
```

## Endpoints

### User Management

#### POST /api/users/register

Create a new user account.

**Request Body:**

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**

```json
{
  "userId": "string",
  "username": "string",
  "email": "string",
  "token": "string"
}
```

#### POST /api/users/login

Login to existing account.

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**

```json
{
  "userId": "string",
  "username": "string",
  "token": "string"
}
```

### Groups

#### POST /api/groups

Create a new expense group.

**Request Body:**

```json
{
  "name": "string",
  "description": "string",
  "members": ["userId1", "userId2"]
}
```

**Response:**

```json
{
  "groupId": "string",
  "name": "string",
  "description": "string",
  "members": ["userId1", "userId2"],
  "createdAt": "date"
}
```

#### GET /api/groups

Get all groups for current user.

**Response:**

```json
[
  {
    "groupId": "string",
    "name": "string",
    "description": "string",
    "members": ["userId1", "userId2"],
    "createdAt": "date"
  }
]
```

### Expenses

#### POST /api/expenses

Add a new expense.

**Request Body:**

```json
{
  "groupId": "string",
  "amount": "number",
  "description": "string",
  "paidBy": "userId",
  "splitBetween": ["userId1", "userId2"]
}
```

**Response:**

```json
{
  "expenseId": "string",
  "groupId": "string",
  "amount": "number",
  "description": "string",
  "paidBy": "userId",
  "splitBetween": ["userId1", "userId2"],
  "createdAt": "date"
}
```

#### GET /api/expenses/:groupId

Get all expenses for a group.

**Response:**

```json
[
  {
    "expenseId": "string",
    "amount": "number",
    "description": "string",
    "paidBy": "userId",
    "splitBetween": ["userId1", "userId2"],
    "createdAt": "date"
  }
]
```

### Settlements

#### GET /api/settlements/:groupId

Get settlement summary for a group.

**Response:**

```json
[
  {
    "payer": "userId",
    "receiver": "userId",
    "amount": "number"
  }
]
```
