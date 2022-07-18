import { useContext, useEffect } from 'react'
import Context from '../context/Context'
import { Pages } from '../context/Pages'
import ToastComponent from './ToastComponent'
import UserLinkComponent from './UserLinkComponent'

export default function NavComponent(props) {
    const { user, setUser, setOpenedModule, page, setPage, toast, setToast } = useContext(Context)

    const handleSignOut = (e) => {
        e.preventDefault()
        localStorage.removeItem('auth')
        setUser(null)
    }

    const handleModulesClick = (e) => {
        e.preventDefault()
        setOpenedModule(null)
        setPage(Pages.MODULES)
    }

    const handleProfileClick = (e) => {
        e.preventDefault()
        setOpenedModule(null)
        setPage(Pages.PROFILE)
    }

    const handleDiscussionClick = (e) => {
        e.preventDefault()
        setOpenedModule(null)
        setPage(Pages.DISCUSSION)
    }

    const checkIfActive = (pageName) => {
        if (page === pageName) {
            return ' active'
        }

        return ''
    }

    const getToast = () => {
        if (toast) {
            return (
                <ToastComponent title={toast.title} message={toast.message}></ToastComponent>
            )
        }

        return (<></>)
    }

    let navBarContents = (
        <div>
        </div>
    )

    useEffect(() => {
        setTimeout(() => {
            setToast(null)
        }, 6000)
    }, [toast])

    if (user) {
        navBarContents = (
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className={"nav-link" + checkIfActive(Pages.MODULES)} href="#" onClick={handleModulesClick}>Modules</a>
                    </li>
                    <li className="nav-item">
                        <a className={"nav-link" + checkIfActive(Pages.DISCUSSION)} href="#" onClick={handleDiscussionClick}>Discussion</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Competition</a>
                    </li>
                    <li className="nav-item">
                        <a className={"nav-link" + checkIfActive(Pages.PROFILE)} aria-current="page" href="#" onClick={handleProfileClick}>My Profile</a>
                    </li>
                </ul>
                <span className="navbar-text">
                    Signed in as <UserLinkComponent uuid={user.uuid} name={user.name} showOwnName={true}/>. (<a href="#" onClick={handleSignOut}>Sign out</a>)
                </span>
                {getToast()}
            </div>
        )
    }

    return (
        <div className="container">
            <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Intro. to Python</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    {navBarContents}
                </div>
            </nav>
            <br />
            <br />
            <br />
        </div>
    );
}