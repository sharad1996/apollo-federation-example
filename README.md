# Apollo Federation Example with Two Servers
This repository demonstrates how to set up Apollo Federation using two GraphQL servers. Server 1 utilizes its local schema while Server 2 has its own local schema. The frontend can connect to Server 1 to execute local and federated queries and mutations, leveraging Server 2's capabilities as well.

# Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

# Prerequisites
Make sure you have the following installed on your machine:

Node.js (version X.X.X)
npm (or yarn)

# Installation
1. Clone the repository:
  git clone https://github.com/yourusername/apollo-federation-example.git
2. Navigate into the project directory:
  cd apollo-federation-example
3. Install dependencies:
  npm install or yarn install
# Running the Servers
1. Start Server 1 (using local schema):
cd server1
npm start or yarn start

2. Start Server 2 (using its own local schema):
cd server2
npm start or yarn start

# Usage
Describe how users can interact with the example project. Include:

- How to perform local queries and mutations using Server 1.
- How to utilize federated queries and mutations that involve Server 2.
- Example code snippets or API usage demonstrations.
- Folder Structure
Explain the structure of your project:

├── server1/  Contains Server 1 implementation
├── server2/  Contains Server 2 implementation
└── README.md Project documentation

# Contributing
Provide guidelines for how users can contribute to the project, such as:

# Reporting bugs or suggesting enhancements.
Submitting pull requests.

