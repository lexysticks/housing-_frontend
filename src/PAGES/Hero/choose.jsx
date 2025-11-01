import hero2 from "../../assets/service_2.jpg";
import "./choose.css"; // Make sure you import the CSS

export default function WhyChooseUs() {
  return (
    <section className="why_choose_us">
      {/* Image */}
      <div className="choose">
        <img src={hero2} alt="Why Choose Us" />
      </div>

      {/* Text content */}
      <div className="choose_pro">
        <h1>Why Choose Us</h1>

        <h3>For Renters And Buyers:</h3>
        <p>
          Find luxurious and affordable short-lets or properties to own across Africa. 
          Only the best, vetted listings for your peace of mind. Simple process with 
          secure payments and instant confirmations.
        </p>

        <h3>For Apartment and Property Owners:</h3>
        <p>
          Start earning by listing your apartment or selling your land in just a few clicks. 
          Attract verified clients looking for rentals or real estate deals. Pay a simple 
          monthly fee to showcase your property. Guaranteed payouts and smooth, secure transactions.
        </p>
      </div>
    </section>
  );
}

