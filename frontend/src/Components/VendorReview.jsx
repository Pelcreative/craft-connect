
import { useState, useMemo } from "react";
import {
  Star,
  Smile,
  Meh,
  Frown,
  Search,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Camera,
  Utensils,
  Palette,
  Sparkles,
  CalendarDays,
  TrendingUp,
  MessageCircle,
  ArrowUpRight,
  Eye,
  X,
  Send,
  ThumbsUp,
} from "lucide-react";

import "./VendorReview.css";

const reviewsData = [
  {
    id: 1,
    name: "Chioma Eze",
    avatar: "https://i.pravatar.cc/100?img=47",
    date: "May 28, 2025",
    time: "2:14 PM",
    rating: 5,
    service: "Photography",
    comment:
      "Absolutely amazing service! The photographer was professional, creative and made the whole experience enjoyable. The photos came out beautifully.",
    status: "Published",
  },
  {
    id: 2,
    name: "Tolu Adeyemi",
    avatar: "https://i.pravatar.cc/100?img=12",
    date: "May 27, 2025",
    time: "11:32 AM",
    rating: 5,
    service: "Catering",
    comment:
      "The catering service was top notch! The food was delicious and everything was well organized. My guests loved it!",
    status: "Published",
  },
  {
    id: 3,
    name: "Amaka Johnson",
    avatar: "https://i.pravatar.cc/100?img=44",
    date: "May 26, 2025",
    time: "4:17 PM",
    rating: 4,
    service: "Makeup Artistry",
    comment:
      "Great experience overall. The makeup artist was friendly and really skilled. I loved my look!",
    status: "Published",
  },
  {
    id: 4,
    name: "Daniel Okafor",
    avatar: "https://i.pravatar.cc/100?img=13",
    date: "May 25, 2025",
    time: "1:45 PM",
    rating: 5,
    service: "Event Decoration",
    comment:
      "Very professional and delivered exactly what I wanted. The event decoration was stunning!",
    status: "Published",
  },
  {
    id: 5,
    name: "Blessing Uche",
    avatar: "https://i.pravatar.cc/100?img=49",
    date: "May 24, 2025",
    time: "10:22 AM",
    rating: 5,
    service: "Food & Drinks",
    comment:
      "I really appreciate the quick response and excellent service. Will definitely book again!",
    status: "Published",
  },
  {
    id: 6,
    name: "Ifeanyi Chukwudi",
    avatar: "https://i.pravatar.cc/100?img=14",
    date: "May 23, 2025",
    time: "3:08 PM",
    rating: 4,
    service: "Catering",
    comment:
      "Good service and friendly staff. The only reason for 4 stars is that it was slightly delayed, but it was worth it.",
    status: "Published",
  },
];

const metrics = [
  {
    title: "Total Reviews",
    value: "86",
    change: "12%",
    icon: Star,
    color: "orange",
  },
  {
    title: "Positive Reviews",
    value: "78",
    change: "18%",
    icon: Smile,
    color: "green",
  },
  {
    title: "Neutral Reviews",
    value: "5",
    change: "2%",
    icon: Meh,
    color: "purple",
  },
  {
    title: "Negative Reviews",
    value: "3",
    change: "1%",
    icon: Frown,
    color: "pink",
    negative: true,
  },
];

function RatingStars({ rating }) {
  return (
    <div className="vr-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={15}
          fill={star <= rating ? "currentColor" : "none"}
          strokeWidth={2}
          className={star <= rating ? "filled-star" : "empty-star"}
        />
      ))}
      <span>{rating.toFixed(1)}</span>
    </div>
  );
}

