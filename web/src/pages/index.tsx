// interface HomeProps {
//   count: number;
// }

import Image from 'next/image'
import appPreviewImg from '../assets/app-copa-preview.png'
import logoImg from '../assets/logo.svg'


export default function Home(/*props: HomeProps*/) {

  return (
    // <h1 className="text-violet-500 font-bold text-4xl">Contagem: {props.count}</h1>
    <div>
      <main>
        <Image src={logoImg} alt="NLW Copa" />

        <h1>Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>
      </main>
      
      <Image src={appPreviewImg} alt="Dois celulares exibindo uma prévia da aplicação." />
    </div>
  )
}

// export const getServerSideProps = async () => {
//   const response = await fetch('http://localhost:3333/pools/count')
//   const data = await response.json()
//   return {props:{count: data.count}}
// }
