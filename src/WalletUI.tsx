import React, { CSSProperties, useState } from "react"
import { useWallet } from "@txnlab/use-wallet"
import './wallet-ui.css'

const WalletIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: '20px', height: '20px', flexShrink: 0}} ><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" /></svg>
)

const ConnectIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#4CAF50" style={{width: '20px', height: '20px', flexShrink: 0}}><path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" /></svg>

)

const DisconnectIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#F44336" style={{width: '20px', height: '20px', flexShrink: 0}}><path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" /></svg>

)

const ActiveIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#3D5AFE" style={{width: '16px', height: '16px', flexShrink: 0}}><path d="M10 1a6 6 0 00-3.815 10.631C7.237 12.5 8 13.443 8 14.456v.644a.75.75 0 00.572.729 6.016 6.016 0 002.856 0A.75.75 0 0012 15.1v-.644c0-1.013.762-1.957 1.815-2.825A6 6 0 0010 1zM8.863 17.414a.75.75 0 00-.226 1.483 9.066 9.066 0 002.726 0 .75.75 0 00-.226-1.483 7.553 7.553 0 01-2.274 0z" /></svg>

)

export function useWalletUI(){
	const props = useWallet();
	return({...props})	
}

export default function WalletUI({primary, textColor, backgroundColor, openState} : { primary?: string, textColor?: string, backgroundColor?: string, openState: boolean}) {
	const [open, setOpen] = useState(openState ?? false )
	const { providers, activeAccount } = useWallet()

	return (
		<div className='wallet' style={{'--primary': primary || '#03a9f4', '--textColor': textColor || '#212121', '--backgroundColor': backgroundColor || '#cfd8dc'} as CSSProperties}>
			<button className="wallet-button-pushable" onClick={() => setOpen(!open)}>
				<span className="wallet-button-shadow"></span>
				<span className="wallet-button-edge"></span>
				<span className="wallet-button-front">
					<WalletIcon />
					{!!activeAccount ? 
						<span style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{activeAccount.address}</span> : 
						<span>Connect Wallet</span>
					}
				</span>
			</button>
			{open && <div className="wallet-menu">
				{providers?.map((provider) => (
					<div key={"provider-" + provider.metadata.id}>
						<div>
							<img width={45} height={45} alt="" src={provider.metadata.icon} style={{borderRadius: '100%'}} />
						</div>
						<div className="wallet-menu-title">
							<h4>{provider.metadata.name}</h4>
							<h6 style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%'}}>{provider.isActive && provider.accounts[0].address}</h6>
						</div>
						<div style={{marginLeft: 'auto'}}>
							<button className="wallet-button-interact" onClick={() => provider.isConnected ? provider.isActive ? provider.disconnect() : provider.setActiveProvider() : provider.connect()}>
								{provider.isConnected ? 
									provider.isActive ? 
										<><DisconnectIcon /><span>Disconnect</span></>  : 
										<><ActiveIcon /><span>Set Active</span></> 
									: <><ConnectIcon /><span>Connect</span></> 
								}
							</button>
						</div>
					</div>
				))}
			</div>}
		</div>
	);
}
