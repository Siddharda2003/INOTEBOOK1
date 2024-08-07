import Notes from './Notes'
const Home = (props) => {
  const {showAlert,mode} = props
  return (
    <div>
        <Notes showAlert={showAlert} mode={mode}/>
    </div>
  )
}

export default Home