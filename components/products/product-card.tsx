import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card'
import Link from 'next/link'
import { Badge } from '../ui/badge'
import { StarIcon } from 'lucide-react'
import { products } from '@/db/schema'
import { InferSelectModel } from 'drizzle-orm'
import VotingButton from './voting-button'

type Product = InferSelectModel<typeof products>

const ProductCard = ({ product }: { product: Product }) => {
    let hasVoted = false;
    return (
        <Link href={`/products/${product.slug}`} className="block h-full">
            <Card className="group card-hover hover:bg-primary-foreground/10 border-solid border-gray-400 min-h-[180px] h-full flex flex-col">
                <CardHeader className='flex-1'>
                    <div className='flex items-start gap-4'>
                        <div className='flex-1 min-w-0'>
                            <div className='flex items-center gap-2'>
                                <CardTitle className='text-lg group-hover:text-primary transition-colors'>{product.name}</CardTitle>
                                {product.voteCount > 100 && <Badge className='bg-primary gap-1 text-primary-foreground'><StarIcon className='size-3 fill-current' />Featured</Badge>}
                            </div>
                            <CardDescription>{product.description}</CardDescription>
                        </div>
                        <VotingButton hasVoted={hasVoted} voteCount={product.voteCount} productId={product.id} />
                    </div>
                </CardHeader>
                <CardFooter>
                    <div className='flex items-center gap-2'>{(product.tags || []).map((tag) => <Badge variant="secondary" key={tag}>{tag}</Badge>)}</div>
                </CardFooter>
            </Card></Link>
    )
}

export default ProductCard