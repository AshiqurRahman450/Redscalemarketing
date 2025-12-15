import { useState, useEffect, useRef } from 'react'
import './App.css'

// Icons as SVG components
const CheckIcon = () => (
  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
)

const StarIcon = () => (
  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const PhoneIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)

const LocationIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const ChartIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)

const SearchIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const TrustIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)

const MoneyIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const ChevronLeft = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

const ChevronRight = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

// Countdown Timer Component
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 12,
    minutes: 45,
    seconds: 30
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev

        if (seconds > 0) {
          seconds--
        } else {
          seconds = 59
          if (minutes > 0) {
            minutes--
          } else {
            minutes = 59
            if (hours > 0) {
              hours--
            } else {
              hours = 23
              if (days > 0) {
                days--
              }
            }
          }
        }

        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatNumber = (num) => num.toString().padStart(2, '0')

  return (
    <div className="flex items-center justify-center gap-2 md:gap-4">
      <div className="flex flex-col items-center">
        <div className="bg-gray-900 text-white px-3 py-2 md:px-4 md:py-3 rounded-lg text-xl md:text-3xl font-bold min-w-[50px] md:min-w-[70px] text-center transition-transform hover:scale-110">
          {formatNumber(timeLeft.days)}
        </div>
        <span className="text-xs md:text-sm text-gray-600 mt-1">Days</span>
      </div>
      <span className="text-2xl md:text-3xl font-bold text-primary">:</span>
      <div className="flex flex-col items-center">
        <div className="bg-gray-900 text-white px-3 py-2 md:px-4 md:py-3 rounded-lg text-xl md:text-3xl font-bold min-w-[50px] md:min-w-[70px] text-center transition-transform hover:scale-110">
          {formatNumber(timeLeft.hours)}
        </div>
        <span className="text-xs md:text-sm text-gray-600 mt-1">Hours</span>
      </div>
      <span className="text-2xl md:text-3xl font-bold text-primary">:</span>
      <div className="flex flex-col items-center">
        <div className="bg-gray-900 text-white px-3 py-2 md:px-4 md:py-3 rounded-lg text-xl md:text-3xl font-bold min-w-[50px] md:min-w-[70px] text-center transition-transform hover:scale-110">
          {formatNumber(timeLeft.minutes)}
        </div>
        <span className="text-xs md:text-sm text-gray-600 mt-1">Mins</span>
      </div>
      <span className="text-2xl md:text-3xl font-bold text-primary">:</span>
      <div className="flex flex-col items-center">
        <div className="bg-gray-900 text-white px-3 py-2 md:px-4 md:py-3 rounded-lg text-xl md:text-3xl font-bold min-w-[50px] md:min-w-[70px] text-center transition-transform hover:scale-110">
          {formatNumber(timeLeft.seconds)}
        </div>
        <span className="text-xs md:text-sm text-gray-600 mt-1">Secs</span>
      </div>
    </div>
  )
}

// Testimonial Carousel Component
function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    { name: "Rahul Sharma", role: "Restaurant Owner", text: "This workshop completely transformed my business! I went from 0 to 50+ calls per month from Google." },
    { name: "Priya Mehta", role: "Salon Owner", text: "The strategies taught here are pure gold. My GMB profile now generates 80% of my new customers!" },
    { name: "Amit Kumar", role: "Real Estate Agent", text: "I was skeptical at first, but the results speak for themselves. 100+ leads in just 2 months!" },
    { name: "Sneha Patel", role: "Dental Clinic", text: "Best investment I've made for my clinic. The local SEO tips alone were worth 10x the price." },
    { name: "Vikram Singh", role: "Insurance Agent", text: "Simple, actionable steps that anyone can follow. Now I get 5-10 inquiries daily from Google!" },
    { name: "Ananya Reddy", role: "Boutique Owner", text: "The 5-star review strategy doubled my ratings in just 3 weeks. Highly recommended!" }
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const autoSlide = setInterval(nextSlide, 4000)
    return () => clearInterval(autoSlide)
  }, [])

  return (
    <div className="relative max-w-4xl mx-auto px-4">
      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="min-w-full px-4">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                </div>
                <p className="text-gray-700 text-lg md:text-xl mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 bg-white shadow-lg rounded-full p-2 md:p-3 hover:bg-primary hover:text-white transition-all duration-300 z-10"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 bg-white shadow-lg rounded-full p-2 md:p-3 hover:bg-primary hover:text-white transition-all duration-300 z-10"
      >
        <ChevronRight />
      </button>

      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-primary scale-125' : 'bg-gray-300 hover:bg-gray-400'
              }`}
          />
        ))}
      </div>
    </div>
  )
}

// GMB Image Carousel Component
function GMBImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const images = [
    { src: '/images/gmb-hero-1.jpg', alt: 'RedScale Marketing - Scale Your Business' },
    { src: '/images/gmb-hero-2.jpg', alt: 'RedScale Marketing - Business Solutions' },
    { src: '/images/gmb-hero-3.jpg', alt: 'RedScale Marketing - Stop Hiding Start Connecting' },
    { src: '/images/gmb-hero-4.jpg', alt: 'RedScale Marketing - We Put You On The Map' }
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  useEffect(() => {
    const autoSlide = setInterval(nextSlide, 4000)
    return () => clearInterval(autoSlide)
  }, [])

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden rounded-2xl shadow-2xl">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="min-w-full">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/90 shadow-lg rounded-full p-2 md:p-3 hover:bg-primary hover:text-white transition-all duration-300 z-10"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/90 shadow-lg rounded-full p-2 md:p-3 hover:bg-primary hover:text-white transition-all duration-300 z-10"
      >
        <ChevronRight />
      </button>

      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-primary scale-125' : 'bg-gray-300 hover:bg-gray-400'
              }`}
          />
        ))}
      </div>
    </div>
  )
}


