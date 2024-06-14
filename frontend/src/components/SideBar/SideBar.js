
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHouse,
    faMagnifyingGlass,
    faMessage,
    faPuzzlePiece,
    faUser,
    faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import './SideBar.css';
import Image from "next/image";

import logo from "@/images/sportify_logo2.png"
import Link from "next/link";
import {usePathname, useParams} from "next/navigation";

const SideBar = () => {
    const pathname = usePathname();
    const params = useParams();

    const isFeedRoute = /^\/feed/.test(pathname);
    const isProfilesRoute = /^\/profiles/.test(pathname);

    return (
        <>
            <div className="sideBar">
                <Image src={logo} alt={"logo"} className={"logo"}/>
                <div>
                    {isFeedRoute ? (
                        <>
                            <Link href="/profiles" passHref>
                                <FontAwesomeIcon icon={faUser} className="icon"/>
                            </Link>
                            <p>
                                <Link href="/profiles" passHref>Profil</Link>
                            </p>
                        </>
                    ) : isProfilesRoute ? (
                        <>
                            <Link href={`/feed/${params.username}`} passHref>
                                <FontAwesomeIcon icon={faHouse} className="icon"/>
                            </Link>
                            <p>
                                <Link href={`/feed/${params.username}`} passHref>Feed</Link>
                            </p>
                        </>
                    ) : null}
                </div>
                <div>
                    <Link href={'/'}><FontAwesomeIcon icon={faMagnifyingGlass} className="icon"/></Link>
                    <p><Link href={'/'}>Pretraži</Link></p>
                </div>
                <div>
                    <Link href={'/'}><FontAwesomeIcon icon={faMessage} className="icon"/></Link>
                    <p><Link href={'/'}>Poruke</Link></p>
                </div>
                <div>
                    <Link href={'/xo'}><FontAwesomeIcon icon={faPuzzlePiece} className="icon"/></Link>
                    <p><Link href={'/xo'}>Igre</Link></p>
                </div>
                <div>
                    <Link href={'/'}><FontAwesomeIcon icon={faUserPlus} className="icon"/></Link>
                    <p><Link href={'/'}>Dodaj ekipu</Link></p>
                </div>
            </div>
        </>
    );
}

export default SideBar;
