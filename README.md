## Description

This project is for trying out [NestJS](https://nestjs.com/).

Please note this was created on a windows PC, while running on WSL2. Keep that in mind if you run into any issues.

### Prerequisites

This demo assumes you've already setup your development environment following the prisma demo repo (node, npm, etc).

One additional requirement is the NestJS CLI. If you don't have it installed, you can do so via npm:

```bash
npm install -g @nestjs/cli
```

### Up and Running

First, install the dependencies:

```bash
npm install
```

Then, start the development server:

```bash
npm run start:dev
```

Access the application at `http://localhost:3000`.

### Commands you might find useful

Generate a new module:

```bash
nest generate module some-module-name
nest generate service some-module-name
nest generate controller some-module-name
```

### What you need to do

1. Complete the books module (CRUD operations).
2. Support a publishers module (a book has a single publisher).
3. Support a genres module (a book can have multiple genres). **NOTE:** be careful how you handle this to avoid duplicating data - you only want to store either books inside genres, or genres inside books, not both. **NOTE Number 2:** this isn't ideal and you wouldn't have to do this with a real database, this is just for the purpose of this demo.

**Bonus Points:** add an endpoint that returns all books for a given author id (e.g. `GET /authors/:id/books`), hint: I've already injected the books service into the authors service for you to make this easier - this can done easily in the books service by filtering the books by author id but for the sake of the exercise, try to do it in the authors service.
**Extra Bonus Points:** use [pipes](https://docs.nestjs.com/pipes) to validate id params as integers
**More Extra Bonus Points:** add swagger to your endpoints - see [here](https://docs.nestjs.com/openapi/introduction) for more info
