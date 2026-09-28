import React from "react";
import { Link } from "react-router";
import Container from "../Components/Container";

const NotFound = () => (
  <main className="flex min-h-[50vh] items-center py-16">
    <Container className="px-4 text-center">
      <p className="text-sm font-semibold uppercase text-primary">404 Error</p>
      <h1 className="mt-4 text-3xl font-semibold">Page not found</h1>
      <p className="mt-3 text-gray-500">The page you are looking for does not exist.</p>
      <Link to="/" className="mt-7 inline-block rounded-sm bg-primary px-7 py-3 font-medium text-white">
        Back to Home
      </Link>
    </Container>
  </main>
);

export default NotFound;