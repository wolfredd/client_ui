
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import ConfirmDialogWrapper from '../components/ConfirmDialog';
import useApp from '../hooks/useApp';


function App() {
  const { token } = useApp();
  return (
    <ConfirmDialogWrapper>
      {
        token && (
          <div className="App">
            <Header />
            <Outlet />
          </div>
        )
      }
    </ConfirmDialogWrapper>
  );
}

export default App;
