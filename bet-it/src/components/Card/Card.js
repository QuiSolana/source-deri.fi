import { useState, useEffect, useCallback } from "react";
import { Icon, Button } from '@deri/eco-common';
import classNames from 'classnames'
// import Button from '../Button/Button'
import './card.scss'
import Input from './Input'
import ApiProxy from "../../model/ApiProxy";
import { useWallet } from "use-wallet";
import useChain from '../../hooks/useChain';
import { useAlert } from 'react-alert'
import DeriNumberFormat from "../../utils/DeriNumberFormat";
import LineChart from "../LineChart/LineChart";
import { eqInNumber, getBtokenAmount, hasParent } from "../../utils/utils";
import { DeriEnv, bg } from '../../web3'
let timer;
export default function Card({ info, lang, bTokens, getLang, showCardModal }) {
  const [amount, setAmount] = useState(100)
  const [betInfo, setBetInfo] = useState({})
  const [bToken, setBToken] = useState()
  const [balance, setBalance] = useState()
  const [disabled, setDisabled] = useState(true)
  const [inputDisabled, setInputDisabled] = useState(true)
  const [isLiquidated, setIsLiquidated] = useState(false)
  const wallet = useWallet();
  const chains = useChain()
  const chain = chains.find((item) => eqInNumber(item.chainId, wallet.chainId))
  const alert = useAlert();
  const onChange = (value) => {
    setAmount(value)
  }

  const isNetwork = () => {
    return chains.find((item) => eqInNumber(item.chainId, wallet.chainId))
  }


  const getBetInfo = async () => {
    if (wallet.isConnected()) {
      let res = await ApiProxy.request("getBetInfo", { chainId: wallet.chainId, accountAddress: wallet.account, symbol: info.symbol })
      if (res.symbol) {
        setBetInfo(res)
        return res
      }
    } else if (wallet.status === "disconnected") {
      let chainId = DeriEnv.get() === "prod" ? 56 : 97
      let res = await ApiProxy.request("getBetInfo", { chainId: chainId, symbol: info.symbol })
      if (res.symbol) {
        setBetInfo(res)
        return res
      }
    }
    return false
  }

  const getLiquidationInfo = async () => {
    if (wallet.isConnected()) {
      let res = await ApiProxy.request("getLiquidationInfo", { chainId: wallet.chainId, accountAddress: "0x5b984a638506797d1e6e50B4e310d8ab377D3F49", symbol: info.symbol })
      if (res) {
        console.log("getLiquidationInfo", res.symbol, res.liquidate)
        setIsLiquidated(res.liquidate)
      }
    }
  }

  const getBetInfoTimeOut = (action) => {
    timer = window.setTimeout(async () => {
      let res = await action();
      if (res) {
        getBetInfoTimeOut(action);
      }
    }, 6000)
  }

  const getIsApprove = async () => {
    let res = await ApiProxy.request("isUnlocked", { chainId: wallet.chainId, accountAddress: wallet.account, bTokenSymbol: bToken })
    return res
  }

  const getWalletBalance = async () => {
    let res = await ApiProxy.request("getWalletBalance", { chainId: wallet.chainId, bTokenSymbol: bToken, accountAddress: wallet.account })
    let token = getBtokenAmount(bToken)
    if (+res >= 0) {
      let amount = +(bg(res).div(bg(2)).toString())
      amount = amount > token.max ? token.max : amount.toFixed(token.decimalScale)
      setAmount(amount)
    }
    setBalance(res)
  }


  const betClose = async (event) => {
    event.preventDefault()
    let params = { includeResponse: true, write: true, subject: 'CLOSE', chainId: wallet.chainId, symbol: betInfo.symbol, accountAddress: wallet.account }
    let res = await ApiProxy.request("closeBet", params)
    if (res.success) {
      alert.success(`${+betInfo.volume < 0 ? lang['buy'] : lang['sell']}  ${res.response.data.volume} ${info.unit} ${betInfo.isPowerSymbol ? lang['powers'] : ""} `, {
        timeout: 8000,
        isTransaction: true,
        transactionHash: res.response.data.transactionHash,
        link: `${chain.viewUrl}/tx/${res.response.data.transactionHash}`,
        title: `${+betInfo.volume < 0 ? lang['buy-order-executed'] : lang['sell-order-executed']}`
      })
    } else {
      if (res.response.transactionHash === "") {
        return false;
      }
      alert.error(`${lang['transaction-failed']} : ${res.response.error}`, {
        timeout: 300000,
        isTransaction: true,
        transactionHash: res.response.transactionHash,
        link: `${chain.viewUrl}/tx/${res.response.transactionHash}`,
        title: lang['buy-order-failed']
      })
    }
    console.log("betClose", res)
    getBetInfo()
    getLiquidationInfo()

    return true
  }

  const openBet = async (type, event) => {
    event.preventDefault()
    if (!wallet.isConnected()) {
      alert.error("Connect your wallet.", {
        timeout: 300000,
        isTransaction: true,
        title: 'Connect Wallet'
      })
      return false
    }
    if (!isNetwork()) {
      alert.error("Current network is not supported. ", {
        timeout: 300000,
        isTransaction: true,
        title: 'Wrong Network'
      })
      return false
    }

    if (+amount > +balance) {
      alert.error("the input amout is greater than your balance.", {
        timeout: 300000,
        isTransaction: true,
        title: 'Invalid Amount'
      })
      return false;
    }
    if (disabled) {
      return false;
    }
    let isApproved = await getIsApprove()
    let direction = type === "up" || type === "boostedUp" ? "long" : "short"
    let boostedUp = type === "boostedUp" ? true : false
    let params = { includeResponse: true, write: true, subject: type.toUpperCase(), chainId: wallet.chainId, bTokenSymbol: bToken, amount: amount, symbol: info.symbol, accountAddress: wallet.account, boostedUp: boostedUp, direction: direction }
    if (!isApproved) {
      let paramsApprove = { includeResponse: true, write: true, subject: 'APPROVE', chainId: wallet.chainId, bTokenSymbol: bToken, accountAddress: wallet.account, direction: direction, approved: false }
      let approved = await ApiProxy.request("unlock", paramsApprove)
      if (approved) {
        if (approved.success) {
          alert.success(`Approve ${bToken}`, {
            timeout: 8000,
            isTransaction: true,
            transactionHash: approved.response.data.transactionHash,
            link: `${chain.viewUrl}/tx/${approved.response.data.transactionHash}`,
            title: 'Approve Executed'
          })
        } else {
          if (approved.transactionHash === "") {
            return false;
          }
          alert.error(`Transaction Failed ${approved.response.error.message}`, {
            timeout: 300000,
            isTransaction: true,
            transactionHash: approved.response.transactionHash,
            link: `${chain.viewUrl}/tx/${approved.response.transactionHash}`,
            title: 'Approve Failed'
          })
          return false;
        }
      }
      params["approved"] = approved.success
    }
    let res = await ApiProxy.request("openBet", params)
    console.log(type, res)
    getBetInfo()
    getLiquidationInfo()
    if (res.success) {
      alert.success(`${+res.response.data.volume > 0 ? lang['buy'] : lang['sell']} ${res.response.data.volume} ${info.unit} ${boostedUp ? lang['powers'] : ''} `, {
        timeout: 8000,
        isTransaction: true,
        transactionHash: res.response.data.transactionHash,
        link: `${chain.viewUrl}/tx/${res.response.data.transactionHash}`,
        title: `${direction === "long" ? lang['buy-order-executed'] : lang['sell-order-executed']}`
      })
    } else {
      if (res.response.error.code === 1001) {
        alert.error("Increase the input amount to open positions", {
          timeout: 300000,
          isTransaction: true,
          title: "Amount too small"
        })
        return false;
      }
      if (res.response.transactionHash === "") {
        return false;
      }
      alert.error(`${lang['transaction-failed']} : ${res.response.error.message}`, {
        timeout: 300000,
        isTransaction: true,
        transactionHash: res.response.transactionHash,
        link: `${chain.viewUrl}/tx/${res.response.transactionHash}`,
        title: `${direction === "long" ? lang['buy-order-failed'] : lang['sell-order-failed']}`
      })
    }
    return true
  }

  const showModal = (e) => {
    const parent = document.querySelector(".input-box");
    const btnBox = document.querySelector(".btn-box")
    if (!hasParent(parent, e.target) && !hasParent(btnBox, e.target)) {
      showCardModal(info.symbol)
    } else {
      return;
    }
  }

  useEffect(() => {
    if (info) {
      clearTimeout(timer)
      getBetInfoTimeOut(getBetInfo)
      getBetInfo()
      if (info.unit === "ETH") {
        window.setTimeout(() => {
          getLiquidationInfo()
        }, 600)
      } else {
        getLiquidationInfo()
      }
    }
  }, [wallet, info])

  useEffect(() => {
    if (wallet.chainId && wallet.account && bToken) {
      getWalletBalance()
    }
  }, [wallet, bToken])
  useEffect(() => {
    if (bTokens.length) {
      setBToken(bTokens[0].bTokenSymbol)
      setBetInfo({})
    }
  }, [bTokens])
  useEffect(() => {
    if (+amount <= +balance && +amount) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [amount, balance])

  useEffect(() => {
    if (balance && +balance > 0 && betInfo.markPrice) {
      setInputDisabled(false)
    } else {
      setInputDisabled(true)
    }
  }, [balance, betInfo])

  return (
    <div className={classNames('card-box', info.unit)} onClick={(e) => { showModal(e) }}>
      <div className='icon-name'>
        <Icon token={info.symbol} width={45} height={45} />
        <span className='symbol-name'>{info.unit}</span>
        {betInfo.volume && betInfo.volume !== "0" && <div className='entered'>
          {lang['entered']}
        </div>}
        {isLiquidated && betInfo.volume === "0" ? <div className='entered liquidated'>
          {lang['liquidated']}
        </div> : null}
      </div>
      <div className='price-box'>
        <div className='symbol-price'>
          $<DeriNumberFormat value={betInfo.markPrice} decimalScale={2} height={30} />
        </div>
        <div className='price-title'>
          {lang['current-price']}
        </div>
      </div>
      <div className='leverage-box'>
        <div className='symbol-leverage'>
          {/* {info.Leverage} */}
          {info.leverage} X
        </div>
        <div className='leverage-title'>
          {lang['leverage']}
          {/* <UnderlineText tip={lang['leverage-tip']} key={info.symbol} > <Icon token="leverage" /></UnderlineText> */}
        </div>
      </div>
      <div className={betInfo.volume && betInfo.volume !== "0" ? "input-box position" : "input-box"}>
        {betInfo.volume && betInfo.volume !== "0" ?
          <div className='symbol-pnl'>
            <div className='profit'>
              {lang['profit']}
            </div>
            <div className={+betInfo.pnl > 0 ? "symbol-pnl-num up-pnl" : "symbol-pnl-num down-pnl"}>
              {+betInfo.pnl > 0 ? "+" : ""}{betInfo.pnl ? (+betInfo.pnl).toFixed(2) : 0}
            </div>
          </div>
          : !isLiquidated && <Input value={amount} onChange={onChange} inputDisabled={inputDisabled} setBalance={setBalance} balance={balance} bToken={bToken} setBToken={setBToken} bTokens={bTokens} lang={lang} />
        }
        {isLiquidated && betInfo.volume === "0" ? <div className='symbol-pnl'>
          <div className='profit'>
            {lang['profit']}
          </div>
          <div className="symbol-pnl-num down-pnl">
            0
          </div>
        </div> : null}
      </div>
      <div className='btn-box'>
        {betInfo.volume && betInfo.volume !== "0" ?
          <>
            <div className='line-chart'><LineChart symbol={info.markpriceSymbol} color={+betInfo.pnl > 0 ? "#38CB89" : "#FF5630"} /></div>
            <Button label={lang['close']} onClick={(e) => betClose(e)} className="btn close-btn" width="299" height="60" bgColor={+betInfo.pnl > 0 ? "#38CB891A" : "#FF56301A"} hoverBgColor={+betInfo.pnl > 0 ? "#38CB89" : "#FF5630"} borderSize={0} radius={14} fontColor={+betInfo.pnl > 0 ? "#38CB89" : "#FF5630"} />
          </>
          : !isLiquidated && <>
            <Button label={lang['up']} onClick={(e) => openBet("up", e)} isAlert={true} disabled={disabled} className="btn up-btn" width="299" height="60" bgColor="#38CB891A" hoverBgColor="#38CB89" borderSize={0} radius={14} fontColor="#38CB89" icon='up' hoverIcon="up-hover" disabledIcon="up-disable" />
            <Button label={lang['down']} onClick={(e) => openBet("down", e)} isAlert={true} disabled={disabled} className="btn down-btn" width="299" height="60" bgColor="#FF56301A" hoverBgColor="#FF5630" borderSize={0} radius={14} fontColor="#FF5630" icon='down' hoverIcon="down-hover" disabledIcon="down-disable" />
            {info.powerSymbol && <Button label={lang['boosted-up']} isAlert={true} onClick={(e) => openBet("boostedUp", e)} disabled={disabled} className="btn boosted-btn" width="299" height="60" bgColor="#FFAB001A" hoverBgColor="#FFAB00" borderSize={0} radius={14} fontColor="#FFAB00" icon='boosted-up' hoverIcon="boosted-up-hover" disabledIcon="boosted-up-disable" tip={getLang('boosted-up-tip', { symbol: info.unit, powers: info.powerSymbol.symbol })} tipIcon='boosted-hint' hoverTipIcon="boosted-hint-hover" disabledTipIcon="boosted-hint-disable" />}
          </>}
        {isLiquidated && betInfo.volume === "0" ?
          <>
            <div className='line-chart'><LineChart symbol={info.markpriceSymbol} color="#FF5630" /></div>
            <Button label={lang['start-over']} onClick={(e) => e.preventDefault(), setIsLiquidated(false)} className="btn close-btn" width="299" height="60" bgColor="#FF56301A" hoverBgColor="#FF5630" borderSize={0} radius={14} fontColor="#FF5630" /></>
          : null}
      </div>

    </div>
  )
}