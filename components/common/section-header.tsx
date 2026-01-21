import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
export default function SectionHeader({ title, icon: Icon, description, className }: { title: string, icon: LucideIcon, description: string, className?: string }) {
    return (
        <div className={cn('mb-12', className)}>
            <div className='flex items-center gap-2 mb-3'>
                <Icon className='size-6 text-primary/70' />
                <h2 className="text-3xl font-bold">{title}</h2>
            </div>
            <p className="text-muted-foreground text-lg">{description}</p>
        </div>
    )
}