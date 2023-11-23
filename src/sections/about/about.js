import React from 'react'
import styles from './about.module.css'

const About = () => {
  return (
    <div className={styles.aboutSectionContainer}>
        <div className={styles.aboutSectionWrapper}>
            <div className={styles.aboutSectionaboutUs}>
                <h1>About Us</h1>
                <p>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuilles Letraset contenant des passages du Lorem Ipsum, et, plus récemment, par son inclusion dans des applications de mise en page de texte, comme Aldus PageMaker.</p>
            </div>
            <div className={styles.aboutSectionaboutAchivements}>
                <div className={styles.aboutSectionaboutEvent}>
                    <h1>54</h1>
                    <div className={styles.aboutSectionaboutEventInfo}>
                        <h1>Festival</h1>
                        <p>Completed</p>
                    </div>
                </div>
                <div className={styles.aboutSectionaboutEvent}>
                    <h1>42</h1>
                    <div className={styles.aboutEventInfo}>
                        <h1>Professional</h1>
                        <p>Artists</p>
                    </div>
                </div>
                <div className={styles.aboutSectionaboutEvent}>
                    <h1>20</h1>
                    <div className={styles.aboutSectionaboutEventInfo}>
                        <h1>Awards</h1>
                        <p>Achived</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default About