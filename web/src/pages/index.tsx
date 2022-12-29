// interface HomeProps {
//   count: number;
// }

import Image from 'next/image'
import appPreviewImg from '../assets/app-copa-preview.png'
import logoImg from '../assets/logo.svg'
import usersAvatarExampleImg from '../assets/users-avatar-example.png'
import iconCheckImage from '../assets/icon-check.png'

export default function Home(/*props: HomeProps*/) {

  return (
    // <h1 className="text-violet-500 font-bold text-4xl">Contagem: {props.count}</h1>
    <div>
      <main>
        <Image src={logoImg} alt="NLW Copa" />

        <h1>Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>

        <div>
          <Image src={usersAvatarExampleImg} alt="" />

          <strong>
            <span>+12.592</span> pessoas já estão usando
          </strong>
        </div>
 
        <form>
          <input type="text" required placeholder='Qual nome do seu bolão?' />
          <button type='submit'>Criar meu bolão</button>
        </form>

        <p>Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>
      
        <div>
          <div>
            <Image src={iconCheckImage} alt=""/>
            <div>
              <span>+2.034</span>
              <span>Bolões criados</span>
            </div>
          </div>
          <div>
            <Image src={iconCheckImage} alt=""/>
            <div>
              <span>+192.847</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
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
