import './Team.css';
import person1 from "../../assets/person1.jpg";
import person2 from "../../assets/person2.jpg";
import person3 from "../../assets/person3.jpg";
import person4 from "../../assets/person4.jpg";
import person5 from "../../assets/person5.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function TeamSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: true, // animate only once
    });
  }, []);

  const team = [
    { id: 1, img: person3, name: "Gabriel Benjamin", role: "Managing Director" },
    { id: 2, img: person1, name: "Usman Victoria", role: "Human Resources" },
    { id: 3, img: person4, name: "Oyedeji Joshua", role: "Tech Support" },
    { id: 4, img: person2, name: "Eniola Aluko", role: "Customer Support Lead" },
    { id: 5, img: person5, name: "Sulyman Nasir", role: "Legal Consultant" },
  ];

  return (
    <section className="team">
      <div className="meet_team" data-aos="fade-up">
        <h1>Meet Our Team</h1>
        <p>
          We’re a passionate group of professionals dedicated to making your rental
          experience smooth and reliable. Get to know the people behind Service Apartment Africa.
        </p>
      </div>

      <div className="container">
        {team.map((member, index) => (
          <div
            className="card"
            key={member.id}
            data-aos="fade-up"
            data-aos-delay={index * 150} // delay each card slightly
          >
            <img src={member.img} alt={member.name} />
            <h2>{member.name}</h2>
            <p>{member.role}</p>
            <div className="social">
              <i className="fa-brands fa-facebook"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-twitter"></i>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
