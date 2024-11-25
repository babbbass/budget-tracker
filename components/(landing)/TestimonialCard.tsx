type TestimonialCardProps = {
  name: string
  quote: string
}
export function TestimonialCard({ name, quote }: TestimonialCardProps) {
  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <p className='italic mb-4'>{quote}</p>
      <p className='font-semibold'>- {name}</p>
    </div>
  )
}
