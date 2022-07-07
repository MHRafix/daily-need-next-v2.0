export default function FeaturesCard({
  features_name,
  features_icon,
  features_desc,
}) {
  return (
    <>
      <div className="feature_card">
        <div className="card_icon">{features_icon}</div>
        <div className="card_content">
          <h3 className="text-light text-info_color capitalize">
            {features_name}
          </h3>
          <p className="text-thin text-black3">{features_desc}</p>
        </div>
      </div>
    </>
  );
}
