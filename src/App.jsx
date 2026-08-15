import "./App.css";
import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";

const API_URL = "https://quizmaster-backend-g2mn.onrender.com";

// =====================================================
// AUTH HELPERS
// =====================================================

function getUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
}

function isLoggedIn() {
  return !!localStorage.getItem("user");
}

// =====================================================
// PROTECTED ROUTE
// =====================================================

function ProtectedRoute({ children }) {
  const user = getUser();

  if (!user) {
    return <LoginRequired />;
  }

  return children;
}

// =====================================================
// LOGIN REQUIRED
// =====================================================

function LoginRequired() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login", { replace: true });
  }, [navigate]);

  return null;
}

// =====================================================
// QUIZ DATA
// =====================================================

const javascriptQuestions = [
  {
    question: "Which keyword is used to declare a constant in JavaScript?",
    options: ["const", "let", "var", "static"],
    answer: "const",
  },
  {
    question: "Which method converts a JavaScript object into a JSON string?",
    options: [
      "JSON.stringify()",
      "JSON.parse()",
      "JSON.convert()",
      "JSON.toString()",
    ],
    answer: "JSON.stringify()",
  },
  {
    question: "Which operator is used for strict equality in JavaScript?",
    options: ["===", "==", "=", "!=="],
    answer: "===",
  },
  {
    question: "Which method adds an element to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    answer: "push()",
  },
  {
    question: "What type of value does typeof null return in JavaScript?",
    options: ["object", "null", "undefined", "string"],
    answer: "object",
  },
];

const htmlCSSQuestions = [
  {
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "HighText Machine Language",
      "Hyperlink Text Management Language",
      "Home Tool Markup Language",
    ],
    answer: "HyperText Markup Language",
  },
  {
    question: "What is CSS mainly used for?",
    options: [
      "Styling web pages",
      "Creating databases",
      "Running a server",
      "Storing passwords",
    ],
    answer: "Styling web pages",
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["<a>", "<link>", "<href>", "<url>"],
    answer: "<a>",
  },
  {
    question: "Which CSS property is used to change the text color?",
    options: ["color", "text-color", "font-color", "background-color"],
    answer: "color",
  },
  {
    question: "Which HTML element is used to create the largest heading?",
    options: ["<h1>", "<h6>", "<heading>", "<head>"],
    answer: "<h1>",
  },
];

const dbmsQuestions = [
  {
    question: "What does DBMS stand for?",
    options: [
      "Database Management System",
      "Data Backup Management System",
      "Database Machine System",
      "Data Management Software",
    ],
    answer: "Database Management System",
  },
  {
    question: "Which language is commonly used to query a relational database?",
    options: ["SQL", "HTML", "CSS", "XML"],
    answer: "SQL",
  },
  {
    question: "Which key uniquely identifies a record in a table?",
    options: ["Primary Key", "Foreign Key", "Candidate Key", "Composite Key"],
    answer: "Primary Key",
  },
  {
    question: "What is a foreign key used for?",
    options: [
      "To create a relationship between tables",
      "To delete a database",
      "To store images",
      "To create a password",
    ],
    answer: "To create a relationship between tables",
  },
  {
    question: "Which command is used to retrieve data from a database?",
    options: ["SELECT", "DELETE", "UPDATE", "INSERT"],
    answer: "SELECT",
  },
];

// =====================================================
// HELPERS
// =====================================================

