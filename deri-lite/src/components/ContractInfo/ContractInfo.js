import React, { useState, useEffect } from 'react'
import NumberFormat from 'react-number-format'
import { inject, observer } from 'mobx-react';
import TipWrapper from '../TipWrapper/TipWrapper';
import { DeriEnv,bg } from '../../lib/web3js/index'

function ContractInfo({ wallet, trading, lang, type }) {

  const toNonExponential = (num) => {
    num = +(num.toFixed(11))
    var m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
    return m[0];
  }

  return (
    <div className="contract-box">
      <div className='contract-header'></div>
      <div className="contract-info">
        <div className="conntract-header">{lang['contract-info']}</div>
        <div className="info">
          <div className="title">Base Token
            <TipWrapper>
              <span className="margin-per" tip="Discount Factor is the effective ratio of the margin token counted as collateral (converted into dynamic effective balance). For example: posting 10 USD in CAKE token (with DiscountFactor = 0.685) to your margin account will increase your dynamic effective margin by 6.85 USD.">(Discount Factor)</span>
            </TipWrapper>
          </div>
          <div className="text" >
            <TipWrapper>
              <span className='margin-per btoken-mu' tip={trading.contract.bTokenSymbol && trading.contract.bTokenSymbol.map((token, index) => `${token} (${trading.contract.bTokenMultiplier[index]})`)}>
                {trading.contract.bTokenSymbol && trading.contract.bTokenSymbol.map((token, index) => {
                  return index < 3 ? (<span key={index} className='btoken-symbol'>{token}({trading.contract.bTokenMultiplier[index]})</span>) : null
                })}...
              </span>
            </TipWrapper>

          </div>
        </div>
        <div className="info">
          <div className="title">
            {lang['symbol']}
          </div>
          <div className="text">
            {trading.contract.displaySymbol}
          </div>
        </div>
        {(type.isFuture || type.isPower) && <>
          <div className="info">
            <div className="title"> <span>Min.Trade Unit (Notional)</span> </div>
            <div className="text">
              {trading.contract['minTradeUnit'] ? trading.contract['minTradeUnit'] + trading.symbolInfo.unit : ''}
            </div>
          </div>
          <div className="info">
            <div className="title">Funding Rate Coefficient</div>
            <div className="text">
              <TipWrapper>
                <span className="margin-per" tip={trading.fundingCoefficientTip}>
                  {trading.contract['fundingRateCoefficient'] && (+trading.contract['fundingRateCoefficient']).toExponential()}
                </span>
              </TipWrapper>
            </div>
          </div>
          <div className="info">
            <div className="title"><TipWrapper block={false}><span tip="Initial Margin Ratio is the percentage of notional value that your margin will be frozen to open a new position." className='margin-per'>{lang['initial-margin-ratio']}</span></TipWrapper></div>
            <div className="text">
              <NumberFormat displayType='text' value={trading.contract.initialMarginRatio * 100} decimalScale={2} suffix='%' />
            </div>
          </div>
          <div className="info">
            <div className="title"> <TipWrapper block={false}><span tip="Maintenance Margin Ratio is the percentage of notional value required to keep your open positions from being liquidated." className='margin-per'> {lang['maintenance-margin-ratio']}</span></TipWrapper> </div>
            <div className="text">
              <NumberFormat displayType='text' value={trading.contract.maintenanceMarginRatio * 100} decimalScale={2} suffix='%' />
            </div>
          </div>
          {type.isPower && <>
            <div className="info">
              <div className="title"><TipWrapper block={false}><span tip="Maintenance Margin Ratio is the percentage of notional value required to keep your open positions from being liquidated." className='margin-per'>Multiplier</span></TipWrapper></div>
              <div className="text">
                <NumberFormat displayType='text' value={trading.contract.displayMultiplier}  />
              </div>
            </div>
            <div className="info">
              <div className="title"> <TipWrapper block={false}><span tip={trading.symbolInfo ? `Funding period is the time period for which the funding fee (${trading.symbolInfo.symbol} Mark Price - ${trading.symbolInfo.symbol} ) is paid. For Funding Period = 7 days, every second a long (short) contract pays (receives) a funding fee=(${trading.symbolInfo.symbol} Mark Price - ${trading.symbolInfo.symbol} ))/(7*24*60*60)` : ""} className='margin-per'> Funding Period</span></TipWrapper> </div>
              <div className="text">
                <NumberFormat displayType='text' value={bg(trading.contract['fundingPeriod']).div(86400).toFixed(0)} decimalScale={2} suffix='Days' />  
              </div>
            </div>
          </>}

        </>}
        {type.isOption && <>
          <div className="info">
            <div className="title">{lang['underlier']}</div>
            <div className="text">
              {trading.contract.underlier}
            </div>
          </div>
          <div className="info">
            <div className="title">{lang['strike']}</div>
            <div className="text">
              {trading.contract.strike}
            </div>
          </div>
          <div className="info">
            <div className="title">{lang['option-type']}</div>
            <div className="text">
              {trading.contract.optionType}
            </div>
          </div>
          <div className="info">
            <div className="title"> <span> Min.Trade Unit (Notional)</span> </div>
            <div className="text">
              {trading.contract.multiplier} {trading.config ? trading.config.unit : ''}
            </div>
          </div>
          <div className="info">
            <div className="title"><TipWrapper block={false}><span tip={trading.initialMarginRatioTip} className='margin-per'>{lang['initial-margin-ratio']}</span></TipWrapper></div>
            <div className="text">
              <NumberFormat displayType='text' value={trading.contract.initialMarginRatio * 100} decimalScale={2} suffix='%' />
            </div>
          </div>
          <div className="info">
            <div className="title"> <TipWrapper block={false}><span tip={trading.maintenanceMarginRatioTip} className='margin-per'> {lang['maintenance-margin-ratio']}</span></TipWrapper> </div>
            <div className="text">
              <NumberFormat displayType='text' value={trading.contract.maintenanceMarginRatio * 100} decimalScale={2} suffix='%' />
            </div>
          </div>
          <div className="info">
            <div className="title"> <TipWrapper block={false}><span tip={trading.maintenanceMarginRatioTip} className='margin-per'>Funding Period</span></TipWrapper> </div>
            <div className="text">
              <NumberFormat displayType='text' value={bg(trading.contract['fundingPeriod']).div(86400).toFixed(0)} decimalScale={2} suffix='Days' />
            </div>
          </div>
          <div className="info">
            <div className="title"> Delta </div>
            <div className="text">
              <NumberFormat displayType='text' value={trading.contract.delta} decimalScale={2}  />
            </div>
          </div>
          <div className="info">
            <div className="title"> Gamma </div>
            <div className="text">
              <NumberFormat displayType='text' value={trading.contract.gamma} decimalScale={7} />
            </div>
          </div>
        </>}
        <div className="info">
          {(type.isFuture || type.isPower) && <>
            <div className="title">{lang['transaction-fee']}</div>
          </>}
          {type.isOption && <>
            <div className="title">
              <TipWrapper block={false}>
                <span className="margin-per" tip={trading.TransactionFeeTip}>{lang['transaction-fee']}</span>
              </TipWrapper>
            </div>
          </>}
          <div className="text">
            {type.isOption && <>
              {`${trading.feeDisplay.join(' ')}%`}
              </>}
              {trading.contract.optionType !== 'C' && <>
                {trading.contract.strike < trading.index && <>
                  {lang['eo-mark-price']} * <NumberFormat displayType='text' value={trading.contract.feeRatioOTM * 100} decimalScale={3} suffix='%' />
                </>}
                {trading.contract.strike >= trading.index && <>
                  {trading.contract.underlier} {lang['price']} * <NumberFormat displayType='text' value={trading.contract.feeRatioITM * 100} decimalScale={3} suffix='%' />
                </>}
              </>}
            {(type.isFuture || type.isPower) && <>
              <NumberFormat displayType='text' value={trading.contract.feeRatio * 100} decimalScale={3} suffix='%' />
            </>}
          </div>
        </div>
      
      </div>
    </div>
  )
}

export default inject('wallet', 'trading', 'type')(observer(ContractInfo))