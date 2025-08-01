import React, { createContext, useContext, useState } from 'react';

const ReviewsContext = createContext(null);

export const ReviewsProvider = ({ children }) => {
  // Mock reviews data - in real app, this would come from API
  const [reviews, setReviews] = useState({
    1: [
      {
        id: 1,
        userId: 1,
        userName: 'John Doe',
        rating: 5,
        comment: 'Excellent quality leather jacket! Fits perfectly and looks amazing.',
        date: '2024-11-15',
        verified: true
      },
      {
        id: 2,
        userId: 2,
        userName: 'Jane Smith',
        rating: 4,
        comment: 'Great jacket, but a bit pricey. Quality is definitely there though.',
        date: '2024-11-10',
        verified: true
      },
      {
        id: 3,
        userId: 3,
        userName: 'Mike Johnson',
        rating: 5,
        comment: 'Love this jacket! Perfect for the winter season.',
        date: '2024-11-05',
        verified: false
      }
    ],
    2: [
      {
        id: 4,
        userId: 4,
        userName: 'Sarah Wilson',
        rating: 4,
        comment: 'Comfortable cotton shirt, good value for money.',
        date: '2024-11-12',
        verified: true
      }
    ],
    3: [
      {
        id: 5,
        userId: 5,
        userName: 'David Brown',
        rating: 5,
        comment: 'Perfect fit and great quality denim.',
        date: '2024-11-08',
        verified: true
      }
    ]
  });

  const addReview = (productId, review) => {
    const newReview = {
      id: Date.now(),
      ...review,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews(prev => ({
      ...prev,
      [productId]: [...(prev[productId] || []), newReview]
    }));
  };

  const getProductReviews = (productId) => {
    return reviews[productId] || [];
  };

  const getProductRating = (productId) => {
    const productReviews = reviews[productId] || [];
    if (productReviews.length === 0) return 0;
    
    const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / productReviews.length;
  };

  const getReviewStats = (productId) => {
    const productReviews = reviews[productId] || [];
    const stats = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    
    productReviews.forEach(review => {
      stats[review.rating]++;
    });

    return {
      total: productReviews.length,
      average: getProductRating(productId),
      distribution: stats
    };
  };

  return (
    <ReviewsContext.Provider value={{
      reviews,
      addReview,
      getProductReviews,
      getProductRating,
      getReviewStats
    }}>
      {children}
    </ReviewsContext.Provider>
  );
};

export const useReviews = () => {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewsProvider');
  }
  return context;
};