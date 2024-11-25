import { Navbar } from "./Navbar"

type WrapperProps = {
  children: React.ReactNode
}

export function Wrapper({ children }: WrapperProps) {
  return (
    <div className='w-full h-full'>
      <Navbar />
      <div className='px-5 md:px-[10%] my-10 flex flex-col items-center'>
        {children}
      </div>
    </div>
  )
}
