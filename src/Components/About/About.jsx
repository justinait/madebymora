import React from 'react'
import './About.css'
import { Link } from 'react-router-dom'
import mora from '/public/images/Perfil.jpg'

function About() {
  return (
    <div className='aboutContainer'>
      <div className='titlesContainerAbout'>
        <Link to='/home'><h2 className='titleMora'>madebymora ©projects</h2></Link>
        <p className='subtitleMora'>Integral & Multidisciplinary Designer</p>
      </div>

      <p className='cvAbout'>
        <strong>
        Mora Ramírez Amable
        </strong>
        <br /> <br />
        As an integral designer, I have cultivated a global perspective on design, ensuring that every project I engage in maintains coherence and value across all its areas. I am ambitious and proactive, always eager to propose innovative and unrestricted ideas to maximize creativity before finding the best solution. This approach has allowed me to generate significant and original results in every challenge I have faced. 
        In addition to my technical skills, I consider myself a highly motivated person committed to excellence. I am convinced that my ability to work in a team, along with my user-centered approach and attention to detail, will positively contribute to every project I undertake.
      </p>

      <div className='skillsAboutDiv'>
        <h6>        Skills       </h6>
        <p className='cvAbout skills'>
          Adobe
          <br />
          Photoshop / Ilustrator / After Effects / Indesign / Figma

          <br /><br />
          Illustration
          <br />
          Procreate
          <br /><br />
          3D
          <br />
          Sharp3d / Rhinoceros / Blender / Enscape
          <br /><br />
          Sound <br />
          Reaper
          
          <br /><br />
          Visual <br />
          Touchdesigner <br /> Resolume Arena
        </p>
      </div>

      <div className='skillsAboutDiv contact'>
        <h6>        Contact       </h6>
        <div  className='linksAbout'>

          <a target='_blank' href="mailto:moraramirezamable@gmail.com">Email</a>
          <a target='_blank' href='https://www.instagram.com/madebymor4/' >Instagram</a>
          <a target='_blank' href='https://www.linkedin.com/in/moraramirezamable/'  >LinkedIn</a>
          <a target='_blank' href='https://www.behance.net/moraramirez'>Behance</a>
          <a target='_blank' href='https://drive.google.com/file/d/1mYiC545i_zGN7fjyR0corRf-kpgFRJ8t/view?usp=sharing'>Download Vitae</a>
        </div>
      </div>

      <img className='cvAboutImg' src={mora} alt="" />

      <p className='justwebs'>Developed by <a target='_blank' href="https://www.imjustwebs.com/">I'm Just Webs</a></p>
    </div>
  )
}

export default About