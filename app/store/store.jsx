class Store {
  constructor(data) {

    const initialData = data || {
      nTracks: 4,
      length: 16
    };

    this.data = {
      nTracks: initialData.nTracks,
      length: initialData.length,
      pattern: Array(initialData.nTracks).fill(0),
      samples: Array(initialData.nTracks).fill(''),
      playPosition: 0
    };

    this.data.pattern.map((track) => {
      track = Array(this.data.length).fill(0);
    });

    console.table(this.data.pattern);

  }
}

export default Store;