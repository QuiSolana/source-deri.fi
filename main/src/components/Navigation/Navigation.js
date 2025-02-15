import classNames from "classnames"
import { Icon,ChainSelector,WalletConnector } from '@deri/eco-common';
import './navigation.scss'
import { useState } from 'react';
import apps from '../../apps'

export default function Navigation({ collect, lang, statusCallback, switchMenu,className ,actions}) {
  const [activeUrl, setActiveUrl] = useState(window.location.hash ? window.location.hash : apps.length > 0 && apps[0].activeRule)
  const [isCollapse, setIsCollapse] = useState(true)
  const [isExpand, setIsExpand] = useState(false)
  const clazz = classNames(`portal-header`,className ,{
    collapse: isCollapse,
    growup : !isCollapse,
    expand: isExpand
  })

  actions.onGlobalStateChange((value,prev) => {
    setIsExpand(value.menuStatus)
  })

  const link = (href,title) => {
    setActiveUrl(href);
    window.history.pushState({}, title, href);
  }
  const openOrClose = () => {
    const status = !isCollapse;
    setIsCollapse(status)
    actions.setGlobalState({menuStatus : false});
  }
  return (
    <div className={clazz}>
      <div className='title-link'>
        <div className="title-des">DERI.FI - PORTAL FOR ALL DERI PROJECTS</div>
        <div className='link-btn'>
          <Icon token={collect ? "portal-down" : "portal-up"} onClick={openOrClose} className='pc-arrow' />
          <Icon token='m-arrow-left' width='16' className='mobile-arrow' onClick={openOrClose} />
          {apps.map(app => (
            <span  key={app.name} className={classNames('sub-app',{ 'selected' : activeUrl === app.activeRule}) } onClick={() => link(app.activeRule,app.name)}>
              <div className='bit-it'>{app.displayName || app.name}</div>
            </span>
          ))}
          
          <a target="_blank" href="https://deri.io/">
            <div className='deri-io'>DERI.IO</div>
          </a>
          <a target="_blank" href="https://forms.gle/mtTqFW54KNM1wJ2f7">
            <Icon token="add-link" className="add-link" />
          </a>
        </div>
      </div>
      <div className='down-up'>
        <ChainSelector collect={collect} id="portal-header-network" actions={actions}/>
        <WalletConnector lang={lang} bgColor="#FFAB00" actions={actions} />
      </div>
    </div>
  )
}