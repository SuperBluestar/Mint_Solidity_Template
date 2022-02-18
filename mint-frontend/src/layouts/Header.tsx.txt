import * as React from "react";
import styled from "styled-components";
import * as PropTypes from "prop-types";
import Blockie from "components/Blockie";
import Banner from "components/Banner";
import { ellipseAddress, getChainData } from "helpers/utilities";
import { transitions } from "styles";

interface IHeaderProps {
  killSession: () => void;
  connected: boolean;
  address: string;
  chainId: number;
  loginMetamask?: () => void;
  loginWalletConnector?: () => void;
}

const Header = (props: IHeaderProps) => {
  const { connected, address, chainId, loginWalletConnector, loginMetamask, killSession } = props;
  return (
    <header className="w-full flex flex-shrink-0 flex-grow-0 justify-end">
      { connected ? 
        <>
          <div>{ address }</div>
          <div>{ chainId }</div>
          <button onClick={killSession}>Disconnect</button>
        </> : 
        <button onClick={loginWalletConnector}>ConnectWallet</button>
      }
    </header>
  );
};

Header.propTypes = {
  killSession: PropTypes.func.isRequired,
  address: PropTypes.string,
};

export default Header;
