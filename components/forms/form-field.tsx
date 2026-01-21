import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
interface FormFieldProps {
    label: string;
    name: string;
    id: string;
    placeholder: string;
    required: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>) => void;
    error: string[];
    helperText?: string;
    textarea?: boolean;
}

const FormField = ({ label, name, id, placeholder, required, onChange, error, textarea, helperText }: FormFieldProps) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            {textarea ? (
                <Textarea id={id} name={name} placeholder={placeholder} required={required} onChange={onChange as (e: React.ChangeEvent<HTMLTextAreaElement>) => void} />
            ) : (
                <Input id={id} name={name} placeholder={placeholder} required={required} onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void} />
            )}
            {helperText && <p className="text-xs text-muted-foreground">{helperText}</p>}
            {error && <p className="text-sm text-destructive">{error.join(', ')}</p>}
        </div>
    )
}

export default FormField