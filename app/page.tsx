import React, { Suspense } from 'react'
import HeroSection from '@/components/landing-page/hero-section'
import FeaturedProducts from '@/components/landing-page/featured-products'
import RecentlyLaunchedProducts from '@/components/landing-page/recently-launched-products'
import { LoaderCircleIcon } from 'lucide-react'
import ProductSkeleton from '@/components/products/product-skeleton'

const page = () => {
  return (
    <main>
      <HeroSection />
      <FeaturedProducts />
      <Suspense fallback={<ProductSkeleton />}>
        <RecentlyLaunchedProducts />
      </Suspense>
    </main>
  )
}

export default page