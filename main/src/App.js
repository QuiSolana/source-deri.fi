import {UseWalletProvider} from 'use-wallet'
import './app.scss';
import { Constants } from '@deri/eco-common';
import Navigation from './components/Navigation/Navigation';
import Loading from './components/Loading/Loading';

function App(props) {
  return (
    <UseWalletProvider {...Constants.USE_WALLET_OPTIONS}>
      <div className="app">
        <Navigation collect={true} {...props}/>
        <main id="subapp-viewport">
          <Loading/>
        </main>
      </div>
    </UseWalletProvider>
  );
}

export default App;
