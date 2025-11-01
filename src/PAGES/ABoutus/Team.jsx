import "./Team.css";

// Import team images
import person1 from "../../assets/person1.jpg";
import person2 from "../../assets/person2.jpg";
import person3 from "../../assets/person3.jpg";
import person4 from "../../assets/person4.jpg";
import person5 from "../../assets/person5.jpg";

export default function Team() {
  const teamMembers = [
    { img: person3, name: "Gabriel Benjamin", role: "Managing Director" },
    { img: person1, name: "Usman Victoria", role: "Human Resources" },
    { img: person4, name: "Oyedeji Joshua", role: "Tech Support" },
    { img: person2, name: "Eniola Aluko", role: "Customer Support Lead" },
    { img: person5, name: "Sulyman Nasir", role: "Legal Consultant" },
  ];

  return (
    <section className="team">
      {/* Title Section */}
      <div className="meet_team">
        <h1>Meet Our Team</h1>
        <p>
          We’re a passionate group of professionals dedicated to making your rental
          experience smooth and reliable. Get to know the people behind Service Apartment Africa.
        </p>
      </div>

      {/* Team Cards */}
      <div className="container">
        {teamMembers.map((member, index) => (
          <div className="card" key={index}>
            <img src={member.img} alt={member.name} />
            <h2>{member.name}</h2>
            <p>{member.role}</p>
            <div className="social">
              <i className="fa fa-facebook"></i>
              <i className="fa fa-instagram"></i>
              <i className="fa fa-twitter"></i>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
