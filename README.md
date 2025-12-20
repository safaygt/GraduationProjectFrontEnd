# Graduation Project – Frontend

This repository contains the frontend (client-side) implementation of a TÜBİTAK-supported Graduation Project aimed at increasing recycling awareness through image-based waste classification.

The frontend is developed using React and provides a user-friendly interface for image upload, authentication, and visualization of recycling analysis results.

---


## About the Project

Graduation Project Frontend is a web application where users can:
<ul>
<li>Register and log in securely</li>

<li>Upload waste images</li>

<li>View AI-based recycling predictions</li>

<li>Track their personal recycling history</li>

</ul>


The frontend communicates with the Spring Boot backend via REST APIs and displays the results produced by the Flask-based AI model.

### Frontend Responsibilities

<ul>
  <li>User authentication and session handling</li>
  <li>Image upload UI and request handling</li>
  <li>Displaying AI prediction results</li>
  <li>User-based recycling history visualization</li>
  <li>Providing a responsive and clean user interface</li> 
</ul>

---


## Features

<ul>
  <li>JWT-based authentication integration</li>
  <li> Image upload and preview</li>
  <li> Display of AI model detection results</li>
  <li> User-specific recycling history</li>
  <li> REST API integration with backend</li>
  <li> Responsive UI</li>
  <li> Docker & Nginx support</li>
</ul>


---


## Setup & Installation

### 1. Clone the Repository


```bash
git clone https://github.com/safaygt/GraduationProjectFrontEnd.git

cd GraduationProjectFrontEnd
```

### 2. Run Locally

```bash
npm install
npm run dev
```

### 4. Run with Docker (Recommended)

```bash
docker-compose up --build -d
```


Related Repositories
<ul> 
  <li>Backend (Spring Boot)</li>
  <p>[Graduation Project Backend → GitHub](https://github.com/safaygt/graduation-project.git)</p>
  
  <li>AI Model API (Flask + YOLO)</li>
  <p>[Graduation Project Model Deployment → GitHub](https://github.com/safaygt/GraduationProjectDeployModel.git)</p>
</ul>

Note: The backend service must be running before the frontend can function properly.


<h1>Developer</h1>

Safa Yiğit
GitHub: [@safaygt](https://github.com/safaygt)  
