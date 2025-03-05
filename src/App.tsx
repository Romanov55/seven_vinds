import './assets/styles/style.css'
import { Header } from './components/header'
import { ProjectMenu } from './components/projectMenu'
import { Works } from './components/works'

function App() {
  return (
    <>
      <Header />
      <div className='main__content'>
        <ProjectMenu />
        <Works />
      </div>
    </>
  )
}

export default App
