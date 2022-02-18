<h1 align="center">Hill Street Books</h1>
<h2 align="center">BACK END</h2>

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About the project</a>
    </li>
    <li>
      <a href="#prerequisites">Prerequisites</a>
   </li>
   <li>
      <a href="#dependency-modules">Dependency Modules</a>
   </li>
   <li>
      <a href="#installation">Installation</a>
   </li>
   <li>
      <a href="#developers-guide">Developers Guide</a>
   </li>
  </ol>
</details>

## About the project

Hill Street Books - Backend is a NodeJS API Server which is connected to a Mongo cloud database. It has various methods that perform certain actions. These methods are provided to the Frontend in form of REST JSON Endpoints.

## Prerequisites

The application's backend is built using [NodeJS](https://nodejs.org/en/). It uses npm package manager to get its dependencies.

The application uses [Mongo](https://www.mongodb.com/) as it's Database.

To have this project running on you local machine, you need to install the following:

1. [NodeJS](https://nodejs.org/en/)
2. [NPM](https://docs.npmjs.com/)
3. [Mongo DB](https://www.mongodb.com/)

## Dependency Modules

The following dependencies were used in the application
| Name | Description |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [express](https://www.npmjs.com/package/express) | Fast, unopinionated, minimalist web framework for node. |
| [mongoose](https://www.npmjs.com/package/mongoose) | Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks. |
| [cors](https://www.npmjs.com/package/cors) | CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options. |
| [bcrypt](https://www.npmjs.com/package/bcrypt) | A library to help you hash passwords. |
| [dotenv](https://www.npmjs.com/package/dotenv) | Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. |
| [joi](https://www.npmjs.com/package/joi) | The most powerful schema description language and data validator for JavaScript. |
| [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) | An implementation of JSON Web Tokens. |
| [nodemailer](https://www.npmjs.com/package/nodemailer) | Send e-mails from Node.js. |
| [uuid](https://www.npmjs.com/package/uuid) | For the creation of RFC4122 UUIDs. |

## Dev Dependency Modules

The following development dependencies were used in the application
| Name | Description |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| [nodemon](https://www.npmjs.com/package/nodemon) | nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected. |

## Installation

To have this application running on you local machine, you need to install the <a href="#prerequisites">prerequisites</a> first.

Once you have everything installed, you need to do the following,

1. Clone/Extract the repository to a desired location on the server.

2. Install dependencies.
   ```sh
   # cd <project directory path>
   npm install
   ```
3. Copy the .env.sample to .env and update the Configuration Variables.
   ```sh
   cp .env.sample .env
   ```
4. Run Development Server

   ```sh
   npm run dev
   ```

5. Run Production Server

   ```sh
   npm run start:server
   ```

## Testing

To run unit tests

```sh
npm run test
```

To generate test coverage report

```sh
npm run test:coverage
```

## Developers Guide

This guide instructs some of the good coding and PR practices.

To generate documentation

```sh
npm run docs:generate
```

`docs` Directory is generated.

### PR Guidelines

1. There are two types of PR - draft and ready for review. We use Draft PRs to get early feedback from peers when the implementation path is unclear.
2. Always assign everyone as the reviewers for the PR.
3. Ideally, we want 2 reviews before we move the ticket to QA/ Testing.

### Branching Guidelines

1. Create one branch for every new ticket that you start working on.
2. All the features must be branched off `develop`.
3. Branch names start with the ticket code, followed by the title of the ticket.

### Commit Guidelines

1. Each commit message should start with the ticket code, followed by your commit message. Eg.
   ```sh
   git commit -m "[HSB-1] Initial Project commit"
   ```