// Enhanced Scroll Animation Component with bidirectional animations
function ScrollAnimatedSection({
  children,
  className = '',
  animation = 'fadeUp', // fadeUp, fadeDown, slideLeft, slideRight, zoomIn, zoomOut, rotate, blur, swing, glow, flip, parallax
  delay = 0,
  threshold = 0.15,
  triggerOnce = false
}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [scrollDirection, setScrollDirection] = useState('down')
  const lastScrollY = useRef(0)

  // Animation configurations
  const animations = {
    fadeUp: {
      hidden: 'opacity-0 translate-y-16',
      visible: 'opacity-100 translate-y-0',
      duration: 'duration-700',
      timing: 'ease-out'
    },
    fadeDown: {
      hidden: 'opacity-0 -translate-y-16',
      visible: 'opacity-100 translate-y-0',
      duration: 'duration-700',
      timing: 'ease-out'
    },
    slideLeft: {
      hidden: 'opacity-0 -translate-y-12',
      visible: 'opacity-100 translate-y-0',
      duration: 'duration-700',
      timing: 'ease-out'
    },
    slideRight: {
      hidden: 'opacity-0 translate-y-12',
      visible: 'opacity-100 translate-y-0',
      duration: 'duration-700',
      timing: 'ease-out'
    },
    zoomIn: {
      hidden: 'opacity-0 scale-90',
      visible: 'opacity-100 scale-100',
      duration: 'duration-600',
      timing: 'ease-out'
    },
    zoomOut: {
      hidden: 'opacity-0 scale-110',
      visible: 'opacity-100 scale-100',
      duration: 'duration-600',
      timing: 'ease-out'
    },
    rotate: {
      hidden: 'opacity-0 -rotate-6 scale-95',
      visible: 'opacity-100 rotate-0 scale-100',
      duration: 'duration-700',
      timing: 'ease-out'
    },
    blur: {
      hidden: 'opacity-0 blur-sm translate-y-8',
      visible: 'opacity-100 blur-0 translate-y-0',
      duration: 'duration-800',
      timing: 'ease-out'
    },
    swing: {
      hidden: 'opacity-0 translate-y-10 -rotate-2',
      visible: 'opacity-100 translate-y-0 rotate-0',
      duration: 'duration-700',
      timing: 'ease-[cubic-bezier(0.34,1.56,0.64,1)]'
    },
    glow: {
      hidden: 'opacity-0 translate-y-10 shadow-none',
      visible: 'opacity-100 translate-y-0 shadow-2xl shadow-primary/20',
      duration: 'duration-800',
      timing: 'ease-out'
    },
    flip: {
      hidden: 'opacity-0 translate-y-10 [transform:perspective(1000px)_rotateX(20deg)]',
      visible: 'opacity-100 translate-y-0 [transform:perspective(1000px)_rotateX(0deg)]',
      duration: 'duration-700',
      timing: 'ease-out'
    },
    parallax: {
      hidden: 'opacity-0 translate-y-24 scale-95',
      visible: 'opacity-100 translate-y-0 scale-100',
      duration: 'duration-1000',
      timing: 'ease-out'
    }
  }

  const config = animations[animation] || animations.fadeUp

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollDirection(currentScrollY > lastScrollY.current ? 'down' : 'up')
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (triggerOnce) {
          if (entry.isIntersecting && !hasAnimated) {
            setIsVisible(true)
            setHasAnimated(true)
          }
        } else {
          // Bidirectional animation
          setIsVisible(entry.isIntersecting)
        }
      },
      {
        threshold,
        rootMargin: '50px 0px -50px 0px'
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold, triggerOnce, hasAnimated])

  const delayStyle = delay > 0 ? { transitionDelay: `${delay}ms` } : {}

  return (
    <div
      ref={ref}
      className={`
        transform transition-all ${config.duration} ${config.timing}
        ${isVisible ? config.visible : config.hidden}
        ${className}
      `}
      style={delayStyle}
    >
      {children}
    </div>
  )
}

