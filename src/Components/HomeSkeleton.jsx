import React from "react";
import Container from "./Container";

const SkeletonBlock = ({ className = "" }) => (
  <div className={`animate-pulse rounded bg-gray-200 ${className}`} />
);

const SkeletonCards = ({ count = 4 }) => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
    {Array.from({ length: count }, (_, index) => (
      <div key={index} className="space-y-4">
        <SkeletonBlock className="h-60 w-full" />
        <SkeletonBlock className="h-4 w-3/4" />
        <SkeletonBlock className="h-4 w-1/2" />
        <SkeletonBlock className="h-3 w-2/3" />
      </div>
    ))}
  </div>
);

const HomeSkeleton = () => (
  <div className="fixed inset-0 z-[10000] min-h-screen overflow-y-auto bg-white" aria-label="Loading home page" aria-busy="true">
    <header>
      <div className="bg-black py-3">
        <Container className="px-4">
          <div className="flex min-h-5 items-center justify-between gap-4">
            <SkeletonBlock className="hidden h-3 w-20 bg-gray-700 md:block" />
            <SkeletonBlock className="h-3 w-72 max-w-full bg-gray-700" />
            <SkeletonBlock className="h-4 w-14 bg-gray-700" />
          </div>
        </Container>
      </div>
      <div className="border-b-2">
        <Container className="px-4 py-6 md:py-8">
          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
            <SkeletonBlock className="h-7 w-32" />
            <div className="flex flex-wrap justify-center gap-5 md:gap-8">
              {Array.from({ length: 4 }, (_, index) => (
                <SkeletonBlock key={index} className="h-4 w-12" />
              ))}
            </div>
            <div className="flex w-full items-center justify-center gap-4 lg:w-auto">
              <SkeletonBlock className="h-10 w-full max-w-72 rounded-md" />
              <SkeletonBlock className="h-8 w-8 rounded-full" />
              <SkeletonBlock className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </Container>
      </div>
    </header>

    <main>
      <p className="px-4 pt-6 text-center text-sm text-gray-500" role="status">
       
      </p>
    <Container>
      <div className="mt-6 flex flex-col gap-6 lg:mt-10 lg:flex-row">
        <div className="w-full space-y-5 lg:w-[20%]">
          {Array.from({ length: 8 }, (_, index) => (
            <SkeletonBlock key={index} className="h-4 w-4/5" />
          ))}
        </div>
        <SkeletonBlock className="h-64 w-full lg:h-96 lg:w-[70%]" />
      </div>
    </Container>

    <Container>
      <section className="mt-24 border-b border-gray-200 pb-16">
        <div className="mb-10 flex items-end gap-8">
          <div className="space-y-3">
            <SkeletonBlock className="h-4 w-20" />
            <SkeletonBlock className="h-8 w-44" />
          </div>
          <SkeletonBlock className="h-10 w-64" />
        </div>
        <SkeletonCards />
      </section>

      <section className="border-b border-gray-200 py-20">
        <SkeletonBlock className="mb-10 h-8 w-56" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="flex h-36 flex-col items-center justify-center gap-4 border border-gray-200">
              <SkeletonBlock className="h-12 w-12 rounded-full" />
              <SkeletonBlock className="h-4 w-20" />
            </div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="mb-10 flex items-end justify-between">
          <div className="space-y-3">
            <SkeletonBlock className="h-4 w-24" />
            <SkeletonBlock className="h-8 w-60" />
          </div>
          <SkeletonBlock className="h-10 w-28" />
        </div>
        <SkeletonCards />
        <SkeletonBlock className="mt-20 h-72 w-full" />
      </section>

      <section className="border-t border-gray-200 py-20">
        <SkeletonBlock className="mb-10 h-8 w-56" />
        <SkeletonCards count={8} />
        <SkeletonBlock className="mx-auto mt-12 h-10 w-44" />
      </section>

      <section className="py-20">
        <SkeletonBlock className="mb-12 h-8 w-40" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <SkeletonBlock className="h-128 w-full" />
          <div className="grid gap-6">
            <SkeletonBlock className="h-56 w-full" />
            <div className="grid grid-cols-2 gap-6">
              <SkeletonBlock className="h-56 w-full" />
              <SkeletonBlock className="h-56 w-full" />
            </div>
          </div>
        </div>
        <div className="mt-24 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="flex flex-col items-center gap-4 text-center">
              <SkeletonBlock className="h-16 w-16 rounded-full" />
              <SkeletonBlock className="h-4 w-44" />
              <SkeletonBlock className="h-3 w-56" />
            </div>
          ))}
        </div>
      </section>
    </Container>
    </main>

    <footer className="bg-black">
      <Container className="px-4 sm:px-6 lg:px-0">
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-5 lg:py-20">
          {Array.from({ length: 5 }, (_, column) => (
            <div key={column} className="space-y-5">
              <SkeletonBlock className="h-6 w-28 bg-gray-700" />
              <SkeletonBlock className="h-4 w-36 bg-gray-700" />
              <SkeletonBlock className="h-4 w-32 bg-gray-700" />
              {column === 0 && <SkeletonBlock className="h-11 w-full bg-gray-700" />}
              {column === 4 && (
                <div className="flex gap-3 pt-2">
                  <SkeletonBlock className="h-20 w-20 bg-gray-700" />
                  <div className="space-y-2">
                    <SkeletonBlock className="h-9 w-24 bg-gray-700" />
                    <SkeletonBlock className="h-9 w-24 bg-gray-700" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 py-6">
          <SkeletonBlock className="mx-auto h-4 w-56 bg-gray-700" />
        </div>
      </Container>
    </footer>
  </div>
);

export default HomeSkeleton;