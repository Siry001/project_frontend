# API Documentation

This document provides an overview of the custom hooks and API services used in the GYM Project frontend.

## Custom Hooks

### useAuth

A custom hook that provides access to the authentication context, allowing components to interact with user authentication state and actions.

- **Usage:** `const { user, login, register, logout } = useAuth()`
- **Returns:** An object containing:
  - `user`: The current authenticated user object profile (like: { "id": 2, "name": "Mohamed", "email": "Mohamed@gmail.com" }) (null if not logged in)
  - `login(userData)`: Function to log in a user - **Parameters:** `userData` (object: `{ email: string, password: string }`)
  - `register(userData)`: Function to register a new user - **Parameters:** `userData` (object: `{ name: string, email: string, password: string }`)
  - `logout()`: Function to log out the current user

The hook automatically handles token management and user verification on mount.

## API Services

The API services are organized into modules, each handling specific endpoints. All services use Axios clients for HTTP requests.

Note: All services (except login and register) use axiosPrivateClient, which automatically intercepts requests to attach the Bearer token from cookies and handles 401 Unauthenticated errors.

### Auth Services (`authServices.js`)

Handles user authentication operations.

- **login(userData)**: Authenticates a user.
  - **Parameters:** `userData` (object: `{ email: string, password: string }`)
  - **Returns:** Authentication response data (includes token)
  - **Throws:** Error if credentials are invalid

- **register(userData)**: Registers a new user.
  - **Parameters:** `userData` (object: `{ name: string, email: string, password: string }`)
  - **Returns:** Registration response data (includes token)

- **logout()**: Logs out the current user.
  - **Returns:** Logout response data

### Profile Services (`profileServices.js`)

Manages user profile data.

- **getProfile()**: Retrieves the current user's profile.
  - **Returns:** Profile data

### Workouts Services (`workoutsServices.js`)

Handles workout-related operations.

- **CreateWorkout(workout)**: Creates a new workout.
  - **Parameters:** `workout` (object: `{ name: string, description: string, duration: number, workout_plan_id: number }`)
  - **Returns:** Created workout data

- **getAllWorkouts()**: Retrieves all workouts.
  - **Returns:** Promise<Array of workouts>

- **getWorkoutDetails(id)**: Gets progress details for a specific workout.
  - **Parameters:** `id` (workout ID: number)
  - **Returns:** Workout progress data

- **deleteWorkout(id)**: Deletes a workout.
  - **Parameters:** `id` (workout ID: number)
  - **Returns:** Deletion response

- **editWorkout(id, workout)**: Updates a workout.
  - **Parameters:** `id` (workout ID: number), `workout` (object: `{ name: string, description: string, duration: number }`)
  - **Returns:** Updated workout data

### Plans Services (`plansServices.js`)

Manages workout plans.

- **createPlan(plan)**: Creates a new workout plan.
  - **Parameters:** `plan` (object: `{ plan_text: string }`)
  - **Returns:** Created plan data

- **getAllPlans()**: Retrieves all workout plans.
  - **Returns:** Promise<Array of plans>

- **getPlanDetails(id)**: Gets details of a specific plan.
  - **Parameters:** `id` (plan ID: number)
  - **Returns:** Plan details

- **deletePlan(id)**: Deletes a workout plan.
  - **Parameters:** `id` (plan ID: number)
  - **Returns:** Deletion response

### Logs Services (`logsServices.js`)

Handles workout logs.

- **createLog(log)**: Creates a new workout log.
  - **Parameters:** `log` (object: `{ workout_id: number, weight: number, reps: number, sets: number, performed_at: string }`)
  - **Returns:** Created log data

- **getAllLogs()**: Retrieves all workout logs.
  - **Returns:** Promise<Array of logs>

- **getLogDetails(id)**: Gets details of a specific log.
  - **Parameters:** `id` (log ID: number)
  - **Returns:** Log details

- **deleteLog(id)**: Deletes a workout log.
  - **Parameters:** `id` (log ID: number)
  - **Returns:** Deletion response

### Diet Plans Services (`dietPlansServices.js`)

Manages diet plans.

- **createDietPlan(dietPlan)**: Creates a new diet plan.
  - **Parameters:** `dietPlan` (object: `{ title: string, description: string }`)
  - **Returns:** Created diet plan data

- **getAllDietPlans()**: Retrieves all diet plans.
  - **Returns:** Promise<Array of diet plans>

- **getDietPlanDetails(id)**: Gets details of a specific diet plan.
  - **Parameters:** `id` (diet plan ID: number)
  - **Returns:** Diet plan details

- **deleteDietPlan(id)**: Deletes a diet plan.
  - **Parameters:** `id` (diet plan ID: number)
  - **Returns:** Deletion response

- **editDietPlan(id, dietPlan)**: Updates a diet plan.
  - **Parameters:** `id` (diet plan ID: number), `dietPlan` (object: `{ title: string, description: string }`)
  - **Returns:** Updated diet plan data

### AI Features Services (`aiFeaturesServices.js`)

Provides AI-generated content for workouts and diets.

- **generateAiWorkout(target)**: Generates an AI workout plan.
  - **Parameters:** `target` (object: `{ goal: string, level: string, days: number }`)
  - **Returns:** AI-generated workout data

- **generateAiDietPlan(target)**: Generates an AI diet plan.
  - **Parameters:** `target` (object: `{ goal: string, weight: number, meals: number }`)
  - **Returns:** AI-generated diet plan data

### Token Services (`tokenServices.js`)

Manages authentication tokens using cookies.

- **setToken(token)**: Stores the authentication token in cookies.
  - **Parameters:** `token`

- **getToken()**: Retrieves the stored authentication token.
  - **Returns:** Token string or undefined

- **deleteToken()**: Removes the authentication token from cookies.
