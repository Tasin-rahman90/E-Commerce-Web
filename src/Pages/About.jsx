import React from 'react'
import { Link } from 'react-router'
import { FiArrowRight, FiHeadphones, FiShoppingBag, FiTruck } from 'react-icons/fi'
import Container from '../Components/Container'

const principles = [
  { value: 'Curated', label: 'Useful finds for everyday life' },
  { value: 'Simple', label: 'A straightforward way to shop' },
  { value: 'Dhaka', label: 'A local store with local roots' },
  { value: 'Helpful', label: 'Support when you need it' },
]

const values = [
  { icon: FiShoppingBag, title: 'Thoughtful selection', body: 'A considered mix of everyday essentials and the latest finds, all in one place.' },
  { icon: FiTruck, title: 'Delivery you can count on', body: 'Clear delivery options and careful handling from checkout to your doorstep.' },
  { icon: FiHeadphones, title: 'People who can help', body: 'Real support for product questions, orders, returns, and everything in between.' },
]

const About = () => (
  <main className="pb-20">
    <Container className="px-4 sm:px-6 lg:px-0">
      <nav aria-label="Breadcrumb" className="py-10 text-sm text-gray-500">
        <Link to="/" className="hover:text-black">Home</Link><span className="mx-3">/</span><span className="text-black">About</span>
      </nav>

      <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-xl py-4">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Our story</p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">Making good finds feel closer.</h1>
          <p className="mt-6 leading-7 text-gray-600">Exclusive is a Dhaka-based online store built around a simple idea: finding things you love should feel easy. We bring useful, well-chosen products together with a straightforward shopping experience and a team that’s here when you need us.</p>
          <p className="mt-4 leading-7 text-gray-600">From the first browse to the moment your order arrives, we keep working to make every step clearer, more reliable, and a little more enjoyable.</p>
          <Link to="/ShopByCategory" className="mt-7 inline-flex items-center gap-3 border-b border-black pb-1 font-medium hover:text-primary hover:border-primary">Explore the store <FiArrowRight aria-hidden="true" /></Link>
        </div>
        <div className="min-h-72 overflow-hidden bg-[#f5f5f5] sm:min-h-96">
          <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85" alt="A thoughtfully arranged modern retail store" className="h-full min-h-72 w-full object-cover sm:min-h-96" />
        </div>
      </section>

      <section aria-label="What we stand for" className="mt-16 grid grid-cols-2 border-y border-gray-200 md:grid-cols-4">
        {principles.map((item, index) => <div key={item.label} className={`px-4 py-8 text-center sm:py-10 ${index > 0 ? 'border-l border-gray-200' : ''}`}>
          <p className="text-2xl font-semibold sm:text-3xl">{item.value}</p><p className="mx-auto mt-2 max-w-40 text-sm leading-5 text-gray-600">{item.label}</p>
        </div>)}
      </section>

      <section className="mt-20">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">What matters to us</p>
        <h2 className="mt-3 max-w-xl text-3xl font-semibold sm:text-4xl">A better experience, at every step.</h2>
        <div className="mt-9 grid gap-8 border-t border-gray-200 pt-8 md:grid-cols-3 md:gap-10">
          {values.map(({ icon: Icon, title, body }) => <article key={title} className="max-w-sm">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-black text-xl text-white"><Icon aria-hidden="true" /></span>
            <h3 className="mt-5 text-xl font-semibold">{title}</h3><p className="mt-3 leading-7 text-gray-600">{body}</p>
          </article>)}
        </div>
      </section>

      <section className="mt-20 flex flex-col items-start justify-between gap-6 border-y border-gray-200 py-9 sm:flex-row sm:items-center">
        <div><h2 className="text-2xl font-semibold">Need a hand?</h2><p className="mt-2 text-gray-600">Our support team is just a message away.</p></div>
        <Link to="/contact" className="inline-flex min-h-12 items-center gap-3 bg-primary px-6 py-3 font-medium text-white transition hover:bg-black">Contact our team <FiArrowRight aria-hidden="true" /></Link>
      </section>
    </Container>
  </main>
)

export default About