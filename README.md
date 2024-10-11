# My Awesome RESTful API

This repository contains a RESTful API built with Node.js, Express.js, and MongoDB. The API provides functionality for managing products, including CRUD operations, input validations, image upload, user authentication, and stock management.

## Getting Started

To use this application, you'll need to clone the repository and install the required dependencies. Then, you can run the application locally.

### Prerequisites

Before running the application, make sure you have the following prerequisites installed on your machine:

- Node.js
- MongoDB

### Installation

1. Clone the repository to your local machine:

   ```shell
   git clone https://github.com/Awais8459/CRUD.git
   ```

2. Navigate to the project's root directory:

   ```shell
   cd CRUD
   ```

3. Install the backend dependencies:

   ```shell
   npm install
   ```

4. Navigate to the client directory:

   ```shell
   cd frontend
   ```

5. Install the frontend dependencies:

   ```shell
   npm install
   ```

### Configuration

Before running the application, you need to configure the database connection and other settings. Follow these steps:

1. Rename the `.env.example` file to `.env`.

2. Open the `.env` file and provide the necessary values for the following variables:

   - `MONGODB_URI`: The connection URL for your MongoDB database.
   - `JWT_SECRET`: A secret key used for JSON Web Token (JWT) generation.

### Running the Application

To start the application, follow these steps:

1. Navigate to the backend directory to start the backend server:

   ```shell
   cd backend
   npm run devStart
   ```

   This command will start the server and establish a connection to the MongoDB database.

2. In a separate terminal, navigate to the client directory:

   ```shell
   cd client
   ```

3. Start the frontend development server:

   ```shell
   npm start
   ```

   This command will start the React development server and open the application in your default browser.

## Usage

Once the application is up and running, you can use it to perform various operations on products. Here are the available endpoints:

- `GET /products`: Get all products.
- `GET /products/:id`: Get a specific product by its ID.
- `POST /products`: Create a new product.
- `PUT /products/:id`: Update a specific product by its ID.
- `DELETE /products/:id`: Delete a specific product by its ID.
- `POST /products/bulk`: Create multiple products from a CSV file.

Please refer to the API documentation for more details on how to interact with these endpoints.

## Dependencies

The application requires the following dependencies:

### Frontend (React.js)

- axios
- react-cookie
- react-router-dom
- react-toastify

### Backend (Node.js)

- bcrypt
- body-parser
- cookie-parser
- cors
- csv-parser
- csvtojson
- express
- fs
- jsonwebtoken
- mongoose
- multer
- nodemon

You can install these dependencies by following the installation steps mentioned above.

## Contributing

Contributions are welcome! If you find any issues or want to enhance the application, please feel free to submit a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use and modify the code as per your needs.
