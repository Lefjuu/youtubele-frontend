import logo from '../img/logo.png'


const Logo = () => {
    return (
        <div className="logo">
            <img src={logo} alt="YourTubele Logo" className="logo-icon" />
            <span className="logo-text">YouTubele</span>
        </div>
    )
}
export default Logo