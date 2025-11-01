import "./contact.css";
import contact from "../../assets/contact.jpg"; // adjust path as needed

export default function ContactUs() {
  return (
    <section className="contact_us">
      <div className="about_img">
        <img
          src={contact}
          alt="Contact Us"
          width="500"
          className="about_img"
        />
      </div>

      <div className="contact">
        <h2>
          Contact With Our <br /> Customer Service
        </h2>
        <p>
          Our customer service staff are patiently ready to answer any of your
          questions, whether you’re an agent or a client.
        </p>
        <button className="btn_contact">
          <i className="fa fa-calendar"></i>
          <a href="#"> Contact Us</a>
        </button>
        
      </div>
    </section>
  );
}
