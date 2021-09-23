import logo from './logo.svg';
import './App.css';

import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";

function connectWallet(e){
  // Create a connector
  const connector = new WalletConnect({
    bridge: "https://bridge.walletconnect.org", // Required
    qrcodeModal: QRCodeModal,
  });

  // Check if connection is already established
  if (!connector.connected) {
    // create new session
    connector.createSession();
  }

  // Subscribe to connection events
  connector.on("connect", (error, payload) => {
    if (error) {
      throw error;
    }

    // Get provided accounts and chainId
    const { accounts, chainId } = payload.params[0];
    console.log(accounts, chainId)
  });

  connector.on("session_update", (error, payload) => {
    if (error) {
      throw error;
    }

    // Get updated accounts and chainId
    const { accounts, chainId } = payload.params[0];
  });

  connector.on("disconnect", (error, payload) => {
    if (error) {
      throw error;
    }

    // Delete connector
  });
}



function App() {
  return (
    <div className="App">
      <header className="App-header">

        <p>
          Welcome to Sound Trust
        </p>
        <br/>

        <button onClick={connectWallet}>
          Connect wallet to continue
        </button>
      </header>
    </div>
  );
}

export default App;
