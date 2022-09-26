import { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import Abi from './Abi.json';

const InstanceContext = createContext();

const InstanceProvider = ({ children }) => {

    //---USESTATE
    const [instance, setInstance] = useState([]);
    const [form, setForm] = useState({
        balance:0,
        earned:0,
        pending:0,
        total:0
    })

    const [progress, setProgress] = useState(0);

    //----USEEFFECT
    useEffect(() => {
        loadContract()
    },[])

    useEffect(()=>{
        totalRewards()
    },[instance])

    const networks = {
        binance: {
          chainId: `0x${Number(56).toString(16)}`,
          chainName: "Smart Chain",
          nativeCurrency: {
            name: "BNB",
            symbol: "BNB",
            decimals: 18,
          },
          rpcUrls: ["https://bsc-dataseed.binance.org/"],
          blockExplorerUrls: ["https://bscscan.com"],
        },
    };

    //----GETTING THE CONTRACT INSTANCE 
    const loadContract = async () => 
    {
        try {
            if(window.ethereum)
            {
                setProgress(30)
                const provider = new ethers.providers.Web3Provider(window.ethereum);

                if (provider.network !== "BNB") {
                    await window.ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: [
                        {
                            ...networks["binance"],
                        },
                        ],
                    });
                }

                const signer = provider.getSigner();
    
                const contract = new ethers.Contract("0x966f75a3A48BD6133220Bf83A62429bf04Adf29f", Abi, signer);

                setInstance(contract);

                setProgress(100)
            }
            else 
            {
                alert("Something went wrong")
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    //---TOTAL REWARDS HOLDERS SO FAR
    const totalRewards = async () => 
    {
        try {
            if(instance != "")
            {
                const resp = await instance.getTotalDividendsDistributed();
                setForm({...form,total:ethers.utils.formatEther(resp._hex)})
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    //---SEARCH FUNCTION
    const search = async (address) => 
    {
        try {
            if(instance != "")
            {
                setProgress(20)
                const resp = await instance.balanceOf(address);
                const res = await instance.getAccountDividendsInfo(address);
                setForm({...form,
                    balance:ethers.utils.formatEther(resp._hex),
                    earned:ethers.utils.formatEther(res[4]._hex),
                    pending:ethers.utils.formatEther(res[3]._hex)
                })
                setProgress(100)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <InstanceContext.Provider value={{search, form, progress, setProgress}}>
          {children}
        </InstanceContext.Provider>
      );
}

export {InstanceContext, InstanceProvider}