import Link from "next/link"
import { Header } from "@/component/Header"
import { FeatureCard } from "@/component/(landing)/FeatureCard"
import { TestimonialCard } from "@/component/(landing)/TestimonialCard"

export default function Home() {
  return (
    <>
      <Header />
      <section className='container mx-auto py-16'>
        <h2 className='text-3xl font-semibold text-center mb-12'>
          Fonctionnalités principales
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <FeatureCard
            title='Tableau de bord annuel'
            description="Visualisez vos finances sur l'année en un coup d'œil"
            icon='📊'
          />
          <FeatureCard
            title='Suivi mensuel détaillé'
            description='Planifiez et suivez vos dépenses mois par mois'
            icon='📅'
          />
          <FeatureCard
            title="Gestion de l'épargne et des dettes"
            description='Atteignez vos objectifs financiers plus rapidement'
            icon='💰'
          />
        </div>
      </section>

      <section className='bg-gray-100 py-16'>
        <div className='container mx-auto'>
          <h2 className='text-3xl font-semibold text-center mb-12'>
            Témoignages
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <TestimonialCard
              name='Sophie D.'
              quote='Ce planificateur a complètement changé ma façon de gérer mon argent. Je me sens enfin en contrôle de mes finances !'
            />
            <TestimonialCard
              name='Thomas L.'
              quote="L'interface est intuitive et les fonctionnalités sont complètes. Je recommande à 100% !"
            />
          </div>
        </div>
      </section>

      <section className='container mx-auto py-16 text-center'>
        <h2 className='text-3xl font-semibold mb-8'>
          Prêt à transformer vos finances ?
        </h2>
        <div className='flex flex-col md:flex-row justify-center items-center gap-8'>
          <div className='bg-white p-8 rounded-lg shadow-md'>
            <h3 className='text-2xl font-bold mb-4'>Gratuit</h3>
            <ul className='text-left mb-6'>
              <li>✅ {`Jusqu'à 50 transactions par mois`}</li>
              <li>✅ Tableau de bord basique</li>
              <li>✅ Suivi des dépenses</li>
            </ul>
            <Link
              href='/signup'
              className='bg-blue-500 text-white px-6 py-2 rounded block text-center'
            >
              Commencer
            </Link>
          </div>
          <div className='bg-blue-50 p-8 rounded-lg shadow-md'>
            <h3 className='text-2xl font-bold mb-4'>Premium</h3>
            <p className='text-xl font-semibold mb-4'>5€ / mois</p>
            <ul className='text-left mb-6'>
              <li>✅ Transactions illimitées</li>
              <li>✅ Rapports détaillés</li>
              <li>✅ Fonctionnalités avancées</li>
              <li>✅ Support prioritaire</li>
            </ul>
            <Link
              href='/signup-premium'
              className='bg-green-500 text-white px-6 py-2 rounded block text-center'
            >
              Essayer Premium
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
