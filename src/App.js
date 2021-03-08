import React, { useState } from 'react';
import QRCode from 'qrcode.react';

import { useWallet } from 'use-wallet'

// Communicate user address, asset and amount by simple JSON encoding
// which is transmitted by a QR code to the Nash mobile app. An `app`
// argument serves as an identifier for the connecting dApp
const encodeRampDataQR = (app, account, asset, amount) => {
    return JSON.stringify({
        app,
        account,
        asset,
        amount
    })
}

// Generate a QR code in the web interface encoding fiat buy information
const NashRampQRCode = ({account, asset, amount}) => {
    let encodedValues = encodeRampDataQR("example-app", account, asset, amount);
    console.log(encodedValues);
    return <QRCode value={encodedValues} />
}

const FiatBuy = ({address}) => {

    const [amount, setAmount] = useState();
    const [asset, setAsset] = useState("usdc");
    const [showQR, setShowQR] = useState(false);

    const finishBuy = (e) => {
        setShowQR(false);
        setAmount(null);
        setAsset("usdc");
    }

    if(showQR === true){
        return (<div>
            <NashRampQRCode account={address} asset={asset} amount={amount} />
            <br/>
            <button onClick={finishBuy}>Done</button>
        </div>)
    }

    return (<div>
        <div className="amount">
            <label>Amount:</label>
            <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)}></input>
        </div>
        <div className="asset">
            <label>Asset:</label>
            <select
            onChange={(e) => setAsset(e.currentTarget.value)}
            value={asset}
            >
                <option value="eth">Ethereum</option>
                <option value="usdc">USDC</option>
                <option value="wBTC">wBTC</option>
            </select>
        </div>
        <div className="description">
            The QR code generated below can be scanned by the Nash mobile app to initiate a
            crypto purchase that will be sent to the users current Metamask address. In your case 
            this is the address <code>{address}</code>.
        </div>
        <button onClick={(e) => setShowQR(true)}>Buy</button>
    </div>)
}

const App = () => {
  const wallet = useWallet()

  return (
    <>
      <h1>Nash third-party fiat ramp demo</h1>
      {wallet.status === 'connected' ? (
        <div>
          <FiatBuy address={wallet.account} />
          {/* <button onClick={() => wallet.reset()}>disconnect</button> */}
        </div>
      ) : (
        <div>
          <button onClick={() => wallet.connect()}>Connect with MetaMask</button>
        </div>
      )}
    </>
  )
}


// const App = ({ title }) => <div>{title}</div>;

export default App;
