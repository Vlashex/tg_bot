import './App.css';
import UserList from './components/user-list'
import Task from './components/task'
import SendMessage from "./components/send-message";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <UserList/>
        <div>
            <div className="task-list">
                <Task/>
                <Task/>
                <Task/>
                <Task/>
                <Task/>
                <Task/>
                <Task/>
                <Task/>
                <Task/>
                <Task/>
            </div>
            <SendMessage></SendMessage>
        </div>
      </div>
    </div>
  );
}

export default App
