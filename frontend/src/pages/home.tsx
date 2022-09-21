import React from 'react'
import Button from '../components/Button';
import HeroArt from '../components/HeroArt';

const Home = () => {
    return (
        <div className='home'>
            <div className="home__content">
                <div className='home__content__hero'>
                    <div className='home__content__hero__info'>
                        <p className='home__content__hero__info__title'>Laroye</p>
                        <p className='home__content__hero__info__description'>The productivity assistant for social media professionals</p>
                        <div className='home__content__hero__info__links'>
                            <Button text="Get started" size="md" link="login" />
                            <a href='https://drive.google.com/file/d/1r44nZlyO85hBhR00RTywEwh0_UbYIgYA/view?usp=sharing' target='_blank'>View our pitch</a>
                        </div>
                    </div>
                    <HeroArt />
                </div>
            </div>
        </div>
    )
}

export default Home;