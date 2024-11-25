type FeatureCardProps = {
  title: string
  description: string
  icon: string
}
export function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className='bg-white p-6 rounded-lg shadow-md text-center'>
      <div className='text-4xl mb-4'>{icon}</div>
      <h3 className='text-xl font-semibold mb-2'>{title}</h3>
      <p>{description}</p>
    </div>
  )
}
