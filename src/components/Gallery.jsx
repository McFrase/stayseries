export default function Gallery({ images = [] }) {
  const [hero, ...rest] = images;

  return (
    <div className="gallery">
      {hero ? (
        <figure className="gallery__hero">
          <img src={hero} alt="Primary view of the property" />
        </figure>
      ) : null}
      <div className="gallery__grid">
        {rest.slice(0, 4).map((image, index) => (
          <figure key={image} className="gallery__thumb">
            <img src={image} alt={`Gallery image ${index + 2}`} />
          </figure>
        ))}
        {rest.length > 4 ? (
          <button type="button" className="gallery__more">
            See all images
          </button>
        ) : null}
      </div>
    </div>
  );
}

