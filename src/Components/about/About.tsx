function About() {
    const year = new Date().getUTCFullYear();

    return (
        <>
            <p>About this page</p>
            <p>{year}</p>
        </>
    );
}

export default About;
