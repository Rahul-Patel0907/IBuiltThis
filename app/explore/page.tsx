'use cache'
import SectionHeader from '@/components/common/section-header'
import { CompassIcon } from 'lucide-react'
import ProductExplorer from '@/components/products/product-explorer'
import { getAllProducts } from '@/lib/products/product-select'

const ExplorePage = async () => {
    const products = await getAllProducts();
    return (
        <div className='py-20'>
            <div className='wrapper'>
                <SectionHeader
                    title="Explore All Products"
                    icon={CompassIcon}
                    description="Browse and discover the amazing projects from our community."
                />
                <ProductExplorer products={products} />
            </div>
        </div>
    )
}

export default ExplorePage