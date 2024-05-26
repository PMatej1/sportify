import React from "react";

import "./JoinUs.css"
import {NavLinkBtn} from "../Navbar/Navbar";
import slika from "@/images/s2.png"
import Image from "next/image";
import Link from "next/link";
const JoinUs = () => {
    return(
      <>
          <div className={"joinus-div"}>
              <div className={"joinus"}>
                  <h1 className={"joinus-text"}>KREIRAJTE SVOJE <span className={"joinus-intense"}>SPORTSKE AVANTURE</span> S LAKOĆOM </h1>
                  <div className={"joinus-btn"}>
                    <NavLinkBtn href="/sign-in">SIGN IN</NavLinkBtn>
                    <NavLinkBtn  href="/log-in">LOG IN</NavLinkBtn>
                  </div>
              </div>
              <div className={"joinus-image"}>
                  <Image src={slika} alt={"slika 2"}/>
              </div>
          </div>
      </>
    );
}

export default JoinUs;