function shuffleArray(array) {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

const quizData = [
  {
    name: "JavaScript",
    type: "javascript",
    questions: javascriptQuestions,
  },
  {
    name: "HTML & CSS",
    type: "html-css",
    questions: htmlCSSQuestions,
  },
  {
    name: "DBMS",
    type: "dbms",
    questions: dbmsQuestions,
  },
];

const totalQuizzes = quizData.length;

const totalQuestions = quizData.reduce(
  (total, quiz) => total + quiz.questions.length,
  0
);

const totalCategories = quizData.length;

// =====================================================
// NAVBAR
// =====================================================

function Navbar() {
  const navigate = useNavigate();
  const user = getUser();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        📝 QuizMaster
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/quizzes">Quizzes</Link>
            <Link to="/leaderboard">Leaderboard</Link>

            <button className="nav-logout" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

// =====================================================
// HOME
// =====================================================

function Home() {
  const user = getUser();

  return (
    <div className="app">
      <Navbar />

      <section className="hero">
        <div className="hero-content">
          <p className="welcome">WELCOME TO QUIZMASTER</p>

          <h1>
            Test Your <span>Knowledge</span>
          </h1>

          <p className="description">
            Challenge yourself with interactive quizzes, improve your
            knowledge and track your progress.
          </p>

          <div className="buttons">
            {user ? (
              <Link to="/quizzes">
                <button className="primary-btn">Start Quiz</button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <button className="primary-btn">Login to Start</button>
                </Link>

                <Link to="/register">
                  <button className="secondary-btn">Create Account</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="stat-card">
          <h2>{totalQuizzes}</h2>
          <p>Quizzes</p>
        </div>

        <div className="stat-card">
          <h2>{totalCategories}</h2>
          <p>Categories</p>
        </div>

        <div className="stat-card">
          <h2>{totalQuestions}</h2>
          <p>Questions</p>
        </div>
      </section>
    </div>
  );
}

// =====================================================
// LOGIN
// =====================================================

function Login() {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const form = e.target;

    const email = form.email.value.trim();
    const password = form.password.value;

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful!");

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      console.error("Login Error:", error);

      alert(
        "Backend se connection nahi ho raha. Render backend check karo."
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">📝</div>

        <h1>Welcome Back!</h1>

        <p className="login-subtitle">
          Login to continue your quiz journey
        </p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email Address</label>

            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="register-text">
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

// =====================================================
// REGISTER
// =====================================================

function Register() {
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    try {
      const response = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      alert("Registration successful!");

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error("Registration Error:", error);

      alert(
        "Backend se connection nahi ho raha. Render backend check karo."
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">📝</div>

        <h1>Create Account</h1>

        <p className="login-subtitle">
          Join QuizMaster and start testing your knowledge
        </p>

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Full Name</label>

            <input
              name="name"
              type="text"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>

            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              name="password"
              type="password"
              placeholder="Create a password"
              minLength={6}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Create Account
          </button>
        </form>

        <p className="register-text">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

// =====================================================
// DASHBOARD
// =====================================================

function Dashboard() {
  const user = getUser();

  const quizResults = JSON.parse(
    localStorage.getItem("quizResults") || "[]"
  );

  const completedQuizzes = quizResults.length;

  const averageScore =
    completedQuizzes > 0
      ? Math.round(
          quizResults.reduce(
            (sum, result) => sum + result.percentage,
            0
          ) / completedQuizzes
        )
      : 0;

  return (
    <div className="dashboard">
      <Navbar />

      <div className="dashboard-content">
        <h1>
          Welcome back, {user?.name || "Student"}! 👋
        </h1>

        <p className="dashboard-subtitle">
          Test your knowledge and improve your skills.
        </p>

        <div className="dashboard-stats">
          <div className="dashboard-card">
            <h2>{totalQuizzes}</h2>
            <p>Total Quizzes</p>
          </div>

          <div className="dashboard-card">
            <h2>{completedQuizzes}</h2>
            <p>Completed</p>
          </div>

          <div className="dashboard-card">
            <h2>{averageScore}%</h2>
            <p>Average Score</p>
          </div>
        </div>

        <h2 className="section-title">Available Quizzes</h2>

        <div className="quiz-cards">
          {quizData.map((quiz) => (
            <div className="quiz-card" key={quiz.type}>
              <h3>{quiz.name} Quiz</h3>

              <p>{quiz.questions.length} questions available.</p>

              <Link to={`/quiz?type=${quiz.type}`}>
                <button>Start Quiz</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =====================================================
// QUIZ
// =====================================================

function Quiz() {
  const navigate = useNavigate();

  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const quizType = params.get("type") || "javascript";

  const selectedQuiz =
    quizData.find((quiz) => quiz.type === quizType) || quizData[0];

  const [questions] = useState(() =>
    shuffleArray(selectedQuiz.questions).map((question) => ({
      ...question,
      options: shuffleArray(question.options),
    }))
  );

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [timeLeft, setTimeLeft] = useState(600);

  const [selectedAnswers, setSelectedAnswers] = useState({});

  const [submitted, setSubmitted] = useState(false);

  const question = questions[currentQuestion];

  // ---------------------------------------------
  // TIMER
  // ---------------------------------------------

  useEffect(() => {
    if (timeLeft <= 0 && !submitted) {
      finishQuiz();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  // ---------------------------------------------
  // FINISH QUIZ
  // ---------------------------------------------

  const finishQuiz = () => {
    if (submitted) return;

    setSubmitted(true);

    let finalScore = 0;

    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.answer) {
        finalScore++;
      }
    });

    const total = questions.length;

    const percentage =
      total > 0 ? Math.round((finalScore / total) * 100) : 0;

    const oldResults = JSON.parse(
      localStorage.getItem("quizResults") || "[]"
    );

    oldResults.push({
      quizType,
      score: finalScore,
      total,
      percentage,
      date: new Date().toISOString(),
    });

    localStorage.setItem(
      "quizResults",
      JSON.stringify(oldResults)
    );

    navigate(
      `/result?score=${finalScore}&total=${total}`,
      {
        replace: true,
      }
    );
  };

  // ---------------------------------------------
  // NEXT
  // ---------------------------------------------

  const nextQuestion = () => {
    if (!selectedAnswers[currentQuestion]) {
      alert("Please select an answer first!");
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      finishQuiz();
    }
  };

  // ---------------------------------------------
  // PREVIOUS
  // ---------------------------------------------

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  return (
    <div className="quiz-page">
      <div className="quiz-header">
        <h2>📝 {selectedQuiz.name} Quiz</h2>

        <div className="timer">
          ⏱ {Math.floor(timeLeft / 60)}:
          {String(timeLeft % 60).padStart(2, "0")}
        </div>
      </div>

      <div className="quiz-container">
        <p className="question-number">
          Question {currentQuestion + 1} of {questions.length}
        </p>

        <h1 className="question">
          {question.question}
        </h1>

        <div className="options">
          {question.options.map((option, index) => (
            <label className="option" key={index}>
              <input
                type="radio"
                name="answer"
                value={option}
                checked={
                  selectedAnswers[currentQuestion] === option
                }
                onChange={(e) => {
                  setSelectedAnswers((prev) => ({
                    ...prev,
                    [currentQuestion]: e.target.value,
                  }));
                }}
              />

              <span>{option}</span>
            </label>
          ))}
        </div>

        <div className="quiz-buttons">
          <button
            className="previous-btn"
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>

          <button
            className="next-btn"
            onClick={nextQuestion}
          >
            {currentQuestion === questions.length - 1
              ? "Submit Quiz"
              : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

// =====================================================
// RESULT
// =====================================================

function Result() {
  const navigate = useNavigate();

  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const score = Number(params.get("score")) || 0;

  const total = Number(params.get("total")) || 0;

  const wrong = Math.max(total - score, 0);

  const percentage =
    total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <div className="result-page">
      <div className="result-card">
        <div className="result-icon">🏆</div>

        <h1>Quiz Completed!</h1>

        <p className="result-message">
          Great job! Here is your result.
        </p>

        <div className="score-box">
          <h2>
            {score} / {total}
          </h2>

          <p>Your Score</p>
        </div>

        <div className="result-details">
          <div>
            <strong>{score}</strong>
            <span>Correct</span>
          </div>

          <div>
            <strong>{wrong}</strong>
            <span>Wrong</span>
          </div>

          <div>
            <strong>{percentage}%</strong>
            <span>Percentage</span>
          </div>
        </div>

        <button
          className="next-btn"
          onClick={() => navigate("/quizzes")}
        >
          Try Again
        </button>

        <button
          className="previous-btn"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>
      </div>
    </div>
  );
}

// =====================================================
// QUIZZES
// =====================================================

function Quizzes() {
  return (
    <div className="dashboard">
      <Navbar />

      <div className="dashboard-content">
        <h1>Available Quizzes</h1>

        <p className="dashboard-subtitle">
          Choose a quiz and test your knowledge.
        </p>

        <div className="quiz-cards">
          {quizData.map((quiz) => (
            <div className="quiz-card" key={quiz.type}>
              <h3>{quiz.name} Quiz</h3>

              <p>{quiz.questions.length} questions</p>

              <Link to={`/quiz?type=${quiz.type}`}>
                <button>Start Quiz</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =====================================================
// LEADERBOARD
// =====================================================

function Leaderboard() {
  const quizResults = JSON.parse(
    localStorage.getItem("quizResults") || "[]"
  );

  const sortedResults = [...quizResults].sort(
    (a, b) => b.percentage - a.percentage
  );

  return (
    <div className="dashboard">
      <Navbar />

      <div className="dashboard-content">
        <h1>🏆 Leaderboard</h1>

        <p className="dashboard-subtitle">
          Your completed quiz results.
        </p>

        {sortedResults.length === 0 ? (
          <div className="quiz-card">
            <h3>No results yet</h3>

            <p>
              Complete a quiz to see your score here.
            </p>
          </div>
        ) : (
          <div className="quiz-cards">
            {sortedResults.map((result, index) => (
              <div className="quiz-card" key={index}>
                <h3>
                  #{index + 1}{" "}
                  {result.quizType}
                </h3>

                <p>
                  Score: {result.score}/{result.total}
                </p>

                <p>
                  Percentage: {result.percentage}%
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// =====================================================
// APP ROUTES
// =====================================================

function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* PROTECTED */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/quizzes"
        element={
          <ProtectedRoute>
            <Quizzes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/quiz"
        element={
          <ProtectedRoute>
            <Quiz />
          </ProtectedRoute>
        }
      />

      <Route
        path="/result"
        element={
          <ProtectedRoute>
            <Result />
          </ProtectedRoute>
        }
      />

      <Route
        path="/leaderboard"
        element={
          <ProtectedRoute>
            <Leaderboard />
          </ProtectedRoute>
        }
      />

      {/* FALLBACK */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;