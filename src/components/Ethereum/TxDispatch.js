import { ethers } from 'ethers'

const NETWORK = 'ropsten' // changed from goerli

export default async function TxDispatch({
  fromAddress,
  toAddress,
  valueInEth,
  gas,
  message,
}) {
  const accounts = await window.ethereum.enable()
  console.log('Accounts found:', accounts)

  const provider = ethers.getDefaultProvider(NETWORK)
  const gasPrice = await provider.getGasPrice()

  const transactionParameters = {
    from: fromAddress,
    to: toAddress,
    gas: ethers.utils.hexlify(gas),
    gasPrice: gasPrice.toHexString(),
    value: valueInEth
      ? ethers.utils.parseEther(valueInEth).toHexString()
      : undefined,
    data:
      message !== ''
        ? ethers.utils.hexlify(ethers.utils.toUtf8Bytes(message))
        : undefined,
  }

  console.log('Sending transaction with params:', transactionParameters)
  const response = await window.ethereum.send('eth_sendTransaction', [
    transactionParameters,
  ])

  console.log(
    'Sent transaction: %o',
    `https://${NETWORK}.etherscan.io/tx/${response.result}`,
  )
}