// Legacy AnimatedSection for backward compatibility
function AnimatedSection({ children, className = '' }) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
    >
      {children}
    </div>
  )
}

// FAQ Accordion Component
function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onClick}
        className="w-full py-5 px-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200"
      >
        <span className="font-semibold text-gray-900 text-base md:text-lg pr-4">{question}</span>
        <span className={`transform transition-transform duration-300 text-primary text-2xl font-bold ${isOpen ? 'rotate-45' : ''}`}>
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-5 px-4' : 'max-h-0'}`}
      >
        <p className="text-gray-600">{answer}</p>
      </div>
    </div>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      question: "Who is this workshop for?",
      answer: "This workshop is perfect for local business owners, freelancers, agencies, real estate agents, salon owners, doctors, dentists, restaurant owners, and anyone who wants to get more customers from Google for free."
    },
    {
      question: "Do I need any technical knowledge?",
      answer: "No! This workshop is designed for beginners. We explain everything step-by-step in simple language that anyone can understand and implement."
    },
    {
      question: "How long is the workshop?",
      answer: "The live workshop is approximately 2-3 hours long, packed with actionable strategies, live demos, and a Q&A session to answer all your questions."
    },
    {
      question: "Will I get recordings?",
      answer: "Yes! All registered participants will get lifetime access to the workshop recording, so you can watch it again anytime."
    },
    {
      question: "What if I'm not satisfied?",
      answer: "We offer a 100% money-back guarantee. If you're not completely satisfied with the workshop, just let us know and we'll refund your money - no questions asked!"
    },
    {
      question: "How will I receive the workshop link?",
      answer: "After registration, you'll receive the workshop link via email and WhatsApp. Make sure to add our number to your contacts to receive all updates."
    }
  ]

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
          />
        ))}
      </div>
    </div>
  )
}

