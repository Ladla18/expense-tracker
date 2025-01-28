# Expense Splitter Frontend Documentation

## Project Structure

```
src/
├── components/
│   ├── auth/
│   ├── groups/
│   ├── expenses/
│   └── shared/
├── pages/
├── services/
├── store/
└── utils/
```

## Components

### Authentication Components

#### LoginForm
- Handles user login
- Form validation
- JWT token storage

#### RegisterForm
- New user registration
- Form validation
- Automatic login after registration

### Group Components

#### GroupList
- Displays all groups user is part of
- Create new group functionality
- Group search and filter

#### GroupDetail
- Shows group information
- Member management
- Expense summary

### Expense Components

#### ExpenseForm
- Add new expenses
- Split amount between members
- Upload receipt (optional)

#### ExpenseList
- List all expenses in a group
- Filter by date/amount/member
- Sort functionality

## State Management

### Redux Store Structure
```
{
    auth: {
        user: {},
        token: string,
        isAuthenticated: boolean
    },
    groups: {
        list: [],
        currentGroup: {},
        loading: boolean
    },
    expenses: {
        list: [],
        loading: boolean
    }
}
```

## API Integration

### Services
- `authService`: Handle login/register/logout
- `groupService`: Group CRUD operations
- `expenseService`: Expense management
- `settleService`: Settlement calculations

## Usage

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```
REACT_APP_API_URL=http://localhost:5000
```

4. Start development server:
```bash
npm start
```

## Component Usage Examples

### Adding a New Expense
```jsx
<ExpenseForm
    groupId={groupId}
    members={groupMembers}
    onSubmit={handleExpenseSubmit}
/>
```

### Displaying Group List
```jsx
<GroupList
    groups={userGroups}
    onGroupSelect={handleGroupSelect}
    onCreateGroup={handleCreateGroup}
/>
```

## Error Handling

- All API calls wrapped in try-catch blocks
- Global error handling through ErrorBoundary component
- Toast notifications for user feedback

## Authentication Flow

1. User logs in/registers
2. JWT token stored in localStorage
3. Token added to all subsequent API requests
4. Auto logout on token expiration

## Styling

- Styled using Tailwind CSS
- Responsive design
- Dark/Light theme support
