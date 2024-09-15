const { useConnection } = require("arweave-wallet-kit");

const { connected } = useConnection();

const checkConnection = () => {
    useEffect(() => {
        if (connected) {
            window.location.href = "/game";
        }
    }, [connected]);
}

return {
    connected, checkConnection
}