function VendorReview() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Reviews");
  const [period, setPeriod] = useState("This Month");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showFilter, setShowFilter] = useState(false);

  const filteredReviews = useMemo(() => {
    return reviewsData.filter((review) => {
      const matchesSearch =
        review.name.toLowerCase().includes(search.toLowerCase()) ||
        review.service.toLowerCase().includes(search.toLowerCase()) ||
        review.comment.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All Reviews" ||
        (filter === "5 Stars" && review.rating === 5) ||
        (filter === "4 Stars" && review.rating === 4) ||
        (filter === "Positive" && review.rating >= 4) ||
        (filter === "Negative" && review.rating <= 2);

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const reviewsPerPage = 6;
  const totalPages = Math.max(
    1,
    Math.ceil(filteredReviews.length / reviewsPerPage)
  );

  const displayedReviews = filteredReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleFilter = (value) => {
    setFilter(value);
    setCurrentPage(1);
    setShowFilter(false);
  };

  return (
    <main className="vendor-review">

      {/* Page Heading */}
      <section className="vr-heading">
        <div className="vr-heading-icon">
          <Star size={27} fill="currentColor" />
        </div>

        <div>
          <h1>Reviews</h1>
          <p>See what your customers are saying about your services and work.</p>
        </div>

        <div className="vr-heading-decoration">
          <div className="vr-decoration-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={18} fill="currentColor" />
            ))}
          </div>
          <Sparkles size={28} />
        </div>
      </section>

      {/* Statistics */}
      <section className="vr-stats">
        {metrics.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              className={`vr-stat-card ${item.color}`}
              key={item.title}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="vr-stat-icon">
                <Icon size={24} fill="currentColor" />
              </div>

              <div className="vr-stat-content">
                <p>{item.title}</p>
                <h2>{item.value}</h2>

                <div className={item.negative ? "vr-down" : "vr-up"}>
                  <TrendingUp size={13} />
                  <strong>{item.change}</strong>
                  <span>from last month</span>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Main Dashboard Grid */}
      <section className="vr-dashboard-grid">

        {/* Reviews List */}
        <div className="vr-reviews-panel">

          {/* Search and Filters */}
          <div className="vr-toolbar">
            <div className="vr-search">
              <Search size={19} />
              <input
                type="text"
                placeholder="Search reviews by customer name, service, or keyword..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
              {search && (
                <button
                  className="vr-clear-search"
                  onClick={() => handleSearch("")}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="vr-filter-wrapper">
              <button
                className="vr-select-button"
                onClick={() => setShowFilter(!showFilter)}
              >
                {filter}
                <ChevronDown size={16} />
              </button>

              {showFilter && (
                <div className="vr-filter-menu">
                  {[
                    "All Reviews",
                    "5 Stars",
                    "4 Stars",
                    "Positive",
                    "Negative",
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={() => handleFilter(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              className="vr-filter-button"
              onClick={() => setShowFilter(!showFilter)}
            >
              <Filter size={15} />
              Filter
              <ChevronDown size={14} />
            </button>
          </div>

          {/* Reviews Header */}
          <div className="vr-panel-title">
            <div>
              <h2>Customer Reviews</h2>
              <p>Manage and respond to customer feedback.</p>
            </div>

            <span className="vr-review-count">
              {filteredReviews.length} Reviews
            </span>
          </div>

          {/* Review Items */}
          <div className="vr-review-list">
            {displayedReviews.length > 0 ? (
              displayedReviews.map((review, index) => (
                <article
                  className="vr-review-item"
                  key={review.id}
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <img
                    className="vr-avatar"
                    src={review.avatar}
                    alt={review.name}
                  />

                  <div className="vr-review-customer">
                    <h3>{review.name}</h3>
                    <p>
                      {review.date}
                      <span>•</span>
                      {review.time}
                    </p>
                    <RatingStars rating={review.rating} />
                  </div>

                  <div className="vr-review-comment">
                    <p>{review.comment}</p>
                  </div>

                  <div className="vr-review-service">
                    <span>
                      {review.service === "Photography" ? (
                        <Camera size={14} />
                      ) : review.service === "Catering" ||
                        review.service === "Food & Drinks" ? (
                        <Utensils size={14} />
                      ) : (
                        <Sparkles size={14} />
                      )}
                      {review.service}
                    </span>
                  </div>

                  <div className="vr-review-status">
                    <span>{review.status}</span>
                  </div>

                  <div className="vr-review-actions">
                    <button
                      className="vr-more-button"
                      onClick={() =>
                        setActiveMenu(
                          activeMenu === review.id ? null : review.id
                        )
                      }
                      aria-label="Review actions"
                    >
                      <MoreVertical size={19} />
                    </button>

                    {activeMenu === review.id && (
                      <div className="vr-action-menu">
                        <button onClick={() => {
                          setSelectedReview(review);
                          setActiveMenu(null);
                        }}>
                          <Eye size={15} /> View Review
                        </button>
                        <button onClick={() => {
                          setSelectedReview(review);
                          setActiveMenu(null);
                        }}>
                          <MessageCircle size={15} /> Respond
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              ))
            ) : (
              <div className="vr-empty">
                <Search size={35} />
                <h3>No reviews found</h3>
                <p>Try changing your search or filter.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="vr-pagination">
            <p>
              Showing {filteredReviews.length > 0
                ? (currentPage - 1) * reviewsPerPage + 1
                : 0}
              {" - "}
              {Math.min(currentPage * reviewsPerPage, filteredReviews.length)}
              {" of "}
              {filteredReviews.length} reviews
            </p>

            <div className="vr-page-buttons">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                aria-label="Previous page"
              >
                <ChevronLeft size={18} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={currentPage === page ? "active" : ""}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                aria-label="Next page"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="vr-right-sidebar">

          {/* Review Overview */}
          <div className="vr-side-card vr-overview">
            <div className="vr-side-title">
              <h2>Review Overview</h2>

              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
              >
                <option>This Month</option>
                <option>Last Month</option>
                <option>This Year</option>
                <option>All Time</option>
              </select>
            </div>

            <div className="vr-overview-content">
              <div className="vr-donut">
                <div className="vr-donut-inner">
                  <h3>86</h3>
                  <span>Total Reviews</span>
                </div>
              </div>

              <div className="vr-rating-breakdown">
                {[
                  ["5 Stars", "78 (90%)", "#ffad37"],
                  ["4 Stars", "5 (6%)", "#2698fa"],
                  ["3 Stars", "2 (2%)", "#9254ff"],
                  ["2 Stars", "1 (1%)", "#ff5722"],
                  ["1 Star", "0 (0%)", "#ff4775"],
                ].map(([label, value, color]) => (
                  <div className="vr-rating-row" key={label}>
                    <span
                      className="vr-rating-dot"
                      style={{ background: color }}
                    />
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="vr-side-card">
            <div className="vr-side-title">
              <h2>Recent Reviews</h2>
              <button
                onClick={() => {
                  setSearch("");
                  setFilter("All Reviews");
                  setCurrentPage(1);
                }}
              >
                View All <ArrowUpRight size={14} />
              </button>
            </div>

            <div className="vr-recent-list">
              {reviewsData.slice(0, 5).map((review) => (
                <button
                  className="vr-recent-item"
                  key={review.id}
                  onClick={() => setSelectedReview(review)}
                >
                  <img src={review.avatar} alt={review.name} />

                  <div>
                    <h3>{review.name}</h3>
                    <RatingStars rating={review.rating} />
                  </div>

                  <ChevronRight size={17} />
                </button>
              ))}
            </div>
          </div>

          {/* Promotional Card */}
          <div className="vr-promo-card">
            <div className="vr-promo-icon">
              <Star size={29} fill="currentColor" />
            </div>

            <div className="vr-promo-content">
              <h3>Respond to Reviews</h3>
              <p>
                Show your customers you care by responding to their feedback.
              </p>

              <button onClick={() => {
                document.querySelector(".vr-review-list")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}>
                Manage Reviews <ArrowUpRight size={15} />
              </button>
            </div>

            <Sparkles className="vr-promo-sparkle" size={25} />
          </div>

        </aside>
      </section>

      {/* Review Details Modal */}
      {selectedReview && (
        <div
          className="vr-modal-overlay"
          onClick={() => setSelectedReview(null)}
        >
          <div
            className="vr-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="vr-modal-header">
              <h2>Customer Review</h2>
              <button onClick={() => setSelectedReview(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="vr-modal-customer">
              <img
                src={selectedReview.avatar}
                alt={selectedReview.name}
              />
              <div>
                <h3>{selectedReview.name}</h3>
                <p>{selectedReview.date} • {selectedReview.time}</p>
              </div>
            </div>

            <RatingStars rating={selectedReview.rating} />

            <div className="vr-modal-service">
              <Sparkles size={16} />
              {selectedReview.service}
            </div>

            <p className="vr-modal-comment">
              {selectedReview.comment}
            </p>

            <div className="vr-modal-reply">
              <label htmlFor="vr-reply">Your response</label>
              <textarea
                id="vr-reply"
                placeholder="Write a thoughtful response to your customer..."
              />
              <button onClick={() => setSelectedReview(null)}>
                <Send size={15} />
                Send Response
              </button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}

export default VendorReview;
