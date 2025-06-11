# Manual Frontend Take-Home Challenge

This project is a solution for the Manual Frontend Engineer take-home challenge. It's a responsive landing page with an integrated quiz system to help users determine if Manual's hair loss treatment is right for them.

## Project Structure

```
src/
├── components/
│   ├── quiz/
│   │   ├── QuizModal.tsx          # Full-screen quiz container
│   │   ├── QuizQuestion.tsx       # Individual question display with navigation
│   │   └── QuizResults.tsx        # Results page with eligibility determination
│   ├── layout/
│   │   ├── ReduxProvider.tsx      # Redux store provider wrapper
│   │   ├── Header.tsx             # Site navigation header
│   │   └── Footer.tsx             # Site footer with links and social media
│   ├── ui/
│   │   └── Button.tsx             # Reusable button component with variants
│   └── sections/
│   │   ├── HeroSection.tsx        # Landing page hero with quiz trigger
│   │   └── ServicesSection.tsx    # Services showcase with alternating layout
├── store/
│   ├── quiz/
│   │   ├── slice.ts              # Redux quiz slice with actions
│   │   ├── actions.ts            # Async thunk for API calls
│   │   ├── reducers.ts           # Pure reducer functions
│   │   ├── constants.ts          # Initial state constants
│   │   └── @types.ts             # TypeScript interfaces
│   └── index.ts                  # Store configuration
├── hooks/
│   └── redux.ts                  # Typed Redux hooks
├── constants/
│   └── colors.ts                 # Design system color palette
├── data/
│   └── services.ts               # Static services data
└── app/
    ├── api/
    │   └── quiz.ts               # Next.js API route for quiz data
    └── page.tsx                 # Main landing page
```

## My Approach

I made several key technology decisions at the start of this challenge:

1. **Next.js**: Although I'm not deeply familiar with Next.js, I chose to use it because it was suggested in the requirements and I wanted to challenge myself with learning a new framework during the implementation.

2. **Redux Toolkit**: I implemented Redux for state management to demonstrate advanced state architecture patterns. While simpler solutions like React Context could have worked, I wanted to showcase my ability to structure complex state management with proper separation of concerns.

3. **TypeScript**: I used TypeScript throughout to ensure type safety and better developer experience, especially important when working with the dynamic quiz data from the API.

4. **Emotion**: I chose Emotion for CSS-in-JS to create a component-based styling architecture that's both maintainable and performant.

### Analysis and Planning

I started by analyzing the Figma design and requirements to understand what needed to be built. The key requirements were:

1. Create a responsive landing page matching the provided design
2. Implement a dynamic quiz system that fetches questions from an API
3. Handle rejection logic based on user responses
4. Provide navigation between questions with state persistence
5. Display appropriate results based on user eligibility

My development process followed this sequence:

1. **API Data Analysis**: First, I examined the quiz API structure to understand the data format, question types, and rejection logic that would drive the application architecture.

2. **Initial Testing Setup**: I wrote basic tests for the Redux slice to establish the core quiz flow and state management patterns before building components.

3. **Component Development**: I built the landing page components first (Hero, Services, Footer), then implemented the quiz system with proper modal overlay and navigation.

4. **Comprehensive Testing**: Once the core functionality was working, I expanded the test suite to cover the complete quiz flow, including edge cases like navigation, answer selection, and rejection scenarios.

## Testing Strategy

I implemented comprehensive testing across both Redux logic and React components:

### Redux Testing (`quizSlice.test.ts`)
- Initial state verification
- Quiz open/close functionality
- Answer selection with rejection handling
- Question navigation (next/previous)
- Quiz completion scenarios

### Component Testing
- **ServicesSection**: Service rendering and responsive layout
- **HeroSection**: Quiz triggering and content display
- **QuizFlow**: Complete integration testing of the quiz experience

The tests cover the entire user journey from landing page interaction through quiz completion, including error states and edge cases.

## Architecture Decisions

### **Redux Architecture**
I structured the Redux store with clear separation of concerns:
- `slice.ts`: Main slice configuration with action creators
- `reducers.ts`: Pure reducer functions for state updates
- `actions.ts`: Async thunks for API calls
- `@types.ts`: Complete TypeScript interface definitions

### **Component Organization**
- `sections/`: Landing page layout components
- `quiz/`: Quiz-specific components with isolated logic
- `ui/`: Reusable UI components with variant support

### **API Integration**
I created a Next.js API route (`/api/quiz`) that proxies requests to the Manual case study endpoint, providing a clean separation between frontend and external APIs.

## Future Improvements

With more time, I would add:

1. **Enhanced Mobile Design**: More refined mobile layouts and touch interactions for better user experience
2. **Styling Polish**: Fine-tuned spacing, animations, and visual polish to match the Figma design more precisely
3. **Accessibility Improvements**: Enhanced keyboard navigation, ARIA labels, and screen reader support
4. **Performance Optimization**: Implement lazy loading for quiz components and optimize bundle size
5. **Error Boundaries**: Add React error boundaries for better error handling and user experience
6. **Analytics Integration**: Track quiz completion rates and user drop-off points

## Technical Highlights

- **Dynamic Quiz System**: Fully configurable quiz that adapts to any question structure from the API
- **Rejection Logic**: Smart handling of rejection scenarios that immediately shows results when triggered
- **Responsive Design**: Mobile-first approach with graceful degradation across screen sizes
- **Type Safety**: Complete TypeScript coverage ensuring robust data handling
- **Testing Coverage**: Comprehensive test suite covering both unit and integration scenarios

---

## Getting Started

### Prerequisites
- Node.js (any recent version)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/MCKataoka/manual-landing-page.git

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run test         # Run test suite
npm run test:watch   # Run tests in watch mode
npm run lint         # Run ESLint
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## API Integration

The application fetches quiz data from Manual's case study API via a Next.js API route:

- **Endpoint**: `/api/quiz`
- **External Source**: `https://manual-case-study.herokuapp.com/questionnaires/972423.json`
- **Method**: GET
- **Response**: Dynamic quiz questions with rejection logic