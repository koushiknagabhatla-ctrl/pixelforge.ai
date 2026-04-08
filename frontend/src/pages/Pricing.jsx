import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import PricingCard from '../components/PricingCard'
import Footer from '../components/Footer'
import useAuthStore from '../store/useAuthStore'
import toast from 'react-hot-toast'
import api from '../lib/axios'

const plans = [
  {
    name: 'Free',
    price: 0,
    description: 'Perfect for trying out',
    features: [
      '5 images per day',
      'Up to 4x upscale',
      'All enhancement modes',
      'Standard processing',
      'JPG/PNG/WebP download',
    ],
  },
  {
    name: 'Pro',
    price: 299,
    description: 'For professionals',
    features: [
      '100 images per day',
      'Up to 8x upscale',
      'Priority processing',
      'Batch upload',
      'All enhancement modes',
      'Priority support',
    ],
  },
  {
    name: 'Business',
    price: 999,
    description: 'For teams & agencies',
    features: [
      'Unlimited images',
      'Up to 8x upscale',
      'API access',
      'Team seats',
      'Dedicated support',
      'Custom models',
      'SLA guarantee',
    ],
  },
]

export default function Pricing() {
  const { user, fetchCredits } = useAuthStore()
  const navigate = useNavigate()

  const handleSelect = async (plan) => {
    if (!user) {
      toast('Please sign in first', { icon: '🔒' })
      navigate('/login')
      return
    }

    if (plan.price === 0) {
      toast.success("You're already on the Free plan!")
      return
    }

    // PhonePe payment flow (stub)
    toast('Payment integration coming soon! For now, upgrading directly...', {
      icon: '🚧',
      duration: 3000,
    })

    // Temporary: directly upgrade via API
    try {
      await api.post('/api/payment/verify', {
        merchant_transaction_id: `demo_${Date.now()}`,
        user_id: user.id,
        plan: plan.name.toLowerCase(),
      })
      await fetchCredits()
      toast.success(`Upgraded to ${plan.name}!`)
    } catch (error) {
      toast.error('Upgrade failed. Please try again.')
    }
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="section-container py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-bold text-pink-500 uppercase tracking-widest bg-pink-500/5 px-4 py-1.5 rounded-full border border-pink-500/10 mb-6 inline-block">
            Pricing Plans
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mt-3 mb-6 tracking-tight">
            Choose Your <span className="text-gradient">Plan</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Start free with 5 daily credits. Upgrade anytime for more power,
            faster processing, and premium features.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              isPopular={i === 1}
              index={i}
              onSelect={handleSelect}
            />
          ))}
        </div>

        {/* Comparison note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-gray-600 dark:text-gray-500 font-medium">
            All plans include all 7 enhancement modes. Prices shown in INR.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-500 mt-2 font-medium">
            Need a custom plan? <a href="#" className="text-pink-500 hover:text-pink-600 font-bold decoration-2 underline-offset-4 hover:underline">Contact us</a>
          </p>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
