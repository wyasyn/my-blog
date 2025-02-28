export const sampleMarkdown = `---
title: "Introduction to Machine Learning"
author: "John Doe"
date: "2025-02-23"
tags:
  - machine learning
  - AI
  - tutorial
description: "A beginner-friendly introduction to machine learning concepts."
---


Machine learning is a subset of artificial intelligence (AI) that allows systems to learn from data and make predictions or decisions without being explicitly programmed.

## What is Machine Learning?

Machine learning (ML) involves training algorithms on datasets to recognize patterns and make decisions. It is commonly categorized into:

- **Supervised Learning**: Learning from labeled data.
- **Unsupervised Learning**: Finding patterns in unlabeled data.
- **Reinforcement Learning**: Learning through rewards and penalties.

## Sample Python Code

Here’s a simple Python script that trains a machine learning model using scikit-learn:

\`\`\`python
from sklearn.linear_model import LinearRegression
import numpy as np

# Sample dataset
X = np.array([[1], [2], [3], [4], [5]])
y = np.array([2, 4, 6, 8, 10])

# Train a model
model = LinearRegression()
model.fit(X, y)

# Make a prediction
prediction = model.predict([[6]])
print("Predicted value for input 6:", prediction[0])
\`\`\`

## Why is Machine Learning Important?

Machine learning powers various applications, including:

- Spam email detection
- Recommendation systems (Netflix, YouTube)
- Fraud detection in banking
- Self-driving cars

> "Machine learning is the next internet." - Tony Tether

## Conclusion

Machine learning is a powerful tool shaping many industries. Getting started requires understanding the basics of data, algorithms, and model evaluation.

---

Want to learn more? Check out [our guide](https://example.com).


`;
