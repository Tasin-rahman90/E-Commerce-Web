import React from "react";
import { Link, useRouteError } from "react-router";
import Container from "../Components/Container";

const RouteError = () => {
  const error = useRouteError();
  const message = error?.statusText || error?.message;

  return (
    <main className="flex min-h-screen items-center py-16">
      <Container className="px-4 text-center">
        <h1 className="text-3xl font-semibold">Something went wrong</h1>
        <p className="mt-3 text-gray-500">{message || "This page could not be displayed."}</p>
        <Link to="/" className="mt-7 inline-block rounded-sm bg-primary px-7 py-3 font-medium text-white">
          Back to Home
        </Link>
      </Container>
    </main>
  );
};

export default RouteError;