function IndivPlaylist({ samplePlaylist }) {
  return (
    <div>
      <img src={samplePlaylist.imageUrl} />
      <h3>{samplePlaylist.name}</h3>
    </div>
  );
}

export default IndivPlaylist;
