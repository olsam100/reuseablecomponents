import React, { useState } from 'react';
import 'components/modalwithnav/modal.css'
import {HiHome, HiUsers, HiChatAlt2, HiNewspaper, HiGlobeAlt} from 'react-icons/hi'

const Modalwithnav = ({ close }) => {
    const [showContent, setShowContent] = useState()
    return (
        <div className='modalwithnavcontainer' onClick={() => close(true)}>
            <div className='modalwithnavwrapper' onClick={(e) => e.stopPropagation()}>
                <nav className='modalnav'>
                    <div className="wrappercontainer">
                        <div className={showContent === 0 ? 'navwrapper active' : 'navwrapper'} onClick={() => setShowContent(0)}>
                            <span>{ <HiHome /> }</span>
                            <p className='navlabel'>home</p>
                        </div>
                        <div className={showContent === 1 ? 'navwrapper active' : 'navwrapper'} onClick={() => setShowContent(1)}>
                            <span>{ <HiUsers /> }</span>
                            <p className='navlabel'>about us</p>
                        </div>
                        <div className={showContent === 2 ? 'navwrapper active' : 'navwrapper'} onClick={() => setShowContent(2)}>
                            <span>{ <HiChatAlt2 /> }</span>
                            <p className='navlabel'>contact</p>
                        </div>
                        <div className={showContent === 3 ? 'navwrapper active' : 'navwrapper'} onClick={() => setShowContent(3)}>
                            <span>{ <HiNewspaper /> }</span>
                            <p className='navlabel'>blog</p>
                        </div>
                        <div className={showContent === 4 ? 'navwrapper active' : 'navwrapper'} onClick={() => setShowContent(4)}>
                            <span>{ <HiGlobeAlt /> }</span>
                            <p className='navlabel'>services</p>
                        </div>
                    </div>
                </nav>
                <main>
                    {showContent === 0 ? 'I am the home content. Component can be rendered here' : ''}
                    {showContent === 1 ? 'I am the about content. Component can be rendered here' : ''}
                    {showContent === 2 ? 'I am the contact content. Component can be rendered here' : ''}
                    {showContent === 3 ? 'I am the blog content. Component can be rendered here' : ''}
                    {showContent === 4 ? 'I am the services content. Component to show content of this nav can be rendered here' : ''}
                </main>
            </div>
        </div>
    );
};

export default Modalwithnav;