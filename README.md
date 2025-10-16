# Product Management Dashboard

This is a simple, single-page web application for managing products, built with React, TypeScript, and Tailwind CSS. It uses the [Fake Store API](https://fakestoreapi.com/) for backend data.

## Features

- **View Products**: Fetches and displays a list of products in a responsive card layout.
- **Add, Edit, Delete**: Perform CRUD operations on products.
  - **Add**: A form to add a new product (mocked API call).
  - **Edit**: A form to edit an existing product (mocked API call).
  - **Delete**: Remove a product from the list (mocked API call).
- **Preview**: View a product's full details in a modal.
- **Search**: Filter products by title in real-time.
- **Filter by Category**: Filter products based on their category.
- **Loading & Error States**: Displays loading spinners and error messages for API interactions.
- **TypeScript**: Fully typed codebase for better maintainability.
- **Dockerized**: Includes a `Dockerfile` for easy containerization and deployment.

## Tech Stack

- **Frontend**: [React](https://reactjs.org/) (v18) with functional components and hooks.
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **API Client**: [Axios](https://axios-http.com/)
- **API**: [Fake Store API](https://fakestoreapi.com/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or later)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```sh
   cd product-dashboard
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

### Running the Application

To start the development server, run:

```sh
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Docker

This project can be built and run as a Docker container.

### Build the Docker Image

From the project root directory, run:

```sh
docker build -t product-dashboard .
```

### Run the Docker Container

To run the image you just built, use the following command:

```sh
docker run -p 8080:80 product-dashboard
```

The application will be accessible at [http://localhost:8080](http://localhost:8080).