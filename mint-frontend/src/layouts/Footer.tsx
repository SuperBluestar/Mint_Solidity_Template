import { Twitter as TwitterIcon, Discord as DiscordIcon, Twitter } from 'components/icons';

const Footer = () => {
    return (
        <div className="fixed bottom-0 w-full flex justify-between px-7 md:px-16 pb-7">
            <div className="flex">
                <img className="w-10 h-auto mr-7 md:mr-16 cursor-pointer" src="/assets/images/twitter.png" alt="Twitter"/>
                <img className="w-10 h-auto cursor-pointer" src="/assets/images/discord.png" alt="Discord"/>
            </div>
            <div>
                <img src="/assets/images/enverstudio.png" alt="Enver"/>
            </div>
        </div>
    )
}

export default Footer;
