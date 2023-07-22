'use client'
 
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
 
export default function Submit() {
  const { pending } = useFormStatus()
 
  return (
    <button
      type="submit"
      className="rounded-lg p-2 bg-teal-400 text-white"
      disabled={pending}
    >
      {pending ? 'Loading...' : 'Add comment'}
    </button>
  )
}