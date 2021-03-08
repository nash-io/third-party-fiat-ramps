# Nash third-party fiat ramps integration example

This repo provides a toy dApp integration with Nash's third-party fiat ramps. These ramps allow users to purchase cryptocurrency on any supported dApp. The integration logic is based upon a QR code that, when scanned by the Nash mobile app, allows Nash to send crypto to the connected dApp upon purchase. KYC and bank information is handled completely by Nash, along with a variety of payment methods.

Concretely, the data transmitted by the generated QR code corresponds to a user
`address`, an `asset` type (e.g., ETH or USDC), an `amount`, and finally an idenfifier (`app`) for the dApp of origin (non-verifiable by Nash, but for record keeping; ultimately the user is responsible for where they are requesting funds be sent). In this repo you can find the code:

```javascript
const encodeRampDataQR = (app, account, asset, amount) => {
    return JSON.stringify({
        app,
        account,
        asset,
        amount
    })
}
```

## Data types

Supported values for `asset` are currently: `"eth"` and `"usdc"`, with more to come soon. For `address` we require a standard Ethereum address with a `0x` prefix. The value specified by `amount` is a decimal number that will be string encoded.

## User flow

So long as your dApp generates a QR code following this format, Nash fiat ramps can be integrated into a dApp through a variety of interfaces and user flows. In this example we illustrate a flow where the user first selects an asset and inputs an amount. Then when the user clicks "Buy", a QR code is generated and the user completes the flow with the Nash mobile app. 

Example input fields:

![Nash example input fields](https://github.com/nash-io/third-party-fiat-ramps/blob/main/images/fiat-buy-fields.png)

Generated QR code:

![Generated QR code](https://github.com/nash-io/third-party-fiat-ramps/blob/main/images/fiat-buy-qr.png)


## Installation

- npm install
- npm start
- visit `http://localhost:8080/`
