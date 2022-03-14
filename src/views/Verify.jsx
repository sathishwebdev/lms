const Verify = ({mailId}) => (
    <div className="header" style={{minHeight:"100vh"}} > 
    <div className ="App">
        <h2>Verify Your Account</h2>
        <p>Goto your Mail box of {mailId} and verify your account before link expires.</p>
        <small style={{color: '#17d88b'}} >If you already verified log out and then log in</small>
    </div>
    </div>
)

export default Verify