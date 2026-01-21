'use client'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { ClockIcon, SearchIcon, TrendingUpIcon, X as XIcon } from 'lucide-react'
import ProductCard from './product-card'
import { Product } from '@/types'
import { useState, useMemo } from 'react'

const ProductExplorer = ({ products }: { products: Product[] }) => {
    const [sortBy, setSortBy] = useState<'trending' | 'recent' | 'newest'>('trending');
    const [searchQuery, setSearchQuery] = useState('');
    const filteredProducts = useMemo(() => {
        let filtered = [...products];
        if (searchQuery.length > 0) {
            filtered = filtered.filter((product) => {
                return product.name.toLowerCase().includes(searchQuery.toLowerCase())
            })
        }

        switch (sortBy) {
            case 'trending':
                return filtered.sort((a, b) => b.voteCount - a.voteCount);
            case 'recent':
                return filtered.sort((a, b) => new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime());
            case 'newest':
                return filtered.sort((a, b) => new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime());
            default:
                return filtered;
        }
    }, [searchQuery, sortBy, products]);

    return (
        <div>
            <div className='flex flex-col sm:flex-row gap-4 mb-8'>
                <div className='flex-1 relative'>
                    <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4' />
                    <Input
                        type='text'
                        placeholder='Search products...'
                        className='pl-10 pr-10'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                            <XIcon className="size-4" />
                        </button>
                    )}
                </div>
                <div className='flex gap-2'>
                    <Button variant={sortBy === 'trending' ? 'default' : 'outline'} onClick={() => setSortBy('trending')}><TrendingUpIcon className='size-4' />Trending</Button>
                    <Button variant={sortBy === 'recent' ? 'default' : 'outline'} onClick={() => setSortBy('recent')}><ClockIcon className='size-4' />Recent</Button>
                </div>
            </div>
            <div className='mb-6'>
                <p className='text-sm text-muted-foreground'>Showing {filteredProducts.length} products</p></div>
            <div className='grid-wrapper'>
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default ProductExplorer