// Main App Component
function App() {
  const [isSticky, setIsSticky] = useState(false)
  const [isFooterVisible, setIsFooterVisible] = useState(false)
  const footerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Hide sticky button when footer is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const workshopFeatures = [
    "Create & verify your GMB profile",
    "Optimize listing for Maps & Search",
    "Collect 5-star reviews & build trust",
    "Local SEO hacks to rank #1",
    "Live demo + Q&A session"
  ]

  const whyGMB = [
    { icon: <LocationIcon />, title: "Free Visibility on Google Search & Maps", desc: "GMB lets your business appear directly on Google Search & Google Maps—where customers are already searching for your services, without spending on ads." },
    { icon: <ChartIcon />, title: "5x More Local Customer Reach", desc: "Optimized GMB listings appear in the Top 3 Local Results, driving 5x more local traffic than traditional ads or directories." },
    { icon: <SearchIcon />, title: "1000s of Monthly Searches for Local Services", desc: "Every month, people search for services like 'Best salon near me', 'AC repair' — your GMB profile gets found organically when set up right." },
    { icon: <TrustIcon />, title: "74% of Buyers Trust GMB Listings", desc: "According to Google data, 74% of people trust businesses more when they have verified GMB profiles with reviews, photos, and updates." },
    { icon: <MoneyIcon />, title: "Zero Ad Spend – Still Get Daily Leads", desc: "Unlike paid ads, GMB gives you permanent, free exposure—helping you get consistent inbound leads without spending a single rupee." },
    { icon: <PhoneIcon />, title: "Direct Contact Without Website or Ads", desc: "Customers can call, message, or get directions straight from your GMB listing—perfect for small businesses that don't have a full website yet." }
  ]

  const businessTypes = [
    "Restaurant & Cafe Owners",
    "E-commerce Store Owners",
    "Consultants & Coaches",
    "Real Estate Professionals",
    "New Entrepreneurs",
    "Insurance Agencies",
    "Doctors & Dentists",
    "Salons & Spas"
  ]

  const whatYouLearn = [
    "How to create a powerful Google My Business profile from scratch",
    "Tips to rank your listing higher on Google",
    "The secret to getting more 5-star reviews consistently",
    "How to appear in the 'Top 3 Map Pack' (even in a competitive niche)",
    "Free tools & checklists to automate your GMB success",
    "Common mistakes to avoid that kill your ranking",
    "BONUS: How to generate leads from Google without paid ads"
  ]

  const bonuses = [
    { title: "GMB Optimization Checklist", desc: "Step-by-step checklist to ensure your profile is 100% optimized", value: "₹999" },
    { title: "Review Generation Templates", desc: "Copy-paste messages to get more 5-star reviews", value: "₹799" },
    { title: "Local SEO Mini Course", desc: "Additional training on ranking higher locally", value: "₹1,999" },
    { title: "Private Community Access", desc: "Join our exclusive group of successful business owners", value: "₹2,499" }
  ]

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-2 px-4 text-center text-sm md:text-base">
        <span className="animate-pulse">🔴</span> Live Workshop on <span className="font-bold text-primary-light">Google My Business</span> — Limited Seats Available!
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container py-2 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5 md:gap-2">
            <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm md:text-xl">R</span>
            </div>
            <div className="min-w-0">
              <h1 className="text-base md:text-xl font-bold text-gray-900 truncate">Redscale<span className="text-primary">Marketing</span></h1>
              <p className="text-xs text-gray-500 hidden md:block">Local Growth Experts</p>
            </div>
          </div>
          <a
            href="#register"
            className="bg-primary hover:bg-primary-dark text-white px-3 py-1.5 md:px-6 md:py-3 rounded-lg font-bold text-xs md:text-base transition-all duration-300 hover:scale-105 shadow-lg whitespace-nowrap flex-shrink-0"
          >
            <span className="hidden sm:inline">Register Now</span>
            <span className="sm:hidden">Join</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-dark rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container py-12 md:py-20 relative z-10">
          <ScrollAnimatedSection animation="parallax">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-block bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2 md:px-6 md:py-2 mb-6">
                <span className="text-primary-light font-semibold text-sm md:text-base">🚀 FREE Workshop for Local Business Owners</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Skyrocket to <span className="text-primary-light bg-gradient-to-r from-primary to-red-400 bg-clip-text text-transparent">100+ Local Customers</span> Without Spending a Single Rupee.
              </h1>

              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary-light mb-6">
                The Zero-Rupee Formula
              </h2>

              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                We show you the exact setup and posting strategy that drives high-quality, free traffic and converts 100+ local searchers into paying customers.
              </p>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 mb-8 border border-white/20">
                <p className="text-gray-300 mb-4">Workshop Starts In:</p>
                <CountdownTimer />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <a
                  href="#register"
                  className="btn-primary text-lg md:text-xl px-8 py-4 md:px-12 md:py-5 w-full sm:w-auto"
                >
                  🎯 Register FREE Now!
                </a>
              </div>

              <p className="text-sm text-gray-400">
                ✅ 2000+ Business Owners Already Registered • ⭐ 4.9/5 Rating
              </p>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* Workshop Card Section */}
      <section className="py-12 md:py-16 bg-gray-50" id="register">
        <div className="container">
          <ScrollAnimatedSection animation="glow">
            <div className="max-w-xl mx-auto">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-primary/20">
                <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-white">Google My Business Workshop</h3>
                  <div className="mt-4 flex items-center justify-center gap-3">
                    <span className="text-gray-300 line-through text-lg">₹2999</span>
                    <span className="text-3xl md:text-4xl font-bold text-white">FREE</span>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <h4 className="font-bold text-lg mb-4 text-gray-800">Workshop Teaches You Step-by-Step:</h4>
                  <ul className="space-y-3 mb-6">
                    {workshopFeatures.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckIcon />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className="btn-primary w-full text-center text-lg py-4"
                  >
                    Secure Your Spot Now! — FREE
                  </a>

                  <p className="text-center text-sm text-gray-500 mt-4">
                    🔒 100% Free • No Credit Card Required
                  </p>
                </div>
              </div>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary via-primary-dark to-red-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
        </div>

        <div className="container relative z-10">
          <ScrollAnimatedSection animation="blur">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">What Others Are Saying!</h2>
              <p className="text-lg md:text-xl text-white/80">Discover Inspiring Success Stories From Our Community!</p>
            </div>
          </ScrollAnimatedSection>

          <ScrollAnimatedSection animation="swing" delay={200}>
            <TestimonialCarousel />
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* Why GMB Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container">
          {/* GMB Image Carousel */}
          <ScrollAnimatedSection animation="glow" className="mb-12">
            <GMBImageCarousel />
          </ScrollAnimatedSection>

          <ScrollAnimatedSection animation="fadeUp">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Why 83% of Smart Businesses Are Shifting to <span className="text-primary">Google My Business</span>?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover why local businesses are ditching expensive traditional marketing for this FREE powerful tool
              </p>
            </div>
          </ScrollAnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {whyGMB.map((item, index) => (
              <ScrollAnimatedSection key={index} animation="zoomIn" delay={index * 100}>
                <div className="bg-gray-50 rounded-2xl p-6 md:p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group h-full">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </ScrollAnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-10 md:py-16 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="container">
          <ScrollAnimatedSection animation="swing">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                Ready to Get <span className="text-primary-light">100+ Customers</span> for FREE?
              </h2>
              <p className="text-gray-300 mb-8 text-lg">
                Join thousands of business owners who are already getting free leads from Google!
              </p>
              <a href="#contact" className="btn-primary text-lg px-8 py-4">
                Register FREE Now! 🚀
              </a>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* Who Is This For Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container">
          <ScrollAnimatedSection animation="slideLeft">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Transform Your Business Strategy With The Workshop
              </h2>
              <p className="text-lg md:text-xl text-gray-600">
                Finally, A Proven System That Drives Results For ANY Business Type
              </p>
            </div>
          </ScrollAnimatedSection>

          <ScrollAnimatedSection animation="slideRight" delay={150}>
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl md:text-2xl font-bold text-center mb-8 text-gray-800">Whether you're…</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {businessTypes.map((type, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-4 md:p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-primary group"
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:from-primary group-hover:to-primary-dark transition-all duration-300">
                      <svg className="w-6 h-6 md:w-8 md:h-8 text-primary group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <p className="font-semibold text-gray-800 text-sm md:text-base">{type}</p>
                  </div>
                ))}
              </div>
              <p className="text-center mt-8 text-lg text-gray-600">
                The Workshop delivers industry-specific strategies tailored to <span className="font-bold text-primary">YOUR</span> unique business needs
              </p>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container">
          <ScrollAnimatedSection animation="fadeDown">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                What Will You <span className="text-primary">Learn</span>?
              </h2>
              <p className="text-lg text-gray-600">
                Everything you need to dominate local search and get consistent customers
              </p>
            </div>
          </ScrollAnimatedSection>

          <ScrollAnimatedSection animation="blur" delay={100}>
            <div className="max-w-4xl mx-auto">
              <div className="grid gap-4 md:gap-6">
                {whatYouLearn.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 bg-gray-50 rounded-xl p-5 md:p-6 hover:bg-primary hover:text-white transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-white">
                      <svg className="w-5 h-5 text-white group-hover:text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-lg font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* Meet Your Mentor Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container">
          <ScrollAnimatedSection animation="flip">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Meet Your <span className="text-primary-light">Mentor</span></h2>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-primary to-primary-dark rounded-full flex-shrink-0 shadow-2xl overflow-hidden ring-4 ring-primary/30">
                  <img
                    src="/images/mentor.png"
                    alt="Mentor"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">Redscale Marketing Team</h3>
                  <p className="text-primary-light font-semibold mb-4 text-lg">Lead Generation Experts</p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    We are experts in Digital Marketing with over 10 years of experience. Our team has helped thousands of businesses generate leads through Google My Business optimization. We've spent lakhs on testing strategies and have generated over 1.5 Lakh leads for businesses worldwide. Now, we're sharing our proven system with you — completely FREE!
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
                    <div className="bg-white/10 rounded-lg px-4 py-2">
                      <span className="text-2xl font-bold text-primary-light">10+</span>
                      <p className="text-sm text-gray-400">Years Experience</p>
                    </div>
                    <div className="bg-white/10 rounded-lg px-4 py-2">
                      <span className="text-2xl font-bold text-primary-light">1.5L+</span>
                      <p className="text-sm text-gray-400">Leads Generated</p>
                    </div>
                    <div className="bg-white/10 rounded-lg px-4 py-2">
                      <span className="text-2xl font-bold text-primary-light">5000+</span>
                      <p className="text-sm text-gray-400">Students Trained</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* Bonus Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container">
          <ScrollAnimatedSection animation="zoomOut">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                🎁 Workshop <span className="text-primary">Bonuses</span>
              </h2>
              <p className="text-lg text-gray-600">
                Register today and get these exclusive bonuses worth ₹6,296 — absolutely FREE!
              </p>
            </div>
          </ScrollAnimatedSection>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {bonuses.map((bonus, index) => (
              <ScrollAnimatedSection key={index} animation="rotate" delay={index * 150}>
                <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-dashed border-primary/30 hover:border-primary transition-all duration-300 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl">🎯</span>
                    <span className="bg-primary/10 text-primary font-bold px-3 py-1 rounded-full text-sm">
                      Worth {bonus.value}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{bonus.title}</h3>
                  <p className="text-gray-600">{bonus.desc}</p>
                </div>
              </ScrollAnimatedSection>
            ))}
          </div>

          <ScrollAnimatedSection animation="glow" delay={300}>
            <div className="text-center mt-10">
              <div className="inline-block bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-6 md:p-8">
                <p className="text-lg text-gray-700 mb-2">Total Bonus Value:</p>
                <p className="text-3xl md:text-4xl font-bold text-gray-400 line-through mb-2">₹6,296</p>
                <p className="text-4xl md:text-5xl font-bold text-primary">FREE!</p>
              </div>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container">
          <ScrollAnimatedSection animation="fadeDown">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Frequently Asked <span className="text-primary">Questions</span>
              </h2>
              <p className="text-lg text-gray-600">
                Got questions? We've got answers!
              </p>
            </div>
          </ScrollAnimatedSection>

          <ScrollAnimatedSection animation="swing" delay={150}>
            <FAQ />
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary via-primary-dark to-red-900 relative overflow-hidden" id="contact">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
        </div>

        <div className="container relative z-10">
          <ScrollAnimatedSection animation="parallax">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Ready to Get <span className="text-yellow-300">100+ Local Customers</span> for FREE?
              </h2>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                Don't miss this opportunity! Join the workshop now and transform your business forever.
              </p>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 mb-8 border border-white/20">
                <p className="text-white/80 mb-4">Workshop Starts In:</p>
                <CountdownTimer />
              </div>

              <a
                href="https://wa.me/919360670147?text=Hi%2C%20I%20want%20to%20register%20for%20the%20FREE%20Google%20My%20Business%20Workshop"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-white text-primary hover:bg-gray-100 px-8 py-4 md:px-12 md:py-5 rounded-xl font-bold text-lg md:text-xl transition-all duration-300 hover:scale-105 shadow-2xl"
                style={{ animation: 'pulse-glow 2s ease-in-out infinite' }}
              >
                <span>🚀 Register FREE Now!</span>
              </a>

              <p className="mt-6 text-white/70 text-sm">
                ✅ 100% FREE • ✅ No Credit Card Required • ✅ Instant Access
              </p>
            </div>
          </ScrollAnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer ref={footerRef} className="bg-gray-900 text-white py-8 md:py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Redscale<span className="text-primary-light">Marketing</span></h3>
                <p className="text-xs text-gray-400">Local Growth Experts</p>
              </div>
            </div>

            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                Copyrights © 2025 RedscaleMarketing. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky CTA Button - Hidden when footer visible */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t border-gray-200 py-4 px-4 z-50 transition-all duration-300 ${isSticky && !isFooterVisible ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-7xl mx-auto sm:px-7 lg:px-10 xl:px-[72px]">
          <div className="flex items-center justify-center sm:justify-between gap-4">
            <div className="hidden sm:block">
              <p className="text-sm text-gray-600">Google My Business Workshop</p>
              <p className="font-bold text-lg"><span className="text-gray-400 line-through text-sm">₹2999</span> FREE</p>
            </div>
            <a
              href="#contact"
              className="btn-primary sm:w-auto text-center py-3 px-8"
            >
              Register Now — FREE 🚀
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
