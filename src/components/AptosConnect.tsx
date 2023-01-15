import {
  ConnectButton,
  useAccountBalance,
  useWallet,
  useSuiProvider,
} from '@suiet/wallet-kit';

export function AptosConnect() {
  const { account, connected, allAvailableWallets } = useWallet();
  console.log(allAvailableWallets)
  return (
    <>
      {connected ? (
        <button
          className="btn btn-primary w-48"
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            display: "inline",
          }}
        >
          {account?.address}
        </button>
      ) : (
        <ConnectButton>Connect Wallet</ConnectButton>
      )}
    </>
  );
}
