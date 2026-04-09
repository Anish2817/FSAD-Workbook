import { useEffect, useMemo, useState } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const initialForm = {
  name: "",
  email: "",
  course: "",
  rating: "",
  message: ""
};

function App() {
  const [formData, setFormData] = useState(initialForm);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch(`${API_URL}/api/feedbacks`);
      const data = await response.json();
      setFeedbacks(data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      setStatusMessage("Unable to load feedback records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMessage("");

    try {
      const response = await fetch(`${API_URL}/api/feedbacks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          rating: Number(formData.rating)
        })
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      setFormData(initialForm);
      setStatusMessage("Feedback submitted successfully.");
      fetchFeedbacks();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setStatusMessage("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const stats = useMemo(() => {
    const total = feedbacks.length;
    const avg =
      total === 0
        ? 0
        : (
            feedbacks.reduce((sum, item) => sum + Number(item.rating || 0), 0) / total
          ).toFixed(1);

    const highRated = feedbacks.filter((item) => Number(item.rating) >= 4).length;

    return { total, avg, highRated };
  }, [feedbacks]);

  return (
    <div className="page-shell">
      <div className="bg-orb bg-orb--one"></div>
      <div className="bg-orb bg-orb--two"></div>
      <div className="grid-lines"></div>

      <header className="hero">
        <div className="hero__content">
          <span className="hero__tag">Full Stack Deployment Project</span>
          <h1>Student Feedback Management System</h1>
          <p>
            A modern feedback portal built with React and Spring Boot. Collect
            student input, track ratings, and view responses in a clean dashboard.
          </p>

          <div className="hero__stats">
            <div className="stat-card">
              <h3>{stats.total}</h3>
              <p>Total Responses</p>
            </div>
            <div className="stat-card">
              <h3>{stats.avg}</h3>
              <p>Average Rating</p>
            </div>
            <div className="stat-card">
              <h3>{stats.highRated}</h3>
              <p>4+ Star Reviews</p>
            </div>
          </div>
        </div>
      </header>

      <main className="dashboard">
        <section className="panel panel--form">
          <div className="panel__header">
            <div>
              <span className="panel__eyebrow">Input Form</span>
              <h2>Share Your Feedback</h2>
            </div>
            <div className="panel__icon">✦</div>
          </div>

          <form onSubmit={handleSubmit} className="feedback-form">
            <div className="form-grid">
              <div className="input-box">
                <label>Student Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-box">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-box">
                <label>Course Name</label>
                <input
                  type="text"
                  name="course"
                  placeholder="Example: Full Stack Development"
                  value={formData.course}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-box">
                <label>Rating</label>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose your rating</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>
            </div>

            <div className="input-box input-box--full">
              <label>Feedback Message</label>
              <textarea
                name="message"
                rows="6"
                placeholder="Write your learning experience, suggestions, and comments..."
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="form-footer">
              <button type="submit" className="submit-btn" disabled={submitting}>
                <span>{submitting ? "Submitting..." : "Submit Feedback"}</span>
              </button>

              {statusMessage && <p className="status-text">{statusMessage}</p>}
            </div>
          </form>
        </section>

        <section className="panel panel--list">
          <div className="panel__header">
            <div>
              <span className="panel__eyebrow">Live Records</span>
              <h2>Recent Feedback</h2>
            </div>
            <div className="panel__icon">★</div>
          </div>

          {loading ? (
            <div className="empty-box">Loading feedback records...</div>
          ) : feedbacks.length === 0 ? (
            <div className="empty-box">No feedback submitted yet.</div>
          ) : (
            <div className="feedback-list">
              {feedbacks.map((item) => (
                <article className="feedback-card" key={item.id}>
                  <div className="feedback-card__top">
                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.email}</p>
                    </div>
                    <div className="rating-pill">{item.rating}/5</div>
                  </div>

                  <div className="feedback-card__meta">
                    <span className="course-pill">{item.course}</span>
                  </div>

                  <p className="feedback-card__message">{item.message}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;